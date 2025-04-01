<template>
  <el-dialog
    v-model="dialogVisible"
    :title="updataData?'평가수준 수정':'평가수준 등록'"
    :width="dialogWidth"
    :close-on-click-modal="false"
    class="custom-dialog"
    align-center
    @close="closeDialog"
  >
    <el-scrollbar class="no-x-scroll">
      <div class="modal-body">
        <el-form label-position="top">
          <!-- 상위 분류명 -->
          <el-form-item v-if="updataData && updataData.childIndex !== 0" class="mb-20" label="상위 분류명">
            <el-input readonly v-model="form.parentName" placeholder="상위 분류명을 입력해주세요." />
          </el-form-item>

          <!-- 분류명 -->
          <el-form-item class="mb-20" label="구분">
            <el-input v-model="form.name" placeholder="기밀성" />
          </el-form-item>

          <el-form-item class="mb-20" label="사용여부">
            <BaseSelect
              v-model="form.active"
              placeholder='평가수준'
              :selectData="['상', '중', '하']"
            />
          </el-form-item>

          <!-- 상세설명 -->
          <el-form-item label="상세설명">
            <el-input
              v-model="form.description"
              type="textarea"
              rows="3"
              placeholder="상세설명을 입력해주세요"
            />
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>

    <!-- 하단 버튼 -->
    <template #footer>
      <div class="dialog-footer" :class="{ 'flex-space': updataData }">

        <BaseButton v-if="updataData" type="danger">
          <el-icon><Delete /></el-icon> 삭제
        </BaseButton>

        <div class="footer-right">
          <BaseButton class="white-button" @click="closeDialog">취소</BaseButton>
          <BaseButton @click="submitForm" class="black-button">평가수준 등록</BaseButton>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const form = ref({
  category: "",
  level: "",
  description: ""
});
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {type: Object, default: null}
});

const updataData = ref(null);

const emit = defineEmits(["close"]);
// 다이얼로그의 상태 동기화
const dialogVisible = ref(false);
watch(() => props.visible, (val) => {
  dialogVisible.value = val;
});
watch(() => props.data, (val) => {
  updataData.value = val;
});
const closeDialog = () => {
  dialogVisible.value = false;
  updataData.value = null;
  emit("close");
};




const submitForm = () => {
  console.log("제출 데이터:", form.value);
  // dialogVisible.value = false;
};

// 반응형 다이얼로그 크기 설정
const dialogWidth = ref(window.innerWidth < 600 ? "90vw" : "600px");
const updateDialogWidth = () => {
  dialogWidth.value = window.innerWidth < 600 ? "90vw" : "600px";
};

// 창 크기 변경 이벤트 감지 (반응형 지원)
onMounted(() => {
  window.addEventListener("resize", updateDialogWidth);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateDialogWidth);
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/components/NewCompliance.css';
</style>
