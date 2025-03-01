<template>
 <el-scrollbar class="tree-container">
   <el-tree
     class="tree-list custom-tree"
     :data="formattedTreeData"
     :default-expand-all="false"
     highlight-current
     :props="treeProps"
     @node-click="handleNodeClick"
     :render-content="renderContent || defaultRenderContent"
   />
 </el-scrollbar>
</template>

<script setup>
import { computed, h } from "vue";
import { Edit } from "@element-plus/icons-vue";
import { ElButton } from "element-plus";

const props = defineProps({
 treeData: {
   type: Array,
   required: true,
 },
 renderContent: {
   type: Function,
   default: null,
 },
});

const emit = defineEmits(["node-click"]);

const formatTree = (nodes) => {
 return nodes.map((node) => ({
   label: node._custom?.value?.categoryName || node.categoryName,
   children: node._custom?.value?.children
     ? formatChildrenTree(node._custom.value.children)
     : [],
 }));
};

const formatChildrenTree = (nodes) => {
 return nodes.map((node) => ({
   label: node.categoryName,
   children: node?.children ? formatChildrenTree(node.children) : [],
 }));
};

const formattedTreeData = computed(() => formatTree(props.treeData));

const treeProps = {
 children: "children",
 label: "label",
};

const handleNodeClick = (node) => {
 emit("node-click", node);
};

// 기본 트리 노드 렌더링 함수 (props로 renderContent를 받지 않을 경우)
const defaultRenderContent = (h, { node, data }) => {
 return h("div", { class: "tree-node" }, [
   h("span", node.label),
   h(ElButton, {
     type: "link",
     icon: Edit,
     class: "edit-btn",
     onClick: (event) => {
       event.stopPropagation();
       handleNodeClick(data);
     },
   }),
 ]);
};
</script>

<style>
.tree-container {
 max-height: 600px;
 padding-right: 10px;
}
.tree-list .tree-node {
 width: 100%;
 display: flex;
 align-items: center;
 color: #000;
 justify-content: space-between;
 font-weight: bold;
}
.tree-list .tree-node span {
 display: inline-block;
 max-width: 160px;
 white-space: nowrap;
 overflow: hidden;
 text-overflow: ellipsis;
 vertical-align: middle;
}
.el-button + .el-button {
 margin-left: 0;
}
.custom-tree .el-tree-node__content {
 border-radius: 4px;
}
.custom-tree .el-tree-node__content:hover {
 background-color: #ECECEC !important;
}
.custom-tree .el-tree-node.is-current > .el-tree-node__content {
 background-color: #ECECEC !important;
}
.custom-tree .el-tree-node.is-current > .el-tree-node__content .tree-node {
 width: 100%;
 justify-content: space-between;
 display: flex;
 align-items: center;
}
</style>
<style>
.edit-btn{
 border: none !important;
 padding: 0 !important;
 width: fit-content;
}
</style>
