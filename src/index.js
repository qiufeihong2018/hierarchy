/**
 * 抛出4中布局
 * compactBox：紧凑盒子
 * dendrogram：树状图
 * indented：缩进
 * mindmap：思维导图
 */
const hierarchy = {
  compactBox: require("./compact-box"),
  dendrogram: require("./dendrogram"),
  indented: require("./indented"),
  mindmap: require("./mindmap"),
};

module.exports = hierarchy;
