

<template>
  <div class="login-container">
    <BaseCard class="login-form">
      <div class="login-card-header">
        <img :src="config.logo" alt="Logo" class="login-logo">
        <p>취약점 통합 관리 시스템 (VIMS)</p>
      </div>
      <div class="login-card-body" v-if="viewState === 0">
        <el-input type="text" v-model="loginForm.username" placeholder="아이디" />
        <el-input type="password" v-model="loginForm.password" placeholder="비밀번호" />
      </div>
      <div class="login-card-body" v-else-if="viewState === 1">
        <el-input type="password" v-model="otpForm.otpNumber" placeholder="OTP 번호" />
        <div class="otp-body">
          <el-checkbox v-model="mpassUse" label="MPASS" size="large" />
          <BaseButton class="white-button round-botton" size="small" type="primary">
            <el-icon><Download /></el-icon>&nbsp;&nbsp;인증서 다운로드
          </BaseButton>
        </div>
      </div>
      <BaseButton class="black-button" @click="changeViewType">로그인</BaseButton>
    </BaseCard>

  </div>
</template>


<script setup>
import { ref } from 'vue';
import configData from '@/data/config.json';
import router from '@/router'

const config = ref(configData);
const viewState = ref(0);
const mpassUse = ref(false);

const loginForm = ref({
  username: '',
  password: ''
});

const otpForm = ref({
  otpNumber: ''
});

const changeViewType = () => {
  if(viewState.value === 1){
    router.push({ name: 'Dashboard', params: {} })
  }
  viewState.value = 1;
}
</script>

<style scoped lang="scss" src="@/assets/styles/pages/login.scss"></style>
