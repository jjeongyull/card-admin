<template>
 <el-form>
   <el-form-item label="이름">
     <el-input v-model="name" placeholder="이름을 입력하세요" />
   </el-form-item>
   <el-form-item label="이메일">
     <el-input v-model="email" placeholder="이메일을 입력하세요" />
   </el-form-item>
 </el-form>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
</script>
