<template>
  <transition class="slide" name="slide">
    <div v-if="visible" class="policy-detail-panel">
      <div class="panel-header">
        <h3>단위 정책 검색 및 추가</h3>
        <BaseButton type="text" class="close-btn" @click="closePanel">
          <el-icon><Close /></el-icon>
        </BaseButton>
      </div>
      <p>개인신용 정보 보유 및 삭제에 추가할 단위 정책을 검색하세요.</p>

      <el-scrollbar class="panel-body">
        <el-row :gutter="20">
          <el-col :span="10">

          </el-col>
          <el-col :span="4">
            <BaseSelect
              v-model="policyData"
              placeholder="정책명"
              :selectData="['정책명1']"
            />
          </el-col>
          <el-col :span="10">

          </el-col>
        </el-row>

        <BaseList
          :listData="listData"
        ></BaseList>


      </el-scrollbar>
    </div>
  </transition>

</template>

<script setup>
import { ref } from "vue";
import { Close } from "@element-plus/icons-vue";
import policyDetailData from '@/data/policy_detail.json';

const props = defineProps({
  visible: Boolean
});

const emit = defineEmits(["close"]);

const policyData = ref(null);
const listData = ref(policyDetailData);


const closePanel = () => {
  emit("close");
};

</script>
