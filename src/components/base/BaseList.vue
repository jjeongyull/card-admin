<template>
  <div>
    <el-card
      v-for="item in filteredDetails"
      :key="item.complianceSeq"
      class="detail-card"
      @update="openUpdatePop"
      >
      <!-- 카테고리 및 제목 -->
      <div class="card-chk">
        <el-checkbox v-model="item.checked"></el-checkbox>
        <span class="subtitle">{{ item.categoryName }}</span>
      </div>
      <div class="card-header">
        <el-tag class="dot" type="success" effect="dark"></el-tag>
        <span class="title" @click="updateDataPopup(item)">{{ item.categoryName }}</span>
        <div
          class="tags"
          v-for="tagItem in item.tags"
          :key="tagItem.itemTagSeq"
        >
          <el-tag size="small" type="info">{{ tagItem.tagName }}</el-tag>
        </div>
      </div>

      <!-- 중요도, 위험등급, 코드 정보 -->
      <div class="info">
        <div>
          <el-tag style="opacity: 0;" class="dot" type="success" effect="dark"></el-tag>
          <span>중요도 <strong>{{ item.policyLevel }}</strong></span>
          <span>위험등급 <strong class="danger">{{ item.threatLevelName }}</strong></span>
          <span>코드 {{ item.itemCode }} 대상 {{ item.target }}</span>
        </div>
        <div class="footer">
        <el-tag style="opacity: 0;" class="dot" type="success" effect="dark"></el-tag>
          <div>
            <p class="date">{{ item.regDate.substr(0, 10) }}</p>
            <p class="author">운영 |
              <span
                v-for="(maItem, index) in item.managers"
                  :key="maItem.userId"
              >
                <strong v-if="index > 0">, {{ maItem.userName }}</strong>
                <strong v-else>{{ maItem.userName }}</strong>
              </span>

            </p>
          </div>
        </div>
      </div>
    </el-card>
  </div>

</template>

<script setup>
  defineProps({
    filteredDetails: {
      type: Array,
      required: true
    }
  });
  const emit = defineEmits(["openPanel"]);

  const updateDataPopup = (data) => {
    emit("openPanel", data);
  }
</script>

<style scoped src="@/assets/styles/components/ElcardDiv.css"></style>
