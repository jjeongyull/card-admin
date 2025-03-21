<template>
  <div >
    <el-card
      v-for="item in filteredDetails"
      :key="item.complianceSeq"
      class="detail-card"
      :draggable="droppable"
      @dragstart="(event) => onDragStart(event, item, index)"
      @dragover.prevent
      @drop="(event) => onDrop(event, index)"
    >
      <!-- 카테고리 및 제목 -->
      <div class="card-chk">
        <el-checkbox v-model="item.checked" @click.stop></el-checkbox>
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
          <el-tag size="small" type="primary" effect="plain" round>{{ tagItem.tagName }}</el-tag>
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
import { ref } from "vue";
  const draggedItem = ref(null);
  const draggedIndex = ref(null);

  const props = defineProps({
    filteredDetails: {
      type: Array,
      required: true,

    },
    droppable: {type: Boolean, default: false}
  });
  const emit = defineEmits(["openPanel", "dropItem"]);

  const onDragStart = (event, item, index) => {
  console.log("Drag Start", item);
  draggedItem.value = item;
  draggedIndex.value = index;

  event.dataTransfer.setData("application/json", JSON.stringify(item));
  event.dataTransfer.effectAllowed = "move";

  // 드래그 중인 요소 스타일 추가
  event.target.classList.add("dragging");
};

const onDrop = (event, targetIndex) => {
  event.preventDefault();
  if (draggedItem.value === null) return;

  console.log(" Drop at index:", targetIndex);

  const newList = [...props.filteredDetails];
  newList.splice(draggedIndex.value, 1);
  newList.splice(targetIndex, 0, draggedItem.value);

  emit("updateList", newList); // 부모 컴포넌트에 데이터 전달

  draggedItem.value = null;
  draggedIndex.value = null;
};


  const updateDataPopup = (data) => {
    emit("openPanel", data);
  }
</script>

<style scoped lang="scss" src="@/assets/styles/components/BaseList.scss"></style>
