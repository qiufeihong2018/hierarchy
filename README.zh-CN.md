# hierarchy

可视化分层数据的布局算法。

## API

### example

```js
const Hierarchy = require('@antv/hierarchy');

// your tree data
const root = {
  isRoot: true,
  id: 'Root',
  children: [
    {
      id: 'SubTreeNode1',
      children: [
        {
          id: 'SubTreeNode1.1'
        },
        {
          id: 'SubTreeNode1.2'
        }
      ]
    },
    {
      id: 'SubTreeNode2'
    }
  ]
};

// apply layout
const NODE_SIZE = 16;
const PEM = 5;
const ctx = document.getElementById('id-of-canvas-element').getContext('2d');
const rootNode = Hierarchy.compactBox(root, {
  direction: 'H', // H / V / LR / RL / TB / BT
  getId(d) {
    return d.id;
  },
  getHeight(d) {
    if (d.isRoot) {
      return NODE_SIZE * 2;
    }
    return NODE_SIZE;
  },
  getWidth(d) {
    if (d.isRoot) {
      return ctx.measureText(d.id).width * 2 + PEM * 1.6;
    }
    return ctx.measureText(d.id).width + PEM * 1.6;
  },
  getHGap(d) {
    if (d.isRoot) {
      return PEM * 2;
    }
    return PEM;
  },
  getVGap(d) {
    if (d.isRoot) {
      return PEM * 2;
    }
    return PEM;
  },
  getSubTreeSep(d) {
    if (!d.children || !d.children.length) {
      return 0;
    }
    return PEM;
  }
});
```

### 布局类型

`Hierarchy[type]`

#### compactBox 紧凑盒子

这种布局不同于 `d3-hierarcy.tree` 层次结构树，它是一个紧凑的盒子整齐的布局，在水平和垂直方向上都是整洁的。

> demos

| LR | RL | H |
| -------- | -------- | -------- |
| ![LR](./assets/compact-box-lr.png) | ![RL](./assets/compact-box-rl.png) | ![H](./assets/compact-box-h.png) |

| TB | BT | V |
| -------- | -------- | -------- |
| ![TB](./assets/compact-box-tb.png) | ![BT](./assets/compact-box-bt.png) | ![V](./assets/compact-box-v.png) |

#### dendrogram 树状图

> demos

| LR | RL | H |
| -------- | -------- | -------- |
| ![LR](./assets/dendrogram-lr.png) | ![RL](./assets/dendrogram-rl.png) | ![H](./assets/dendrogram-h.png) |

| TB | BT | V |
| -------- | -------- | -------- |
| ![TB](./assets/dendrogram-tb.png) | ![BT](./assets/dendrogram-bt.png) | ![V](./assets/dendrogram-v.png) |

#### indented 缩进

> demos

| LR | RL | H |
| -------- | -------- | -------- |
| ![LR](./assets/indented-lr.png) | ![RL](./assets/indented-rl.png) | ![H](./assets/indented-h.png) |

#### mindmap 思维导图

这个布局的灵感来自 XMind。

> demos

![mindmap](./assets/mindmap.png)
