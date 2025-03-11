<template>
  <el-dialog
    title="단위정책 추가"
    width="800px"
    @close="closeDialog"
    class="custom-dialog"
    align-center
  >
    <!-- 모달 바디 -->
    <el-scrollbar class="no-x-scroll">
      <div class="modal-body">
        <el-form label-position="top">
          <!-- 기본 정보 -->
          <h4 class="section-title">기본 정보</h4>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="8">
              <el-form-item label="코드/항목">
                <el-input v-model="formData.code1" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-form-item label="코드/항목">
                <el-input v-model="formData.code2" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-form-item label="정책 제목">
                <el-input v-model="formData.title" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :xs="24" :sm="6">
              <el-form-item label="중요도">
                <el-select v-model="formData.importance" placeholder="선택">
                  <el-option label="운영" value="운영" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6">
              <el-form-item label="위험">
                <el-select v-model="formData.risk" placeholder="선택">
                  <el-option label="위험" value="위험" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6">
              <el-form-item label="영역">
                <el-select v-model="formData.area" placeholder="선택">
                  <el-option label="관리" value="관리" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6">
              <el-form-item label="공통">
                <el-select v-model="formData.common" placeholder="선택">
                  <el-option label="관리" value="관리" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 관리 정보 -->
          <h4 class="section-title">관리 정보</h4>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="16">
              <el-form-item label="담당자">
                <el-input
                  v-model="inputManager"
                  placeholder="담당자 입력 후 Enter"
                  @keyup.enter="addManager"
                />
                <div class="tag-container">
                  <el-tag
                    v-for="(manager, index) in formData.managers"
                    :key="index"
                    closable
                    @close="removeManager(index)"
                  >
                    {{ manager }}
                  </el-tag>
                </div>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-form-item label="예외구분">
                <el-select v-model="formData.exception" placeholder="선택">
                  <el-option label="관리" value="관리" />
                </el-select>
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
            />
            <div class="tag-container">
              <el-tag
                v-for="(tag, index) in formData.tags"
                :key="index"
                closable
                @close="removeTag(index)"
              >
                {{ tag }}
              </el-tag>
            </div>
          </el-form-item>

          <!-- 유관 정책 -->
          <h4 class="section-title">유관 정책</h4>
          <el-form-item>
            <el-input
              v-model="inputPolicy"
              placeholder="유관 정책 입력 후 Enter"
              @keyup.enter="addPolicy"
            />
            <div class="tag-container">
              <el-tag
                v-for="(policy, index) in formData.relatedPolicies"
                :key="index"
                closable
                @close="removePolicy(index)"
              >
                {{ policy }}
              </el-tag>
            </div>
          </el-form-item>

          <!-- 상세 가이드 -->
          <h4 class="section-title">상세 가이드</h4>
          <Editor v-model="formData.detailGuide" />
        </el-form>
      </div>
    </el-scrollbar>

    <!-- 푸터 (모달 하단 고정) -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">취소</el-button>
        <el-button class="black-button" type="primary" @click="submitForm">추가완료</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import Editor from '@/components/Editor.vue'

const emit = defineEmits(["close"]);

// 폼 데이터
const formData = ref({
  code1: '',
  code2: '',
  title: '',
  importance: '',
  risk: '',
  area: '',
  common: '',
  managers: [],
  exception: '',
  tags: [],
  relatedPolicies: [],
  detailGuide: ''
});

// 입력값
const inputManager = ref('');
const inputTag = ref('');
const inputPolicy = ref('');

// 담당자 추가
const addManager = () => {
  if (inputManager.value.trim()) {
    formData.value.managers.push(inputManager.value.trim());
    inputManager.value = '';
  }
}

// 담당자 삭제
const removeManager = (index) => {
  formData.value.managers.splice(index, 1);
}

// 태그 추가
const addTag = () => {
  if (inputTag.value.trim()) {
    formData.value.tags.push(inputTag.value.trim());
    inputTag.value = '';
  }
}

// 태그 삭제
const removeTag = (index) => {
  formData.value.tags.splice(index, 1);
}

// 유관 정책 추가
const addPolicy = () => {
  if (inputPolicy.value.trim()) {
    formData.value.relatedPolicies.push(inputPolicy.value.trim());
    inputPolicy.value = '';
  }
}

// 유관 정책 삭제
const removePolicy = (index) => {
  formData.value.relatedPolicies.splice(index, 1);
}

const closeDialog = () => {
  emit("close", false);
}

const submitForm = () => {
  console.log('제출된 데이터:', formData.value)
  closeDialog()
}
</script>

<style scoped src="@/assets/styles/components/PolicyDataDialog.css"></style>
