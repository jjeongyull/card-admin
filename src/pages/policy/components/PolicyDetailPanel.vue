<template>
  <transition class="slide" name="slide">
    <div v-if="visible" class="policy-detail-panel">
      <div class="panel-header">
        <h3>정책상세: {{ policyData.title }}</h3>
        <el-button type="text" class="close-btn" @click="closePanel">
          <el-icon><Close /></el-icon>
        </el-button>
      </div>

      <el-scrollbar class="panel-body">
        <div class="body-inner">
          <el-form label-position="top">
          <!-- 기본 정보 -->
          <h4 class="section-title">기본 정보</h4>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="공통 코드/항목">
                <el-input v-model="policyData.code1" :disabled="!isEditing" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="자체 코드/항목">
                <el-input v-model="policyData.code2" :disabled="!isEditing" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="정책 제목">
                <el-input v-model="policyData.title" :disabled="!isEditing" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="중요도">
                <el-select v-model="policyData.importance" placeholder="선택" :disabled="!isEditing">
                  <el-option label="운영" value="운영" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="위험">
                <el-select v-model="policyData.risk" placeholder="선택" :disabled="!isEditing">
                  <el-option label="위험" value="위험" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="영역">
                <el-select v-model="policyData.area" placeholder="선택" :disabled="!isEditing">
                  <el-option label="관리" value="관리" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="공통">
                <el-select v-model="policyData.common" placeholder="선택" :disabled="!isEditing">
                  <el-option label="관리" value="관리" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 관리 정보 -->
          <h4 class="section-title">관리 정보</h4>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="담당자">
                <el-input 
                  v-model="inputManager"
                  placeholder="담당자 입력 후 Enter"
                  @keyup.enter="addManager"
                  v-if="isEditing"
                />
                <div class="tag-container">
                  <el-tag v-for="(manager, index) in policyData.managers" :key="index" closable @close="removeManager(index)">
                    {{ manager.userName }}
                  </el-tag>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="항목예외">
                <el-input v-model="policyData.exception" :disabled="!isEditing" />
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 관련 정보 -->
          <h4 class="section-title">관련 정보</h4>
          <el-form-item label="태그">
            <el-input 
              v-model="inputTag"
              placeholder="태그 입력 후 Enter"
              @keyup.enter="addTag"
              v-if="isEditing"
            />
            <div class="tag-container">
              <el-tag v-for="(tag, index) in policyData.tags" :key="index" closable @close="removeTag(index)">
                {{ tag.tagName }}
              </el-tag>
            </div>
          </el-form-item>

          <h4 class="section-title">유관 정책</h4>
          <el-form-item>
            <el-input 
                v-model="inputPolicy"
                placeholder="유관 정책 입력 후 Enter"
                @keyup.enter="addPolicy"
                v-if="isEditing"
              />
            <div class="tag-container">
              
              <el-tag v-for="(policy, index) in policyData.relatedPolicies" :key="index" closable @close="removePolicy(index)">
                {{ policy }}
              </el-tag>
            </div>
          </el-form-item>

          <!-- 상세 가이드 -->
          <h4 class="section-title">상세 가이드</h4>
          <div v-if="!isEditing" class="guide-container">
              <table class="guide-table">
                <thead>
                  <tr>
                    <th>Requirements</th>
                    <th>Guidance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in policyData.detailGuide" :key="index">
                    <td>{{ item.requirement }}</td>
                    <td>{{ item.guidance }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Editor v-else v-model="policyData.detailGuide" />
          </el-form>
        </div>
      
      </el-scrollbar>

      <!-- 푸터 (수정 및 삭제) -->
      <div class="panel-footer">
        <div>
          <el-button v-if="!isEditing" type="danger" @click="deletePolicy">삭제</el-button>
        </div>
        <div>
          <el-button @click="cancelEdit">
            {{ isEditing ? '취소' : '닫기' }}
          </el-button>
          <el-button v-if="isEditing" class="black-button" @click="saveChanges">수정 완료</el-button>
          <el-button v-else class="black-button" @click="enableEdit">단위정책 수정</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";
import { Close } from "@element-plus/icons-vue";
import Editor from "@/components/Editor.vue";

const props = defineProps({
  visible: Boolean,
  selectedPolicy: Object
});

const emit = defineEmits(["close", "update", "delete"]);

const policyData = ref({});
const isEditing = ref(false);
const inputManager = ref('');
const inputTag = ref('');
const inputPolicy = ref('');

// 담당자 추가
const addManager = () => {
  
}
const addTag = () => {
  
}
const addPolicy = () => {

}
const enableEdit = () => {
  isEditing.value = true;
};

const cancelEdit = () => {
  if(!isEditing.value){
    closePanel();
  }else{
    policyData.value = { ...props.selectedPolicy }; // 원본 데이터 복원
    isEditing.value = false;
  }
};

watch(() => props.selectedPolicy, (newData) => {
  policyData.value = { ...newData };
}, { immediate: true });

const closePanel = () => {
  emit("close");
};

const removeManager = (index) => {
  policyData.value.managers.splice(index, 1);
};

const removeTag = (index) => {
  policyData.value.tags.splice(index, 1);
};

const removePolicy = (index) => {
  policyData.value.relatedPolicies.splice(index, 1);
};

const deletePolicy = () => {
  emit("delete", policyData.value);
  closePanel();
};
</script>

<style scoped>
.slide{
  padding: 16px;
}
/* 패널 애니메이션 */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter, .slide-leave-to {
  transform: translateX(100%);
}

/* 패널 스타일 */
.policy-detail-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

/* 헤더 */
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

/* 스크롤 가능 영역 */
.panel-body {
  border-radius: 30px;
  overflow-y: auto;
  width: 100%;
  border: 1px solid #E4E7ED;
  margin-bottom: 20px;
}
.body-inner{
  padding: 25px;
}

/* 태그 스타일 */
.tag-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.el-tag {
  background-color: #000;
  color: #fff;
  border: none;
}

/* 상세 가이드 테이블 */
.guide-table {
  width: 100%;
  border-collapse: collapse;
}

.guide-table th, .guide-table td {
  border: 1px solid #ddd;
  padding: 10px;
}

/* 푸터 */
.panel-footer {
  display: flex;
  justify-content: space-between;
}
</style>
