<template>
  <div class="content-container">
    <!-- 왼쪽: 데이터 리스트 -->
    <div class="data-list">
      <h4 class="mb-20">단위정책 탐색</h4>
      <el-input class="mb-15" v-model="search" placeholder="정책분야 조회" clearable />
      <el-scrollbar class="tree-container">
        <el-tree
          class="tree-list custom-tree"
          :data="formattedTreeData"
          :default-expand-all="false"
          highlight-current
          :props="treeProps"
          @node-click="handleNodeClick"
          :render-content="renderContent"
        />
      </el-scrollbar>
    </div>

    <!-- 오른쪽: 선택된 데이터 상세 -->
    <div class="data-details">
      <el-tabs v-model="activeTab" class="custom-tabs">
        <el-tab-pane label="전체" name="all"></el-tab-pane>
        <el-tab-pane label="관리" name="management"></el-tab-pane>
        <el-tab-pane label="기술" name="tech"></el-tab-pane>
        <el-tab-pane label="개인정보" name="privacy"></el-tab-pane>
      </el-tabs>

      <!-- 필터 옵션 -->
      <div class="filters">
        <el-select v-model="filter" placeholder="정책명" clearable>
          <el-option label="정책명1" value="정책명1" />
          <el-option label="정책명2" value="정책명2" />
          <el-option label="정책명3" value="정책명3" />
        </el-select>
        <el-input v-model="searchDetail" placeholder="정책명을 입력하세요" clearable />
        <el-select v-model="filter" placeholder="중요도" clearable>
          <el-option label="높음" value="high" />
          <el-option label="보통" value="medium" />
          <el-option label="낮음" value="low" />
        </el-select>
        <el-select v-model="filter" placeholder="위험등금" clearable>
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
          <el-option label="3" value="3" />
        </el-select>
        <el-select v-model="filter" placeholder="대상구분" clearable>
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
          <el-option label="3" value="3" />
        </el-select>
        <el-select v-model="filter" placeholder="태그" clearable>
          <el-option label="태그1" value="태그1" />
          <el-option label="태그2" value="태그2" />
          <el-option label="태그3" value="태그3" />
        </el-select>
        <el-select v-model="filter" placeholder="상태" clearable>
          <el-option label="상태1" value="상태1" />
          <el-option label="상태2" value="상태2" />
          <el-option label="상태3" value="상태3" />
        </el-select>
        
        <el-button class="black-button">
          <el-icon><Plus /></el-icon>
        </el-button>

        <el-button class="white-button">
          <el-icon><Delete /></el-icon>
        </el-button>
      </div>

      <!-- 데이터 리스트 -->
      <el-scrollbar class="data-list-scroll">
        <el-card 
        v-for="item in filteredDetails" 
        :key="item.complianceSeq" 
        class="detail-card">
          <!-- 카테고리 및 제목 -->
          <div class="card-chk">
            <el-checkbox v-model="item.checked"></el-checkbox>
            <span class="subtitle">{{ item.categoryName }}</span>
          </div>
          <div class="card-header">
            <el-tag class="dot" type="success" effect="dark"></el-tag>
            <span class="title">{{ item.categoryName }}</span>
            <div 
              class="tags"
              v-for="tagItem in item.tags" 
              :key="tagItem.itemTagSeq"
            >
              <el-tag size="small" type="info">{{ tagItem.tagName }}</el-tag>
            </div>
          </div>

          <!-- 중요도, 위험등급, 코드 정보 -->
          <div class="info">
            <div>
              <el-tag style="opacity: 0;"class="dot" type="success" effect="dark"></el-tag>
              <span>중요도 <strong>{{ item.policyLevel }}</strong></span>
              <span>위험등급 <strong class="danger">{{ item.threatLevelName }}</strong></span>
              <span>코드 {{ item.itemCode }} 대상 {{ item.target }}</span>
            </div>
            <div class="footer">
            <el-tag style="opacity: 0;"class="dot" type="success" effect="dark"></el-tag>
              <div>
                <p class="date">{{ item.regDate.substr(0, 10) }}</p>
                <p class="author">운영 | 
                  <span
                    v-for="(maItem, index) in item.managers"
                      :key="maItem.userId"
                  >
                    <strong v-if="index > 0">, {{ maItem.userName }}</strong>
                    <strong v-else>{{ maItem.userName }}</strong>
                  </span>
                  
                </p>
              </div>
            </div>
          </div>

          <!-- 날짜 및 운영자 정보 -->
       
        </el-card>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue';
import { ElMessage, ElButton, ElIcon } from 'element-plus';
import { Plus, Delete } from '@element-plus/icons-vue';
import { Edit } from '@element-plus/icons-vue';

import policyData from '@/data/policy.json';
import policyDetailData from '@/data/policy_detail.json';

const search = ref('');
const searchDetail = ref('');
const activeTab = ref('all');
const filter = ref('');

const details = ref(policyDetailData);

const formatTree = (nodes) => {
  return nodes.map(node => ({
    label: node._custom?.value?.categoryName || node._custom?.value?.categoryName, // description이 없으면 categoryName 표시
    children: node._custom?.value?.children ? formatChildrenTree(node._custom.value.children) : []
  }))
}

const formatChildrenTree = (nodes) => {
  return nodes.map(node => ({
    label: node.categoryName || node.categoryName, // description이 없으면 categoryName 표시
    children: node?.children ? formatChildrenTree(node.children) : []
  }))
}

const formattedTreeData = computed(() => formatTree(policyData));
const treeProps = {
  children: 'children',
  label: 'label'
}

const selectedCategory = ref(null);


const filteredDetails = computed(() => {
  return details.value.filter(item =>
    (!filter.value || item.category === filter.value) &&
    (!searchDetail.value || item.title.includes(searchDetail.value))
  );
});

const handleNodeClick = (node) => {
  selectedCategory.value = node.label;
};
// 트리 노드 커스텀 렌더링 (수정 버튼 추가)
const renderContent = (h, { node, data }) => {

  return h('div', { class: 'tree-node' }, [
    h('span', node.label),
    h(ElButton, {
      type: 'text',
      icon: Edit,
      class: 'edit-btn',
      onClick: (event) => {
        event.stopPropagation();
        editNode(data);
      }
    })
  ]);
};

const editNode = (nodeData) => {
  ElMessage.info(`수정할 항목: ${nodeData.label}`);
};

</script>

<style scoped>
.content-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  height: 100%;
}
.tree-container {
  max-height: 600px; /* 높이 지정 (필요하면 조정 가능) */
  padding-right: 10px;
}
.mb-20{
  margin-bottom: 20px;
}
.mb-15{
  margin-bottom: 15px;
}


.data-list {
  width: 300px;
  background: #fff;
  padding: 25px 15px;
  border-radius: 8px;
  height: 100%;
}
.card-chk{
  display: flex;
  align-items: center;
  gap: 5px;
}
.data-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px 15px;
  border-radius: 8px;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.data-list-scroll {
  max-height: 500px;
  overflow-y: auto;
}

.detail-card {
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: none;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #e7e7e7
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 16px;
}

.tags {
  display: flex;
  gap: 5px;
}

.dot {
  font-size: 12px;
  padding: 0;
  width: 10px;
  height: 10px;
}

.info {
  font-size: 14px;
  color: #666;
  margin: 5px 0;
  display: flex;
  gap: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.subtitle {
  font-size: 12px;
  color: #888;
}
.info .danger {
  color: red;
}

.footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
}
.black-button {
  background-color: #000 !important;
  color: #fff !important;
  border: none !important;
}

.white-button {
  background-color: #fff !important;
  color: #000 !important;
  border: 1px solid #000 !important;
}
</style>
<style>
.tree-list .tree-node{
  width: 100%;
  display: flex;
  align-items: center;
  color: #000;
  justify-content: space-between;
  font-weight: bold;
}
.tree-list .tree-node span{
  display: inline-block;
  max-width: 180px; /* 너비 지정 (조정 가능) */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
.el-button+.el-button {
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
.custom-tabs .el-tabs__item {
  color: #000 !important;
  font-weight: bold
}
.custom-tabs .el-tabs__item.is-active {
  color: #000 !important;
}
.custom-tabs .el-tabs__active-bar {
  background-color: #000 !important;
}
.black-button.el-button>span{
  color: #fff;
}
.el-card__body{
  padding: 10px 20px;
}
</style>
