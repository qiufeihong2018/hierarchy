const util = require("../util");

function secondWalk(node, options) {
  let totalHeight = 0;
  if (!node.children.length) {
    totalHeight = node.height;
  } else {
    node.children.forEach((c) => {
      totalHeight += secondWalk(c, options);
    });
  }
  node._subTreeSep = options.getSubTreeSep(node.data);
  node.totalHeight = Math.max(node.height, totalHeight) + 2 * node._subTreeSep;
  return node.totalHeight;
}

function thirdWalk(node) {
  const children = node.children;
  const len = children.length;
  if (len) {
    children.forEach((c) => {
      thirdWalk(c);
    });
    const first = children[0];
    const last = children[len - 1];
    const childrenHeight = last.y - first.y + last.height;
    let childrenTotalHeight = 0;
    children.forEach((child) => {
      childrenTotalHeight += child.totalHeight;
    });
    if (childrenHeight > node.height) {
      // 当子节点总高度大于父节点高度
      node.y = first.y + childrenHeight / 2 - node.height / 2;
    } else if (children.length !== 1 || node.height > childrenTotalHeight) {
      // 多于一个子节点或者父节点大于所有子节点的总高度
      const offset = node.y + (node.height - childrenHeight) / 2 - first.y;
      children.forEach((c) => {
        c.translate(0, offset);
      });
    } else {
      // 只有一个子节点
      node.y =
        (first.y + first.height / 2 + last.y + last.height / 2) / 2 -
        node.height / 2;
    }
  }
}

const DEFAULT_OPTIONS = {
  getSubTreeSep() {
    return 0;
  },
};

module.exports = (root, options = {}) => {
  options = util.assign({}, DEFAULT_OPTIONS, options);
  root.parent = {
    x: 0,
    width: 0,
    height: 0,
    y: 0,
  };
  // first walk
  // 第一步
  root.BFTraverse((node) => {
    // simply get x
    // 简单地获取x
    node.x = node.parent.x + node.parent.width;
  });
  root.parent = null;
  // second walk
  // 第二步
  // assign sub tree totalHeight
  // 分配子树的总高度
  secondWalk(root, options);
  // adjusting
  // separating nodes
  root.startY = 0;
  root.y = root.totalHeight / 2 - root.height / 2;
  root.eachNode((node) => {
    const children = node.children;
    const len = children.length;
    if (len) {
      const first = children[0];
      first.startY = node.startY + node._subTreeSep;
      if (len === 1) {
        first.y = node.y + node.height / 2 - first.height / 2;
      } else {
        first.y = first.startY + first.totalHeight / 2 - first.height / 2;
        for (let i = 1; i < len; i++) {
          const c = children[i];
          c.startY = children[i - 1].startY + children[i - 1].totalHeight;
          c.y = c.startY + c.totalHeight / 2 - c.height / 2;
        }
      }
    }
  });

  // third walk
  // 第三步
  thirdWalk(root);
};
