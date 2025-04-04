

<template>
  <el-dialog
    v-model="dialogVisible"
    title="점검결과 조치 의견 등록"
    :width="dialogWidth"
    :close-on-click-modal="false"
    class="custom-dialog"
    align-center
    @close="closeDialog"
  >
    <el-scrollbar class="no-x-scroll">
      <div class="modal-body">
        <el-row :gutter="20" class="mb-20">
          <el-col :xs="24" :sm="24" :md="8">
            <h4 class="mb-10">정책코드</h4>
            <p class="uderline-text black-bold">SRV-069</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8">
            <h4 class="mb-10">위험등급</h4>
            <p class="uderline-text black-bold">상</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8">
            <h4 class="mb-10">점검결과</h4>
            <p class="uderline-text black-bold">취약</p>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mb-20">
          <el-col :xs="24" :sm="24" :md="24">
            <h4 class="mb-10">점검항목</h4>
            <p class="uderline-text black-bold">바밀번호 관리정택 설정 미비</p>
          </el-col>
        </el-row>
        <div>
          <h4 class="mb-10">점검항목</h4>
          <div class="input-round-box">
            FILE:[/etc/pam.d/system-auth]<br>
            FILE:[/etc/security/pwquality.conf]<br>
            점검값 [minlen]<br>
            정책 [0] 개 조합<br>
            기준 [10] 이상<br>
            현황 [minlen 설정이 없습니다.]<br>
            <br>
            점검값 [ucredit]<br>
            기준 [-1] 이하<br>
            현황 [ucredit 설정이 없습니다.]<br>
            <br>
            점검값 [lcredit]<br>
            기준 [-1] 이하<br>
            현황 [lcredit 설정이 없습니다.]<br>
            <br>
            점검값 [dcredit]<br>
            기준 [-1] 이하<br>
            현황 [dcredit 설정이 없습니다.]<br>
            <br>
            점검값 [ocredit]<br>
            기준 [-1] 이하<br>
            현황 [ocredit 설정이 없습니다.]<br>
            <br>
            파일 [/etc/login.defs]<br>
            점검값 [PASS_MAX_DAYS]<br>
            기준 [90] 이하<br>
            현황 [PASS_MAX_DAYS 99999]<br>
            <br>
            점검값 [PASS_MIN_LEN]<br>
            기준 [8] 이상<br>
            현황 [PASS_MIN_LEN = 5]<br>
          </div>
        </div>
      </div>
    </el-scrollbar>

    <!-- 하단 버튼 -->
    <template #footer>
      <div class="dialog-footer">
        <BaseButton @click="closeDialog" class="black-button">확인</BaseButton>
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
  },
  data: Object
});

const emit = defineEmits(["close"]);

// 다이얼로그의 상태 동기화
const dialogVisible = ref(false);
const selectedData = ref(null);
watch(() => props.visible, (val) => {
  dialogVisible.value = val;
});
watch(() => props.data, (val) => {
  selectedData.value = val;
});
const closeDialog = () => {
  dialogVisible.value = false;
  selectedData.value = null;
  emit("close");
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
