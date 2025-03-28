

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="selectData?'업무 수정': '업무 등록'"
    :width="dialogWidth"
    :close-on-click-modal="false"
    class="custom-dialog"
    align-center
    @close="closeDialog"
  >
    <el-scrollbar class="no-x-scroll">
      <div class="modal-body">

        <el-form label-position="top">
          <!-- 업무명 -->
          <el-form-item label="업무명">
            <el-input v-model="form.name" placeholder="업무명을 입력해주세요." />
          </el-form-item>

          <!-- 상태 -->
          <el-form-item label="상태">
            <BaseSelect
              v-model="form.status"
              placeholder="플레이스홀더"
              style="width: 100%;"
              :selectData="['진행 중', '완료']"
            />
          </el-form-item>

          <el-form-item label="대내/내외">
            <el-radio-group v-model="form.scope">
              <el-radio label="대내">대내</el-radio>
              <el-radio label="내외">내외</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 담당자 -->
          <el-form-item label="담당자">
            <el-input v-model="newTag" placeholder="담당자" @keyup.enter="addTag" />
            <div class="tag-container">
              <el-tag
                v-for="(tag, index) in form.managers"
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

          <!-- 상세설명 -->
          <el-form-item label="상세설명" v-if="selectData === null">
            <el-input v-model="form.description" type="textarea" placeholder="상세설명을 입력해주세요." />
          </el-form-item>

          <table class="black-table" v-else style="margin-bottom: 20px;">
            <thead>
              <tr>
                <th class="first">웹</th>
                <th>앱</th>
                <th>서버 (OS)</th>
                <th>데이터베이스</th>
                <th class="last">WEB / WAS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="first">3</td>
                <td>7</td>
                <td>16</td>
                <td>2</td>
                <td class="last">3</td>
              </tr>
            </tbody>
          </table>


          <!-- 파일 업로드 -->
          <el-form-item label="첨부파일">
            <el-upload
              class="upload-container"
              drag
              multiple
              :show-file-list="true"
              :before-upload="beforeUpload"
              :file-list="form.files"
              :on-remove="handleRemove"
              :auto-upload="false"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <p>파일을 이곳에 드래그하거나 <span class="upload-text">여기를 클릭해주세요</span></p>
              <p class="upload-hint">jpg/png files with a size less than 500KB.</p>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>

    <!-- 하단 버튼 -->
    <template #footer>
      <div class="dialog-footer" :class="selectData === null? 'flex-end': 'space'">
        <BaseButton v-if="selectData" type="danger" @click="deletePolicy">
          <el-icon><Delete /></el-icon> 삭제
        </BaseButton>

        <div class="footer-right">
          <BaseButton class="white-button" @click="closeDialog">취소</BaseButton>
          <BaseButton @click="submitForm" class="black-button">추가완료</BaseButton>
        </div>

      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const form = ref({
  name: null,
  status: null,
  scope: null,
  managers: [],
  description: null,
  files: [],
});

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  selectData: {
    type: Object,
    default: null
  }
});

const selectedData = ref(null);
watch(() => props.selectData, (newVal) => {
  selectedData.value = newVal;
  if (newVal) {
    form.value = { ...newVal };
  }
}, { immediate: true });


const emit = defineEmits(["close"]);

// 다이얼로그의 상태 동기화
const dialogVisible = ref(false);
watch(() => props.visible, (val) => {
  dialogVisible.value = val;
});

const closeDialog = () => {
  dialogVisible.value = false;
  selectedData.value = null;
  form.value = {name: null, status: null, scope: null, managers: [], description: null, files: [],}
  emit("close", false);
};

const newTag = ref("");

const addTag = () => {
  if (newTag.value && !form.value.managers.includes(newTag.value)) {
    form.value.managers.push(newTag.value);
    newTag.value = "";
  }
};

const removeTag = (index) => {
  form.value.managers.splice(index, 1);
};

const beforeUpload = (file) => {
  if (file.size > 500 * 1024) {
    alert("파일 크기가 500KB를 초과할 수 없습니다.");
    return false;
  }
  return true;
};

const handleRemove = (file, fileList) => {
  form.value.files = fileList;
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
