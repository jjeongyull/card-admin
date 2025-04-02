

<template>
  <el-dialog
    v-model="dialogVisible"
    title="점검결과 알림 이메일"
    :width="dialogWidth"
    :close-on-click-modal="false"
    class="custom-dialog"
    align-center
    @close="closeDialog"
  >
    <el-scrollbar class="no-x-scroll">
      <div class="modal-body">
        <el-form label-position="top">
          <div class="flex-space gap-10">
            <el-form-item label="수신자" class="w-full">
              <el-input v-model="recipient" placeholder="담당자" @keyup.enter="addTag"/>
              <div class="tag-container">
                <el-tag
                  v-for="(tag, index) in recipientList"
                  :key="index"
                  closable
                  @close="removeTag(index)"
                  effect="dark"
                  round
                  type="info"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </el-form-item>
            <el-form-item label="참조자" class="w-full">
              <el-input v-model="referrer" placeholder="담당자" @keyup.enter="addReferrerTag"/>
              <div class="tag-container">
                <el-tag
                  v-for="(tag, index) in referrerList"
                  :key="index"
                  closable
                  @close="removeReferrerTag(index)"
                  effect="dark"
                  round
                  type="info"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </el-form-item>
          </div>


          <el-form-item label="제목">
            <el-input v-model="title" placeholder="제목을 입력해주세요." />
          </el-form-item>


          <el-form-item label="심의 요청 사항">
            <el-input v-model="info" placeholder="상세설명을 입력해주세요." />
          </el-form-item>
        </el-form>



      </div>
    </el-scrollbar>

    <!-- 하단 버튼 -->
    <template #footer>
      <div class="dialog-footer flex-space">
        <BaseButton class="info-button">
          나에게 테스트 발송&nbsp;<el-icon><CaretRight /></el-icon>
        </BaseButton>

        <div class="footer-right">
          <BaseButton plain @click="closeDialog" class="info-button">닫기</BaseButton>
          <BaseButton class="black-button" @click="submitForm">요청하기</BaseButton>
        </div>
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

const emit = defineEmits(["close"]);

// 다이얼로그의 상태 동기화
const dialogVisible = ref(false);

watch(() => props.visible, (val) => {
  dialogVisible.value = val;
});

const closeDialog = () => {
  dialogVisible.value = false;
  emit("close");
};

const title = ref('');
const info = ref('');

const recipient = ref("");
const recipientList = ref([]);

const addTag = () => {
  if (recipient.value && !recipientList.value.includes(recipient.value)) {
    recipientList.value.push(recipient.value);
    recipient.value = "";
  }
};
const removeTag = (index) => {
  recipientList.value.splice(index, 1);
};

const referrer = ref("");
const referrerList = ref([]);

const addReferrerTag = () => {
  if (referrer.value && !referrerList.value.includes(referrer.value)) {
    referrerList.value.push(referrer.value);
    referrer.value = "";
  }
};
const removeReferrerTag = (index) => {
  referrerList.value.splice(index, 1);
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
