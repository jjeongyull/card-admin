

<template>
  <el-dialog
    v-model="dialogVisible"
    title="일괄 변경 (20건)"
    :width="dialogWidth"
    :close-on-click-modal="false"
    class="custom-dialog"
    align-center
    @close="closeDialog"
  >
    <el-scrollbar class="no-x-scroll">
      <div class="modal-body">

        <el-form label-position="top">

          <el-form-item label="상태">
            <el-radio-group v-model="form.status">
              <el-radio label="준비">준비</el-radio>
              <el-radio label="운영">운영</el-radio>
              <el-radio label="종료">종료</el-radio>
              <el-radio label="폐기">폐기</el-radio>
              <el-radio label="기타">기타</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="용도구분">
            <el-radio-group v-model="form.cateogory">
              <el-radio label="운영">운영</el-radio>
              <el-radio label="검증">검증</el-radio>
              <el-radio label="개발">개발</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 인프라 담당자 -->
          <el-form-item label="인프라 담당자">
            <el-input v-model="managerTag" placeholder="인프라 담당자" @keyup.enter="() => addTag(0)" />
            <div class="tag-container">
              <el-tag
                v-for="(tag, index) in form.managers"
                :key="index"
                closable
                @close="() => removeTag(index, 0)"
                effect="dark"
                round
                type="info"
              >
                {{ tag }}
              </el-tag>
            </div>
          </el-form-item>

          <!-- 자산그룹 -->
          <el-form-item label="자산그룹">
            <el-input v-model="groupTag" placeholder="자산그룹" @keyup.enter="() => addTag(1)" />
            <div class="tag-container">
              <el-tag
                v-for="(tag, index) in form.groups"
                :key="index"
                closable
                @close="() => removeTag(index, 1)"
                effect="dark"
                round
                type="info"
              >
                {{ tag }}
              </el-tag>
            </div>
          </el-form-item>

          <!-- 점검그룹 -->
          <el-form-item label="점검그룹">
            <el-input v-model="checkTag" placeholder="점검그룹" @keyup.enter="() => addTag(2)" />
            <div class="tag-container">
              <el-tag
                v-for="(tag, index) in form.checks"
                :key="index"
                closable
                @close="() => removeTag(index, 2)"
                effect="dark"
                round
                type="info"
              >
                {{ tag }}
              </el-tag>
            </div>
          </el-form-item>

        </el-form>
      </div>
    </el-scrollbar>

    <!-- 하단 버튼 -->
    <template #footer>
      <div class="dialog-footer" >
        <BaseButton class="white-button" @click="closeDialog">취소</BaseButton>
        <BaseButton @click="submitForm" class="black-button">확인</BaseButton>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});
const form = ref({
  status: "",
  category: "",
  managers: [],
  groups: [],
  checks: [],
})


const emit = defineEmits(["close"]);

// 다이얼로그의 상태 동기화
const dialogVisible = ref(false);
watch(() => props.visible, (val) => {
  dialogVisible.value = val;
});

const closeDialog = () => {
  dialogVisible.value = false;
  emit("close", false);
};

// 인프라 담당자
const managerTag = ref("");
const groupTag = ref("");
const checkTag = ref("");
const addTag = (type) => {
  if(type === 0){
    if (managerTag.value && !form.value.managers.includes(managerTag.value)) {
      form.value.managers.push(managerTag.value);
      managerTag.value = "";
    }
  }else if(type === 1){
    if (groupTag.value && !form.value.groups.includes(groupTag.value)) {
      form.value.groups.push(groupTag.value);
      groupTag.value = "";
    }
  }else if(type === 2){
    if (checkTag.value && !form.value.checks.includes(checkTag.value)) {
      form.value.checks.push(checkTag.value);
      checkTag.value = "";
    }
  }

};
const removeTag = (index, type) => {
  if(type === 0){
    form.value.managers.splice(index, 1);
  }else if(type === 1){
    form.value.groups.splice(index, 1);
  }else if(type === 2){
    form.value.checks.splice(index, 1);
  }
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
