<template>
  <el-dialog
    v-model="dialogVisible"
    title="자산 등록"
    :width="dialogWidth"
    :close-on-click-modal="false"
    class="custom-dialog"
    align-center
    @close="closeDialog"
  >
    <el-scrollbar class="no-x-scroll">
      <div class="modal-body">
        <h3 class="subtitle">자산구분: 현대카드 IOS 앱 수정</h3>

        <el-form label-position="top">
          <!-- 업무명 -->
          <el-form-item label="업무명">
            <el-input v-model="form.taskName" placeholder="플레이스홀더" />
          </el-form-item>

          <!-- 상태 -->
          <el-form-item label="상태">
            <el-select v-model="form.status" placeholder="플레이스홀더" style="width: 100%;">
              <el-option label="진행 중" value="ongoing" />
              <el-option label="완료" value="completed" />
            </el-select>
          </el-form-item>

          <!-- 대내/내외 선택 -->
          <el-form-item label="대내 / 내외">
            <el-radio-group v-model="form.scope">
              <el-radio label="대내">대내</el-radio>
              <el-radio label="대외">대외</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 플랫폼 분류 -->
          <el-form-item label="플랫폼 분류">
            <el-radio-group v-model="form.platform">
              <el-radio label="웹">웹</el-radio>
              <el-radio label="앱">앱</el-radio>
              <el-radio label="기타">기타</el-radio>
              <el-input v-if="form.platform === '기타'" v-model="form.platformEtc" placeholder="기타항목" />
            </el-radio-group>
          </el-form-item>

          <!-- 정보 사용 유무 -->
          <el-form-item label="정보 사용 유무">
            <div class="input-round-box">
              <div class="info-use-group mb-20">
                <div class="info-use-item">
                  <p>개인정보</p>
                  <el-radio-group v-model="form.personalInfo">
                    <el-radio label="예">예</el-radio>
                    <el-radio label="아니오">아니오</el-radio>
                  </el-radio-group>
                </div>
                <div class="info-use-item">
                  <p>신용정보</p>
                  <el-radio-group v-model="form.creditInfo">
                    <el-radio label="예">예</el-radio>
                    <el-radio label="아니오">아니오</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="info-use-group">
                <div class="info-use-item">
                  <p>광고성 정보발송</p>
                  <el-radio-group v-model="form.adInfo">
                    <el-radio label="예">예</el-radio>
                    <el-radio label="아니오">아니오</el-radio>
                  </el-radio-group>
                </div>
                <div class="info-use-item">
                  <p>위치정보</p>
                  <el-radio-group v-model="form.locationInfo">
                    <el-radio label="예">예</el-radio>
                    <el-radio label="아니오">아니오</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>

          </el-form-item>

          <!-- 외부 자산 사용 여부 -->
          <el-form-item label="외부 자산 사용 여부">
            <div class="input-round-box">
              <div class="mb-20">
                <el-form-item label="대외 클라우드">
                  <el-radio-group v-model="form.externalAsset">
                    <el-radio label="예">예</el-radio>
                    <el-radio label="아니오">아니오</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div class="mb-20">
                <el-form-item label="공급업체">
                  <el-radio-group v-model="form.supplier">
                    <el-radio label="아마존">아마존</el-radio>
                    <el-radio label="마이크로소프트">마이크로소프트</el-radio>
                    <el-radio label="구글클라우드">구글클라우드</el-radio>
                    <el-radio label="IBM">IBM</el-radio>
                    <el-radio label="오라클">오라클</el-radio>
                    <el-radio label="기타">기타</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="서비스 유형">
                  <el-checkbox-group v-model="form.serviceType">
                    <el-checkbox label="LaaS">LaaS</el-checkbox>
                    <el-checkbox label="PaaS">PaaS</el-checkbox>
                    <el-checkbox label="SaaS">SaaS</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>

          </el-form-item>

          <!-- 서비스 접속 정보 -->
          <el-form-item label="서비스 접속 정보">
            <div class="input-round-box mb-20">
              <el-tabs v-model="form.serviceTab">
                <el-tab-pane label="운영" name="운영"></el-tab-pane>
                <el-tab-pane label="검증" name="검증"></el-tab-pane>
                <el-tab-pane label="개발" name="개발"></el-tab-pane>
                <el-tab-pane label="베타" name="베타"></el-tab-pane>
              </el-tabs>
              <el-input class="mb-20" v-model="form.serviceIp" placeholder="서비스 IP" />
              <el-input class="mb-20" v-model="form.port" placeholder="포트번호" />
              <el-input v-model="form.domain" placeholder="도메인" />
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>

    <!-- 하단 버튼 -->
    <template #footer>
      <div class="dialog-footer">
        <BaseButton @click="closeDialog">취소</BaseButton>
        <BaseButton @click="submitForm" class="black-button">추가완료</BaseButton>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const form = ref({
  taskName: "",
  status: "",
  scope: "대내",
  platform: "",
  platformEtc: "",
  personalInfo: "",
  creditInfo: "",
  adInfo: "",
  locationInfo: "",
  externalAsset: "",
  supplier: "",
  serviceType: [],
  serviceTab: "운영",
  serviceIp: "",
  port: "",
  domain: "",
});

const props = defineProps({
  visible: Boolean,
});

const emit = defineEmits(["close"]);

const dialogVisible = ref(false);
watch(() => props.visible, (val) => {
  dialogVisible.value = val;
});

const closeDialog = () => {
  dialogVisible.value = false;
  emit("close", false);
};

const submitForm = () => {
  console.log("제출 데이터:", form.value);
};

// 반응형 다이얼로그 크기 설정
const dialogWidth = ref(window.innerWidth < 600 ? "90vw" : "600px");
const updateDialogWidth = () => {
  dialogWidth.value = window.innerWidth < 600 ? "90vw" : "600px";
};

onMounted(() => {
  window.addEventListener("resize", updateDialogWidth);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateDialogWidth);
});
</script>

<style scoped src="@/assets/styles/pages/PolicyCompliance.css"></style>
<style scoped>
.custom-dialog {
  max-width: 600px;
}
.subtitle {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #DCDFE6;
}
.no-x-scroll {
  overflow-x: hidden;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.input-round-box{
  width: 100%;
  border: 1px solid #DCDFE6;
  padding: 20px;
  border-radius: 20px;
}
.info-use-group{
  display: flex ;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
