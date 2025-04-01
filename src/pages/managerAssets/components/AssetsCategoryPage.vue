<template>
  <el-row :gutter="20" class="responsive-row-inner">
    <el-col class="border-right col-list" :xs="24" :sm="24" :md="8">
      <div class="flex-space mb-20">
        <h3>대분류</h3>
        <BaseButton @click="openCategoryPopup" class="white-button">대분류 자산 구분 등록&nbsp; <el-icon><Plus/></el-icon></BaseButton>
      </div>

      <ul class="list-warpper-500">
        <ExtraList
          v-for="(asset, index) in dumiData"
          :key="asset.id"
          :asset="asset"
          :historyView="false"
          @edit-click="editCategory"
          @click="showChildCategory"
        />
      </ul>
    </el-col>
    <el-col class="border-right col-list" :xs="24" :sm="24" :md="8">
      <div class="flex-space mb-20">
        <h3>중분류</h3>
        <BaseButton @click="openCategoryPopup" class="white-button" :disabled="disabled_1">중분류 자산 구분 등록&nbsp; <el-icon><Plus/></el-icon></BaseButton>
      </div>
      <ul class="list-warpper-500">
        <ExtraList
          v-for="(asset, index) in category_list_1"
          :key="asset.id"
          :asset="asset"
          :historyView="false"
          @edit-click="editCategory"
          @click="showChildCategory"
        />
      </ul>
    </el-col>
    <el-col class="col-list" :xs="24" :sm="24" :md="8">
      <div class="flex-space mb-20">
        <h3>소분류</h3>
        <BaseButton @click="openCategoryPopup" class="white-button" :disabled="disabled_2">소분류 자산 구분 등록&nbsp; <el-icon><Plus/></el-icon></BaseButton>
      </div>
      <ul class="list-warpper-500">
        <ExtraList
          v-for="(asset, index) in category_list_2"
          :key="asset.id"
          :asset="asset"
          :historyView="false"
          @edit-click="editCategory"
          @click="showChildCategory"
        />
      </ul>
    </el-col>

    <AssetCategoryDialog
      :visible="categorypopupVisible"
      :data="selectData"
      @close="closeCategoryPopup"
    />
  </el-row>
</template>

<script setup>
import { ref } from "vue";
import AssetCategoryDialog from "../dialogs/AssetCategoryDialog.vue";

// 중분류 버튼 활성화
const disabled_1 = ref(true);
const category_list_1 = ref([]);
// 소분류 버튼 활성화
const disabled_2 = ref(true);
const category_list_2 = ref([]);

// 분류 데이터
const selectData = ref(null);

// 카테고리 팝업
const categorypopupVisible = ref(false)

// 카테고리 등록
const openCategoryPopup = () => {
  categorypopupVisible.value = true;
}
// 카테고리 수정
const editCategory = (item) => {
  selectData.value = item;
  categorypopupVisible.value = true;
}

// 하위 카테고리 리스트 출력
const showChildCategory = (items) => {
  let child_index = items.childIndex;
  let list_data = findCategoryById(items.id);

  if(child_index === 0){
    category_list_1.value = list_data.subcategories;
    disabled_1.value = false;
    category_list_2.value = [];
    disabled_2.value = true;
  }else if(child_index === 1){
    category_list_2.value = list_data.subcategories;
    disabled_2.value = false;
  }
}

const closeCategoryPopup = () => {
  selectData.value = null;
  categorypopupVisible.value = false;
}

const dumiData = [
    {
      id: 1,
      childIndex: 0,
      name: "Electronics",
      managers: "John Doe",
      date: "2025-03-31",
      description: "Category for all electronic devices",
      subcategories: [
        {
          id: 11,
          childIndex: 1,
          name: "Mobile",
          managers: "Jane Smith",
          date: "2025-03-31",
          description: "Subcategory for mobile devices",
          subcategories: [
            {
              id: 111,
              childIndex: 2,
              name: "Smartphones",
              managers: "Alice Johnson",
              date: "2025-03-31",
              description: "Category for smartphones"
            },
            {
              id: 112,
              childIndex: 2,
              name: "Tablets",
              managers: "Bob Brown",
              date: "2025-03-31",
              description: "Category for tablets"
            }
          ]
        },
        {
          id: 12,
          childIndex: 1,
          name: "Computers",
          managers: "Charles Davis",
          date: "2025-03-31",
          description: "Subcategory for computer devices",
          subcategories: [
            {
              id: 121,
              childIndex: 2,
              name: "Laptops",
              managers: "David Evans",
              date: "2025-03-31",
              description: "Category for laptops"
            },
            {
              id: 122,
              childIndex: 2,
              name: "Desktops",
              managers: "Eva Green",
              date: "2025-03-31",
              description: "Category for desktop computers"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      childIndex: 0,
      name: "Fashion",
      managers: "Michael Lee",
      date: "2025-03-31",
      description: "Category for fashion items",
      subcategories: [
        {
          id: 21,
          childIndex: 1,
          name: "Clothing",
          managers: "Sarah Kim",
          date: "2025-03-31",
          description: "Subcategory for clothing items",
          subcategories: [
            {
              id: 211,
              childIndex: 2,
              name: "Men's Clothing",
              managers: "Nancy Wilson",
              date: "2025-03-31",
              description: "Category for men's clothing"
            },
            {
              id: 212,
              childIndex: 2,
              name: "Women's Clothing",
              managers: "Laura Davis",
              date: "2025-03-31",
              description: "Category for women's clothing"
            }
          ]
        },
        {
          id: 22,
          childIndex: 1,
          name: "Shoes",
          managers: "Tom Harris",
          date: "2025-03-31",
          description: "Subcategory for shoes",
          subcategories: [
            {
              id: 221,
              childIndex: 2,
              name: "Sneakers",
              managers: "Alex Martinez",
              date: "2025-03-31",
              description: "Category for sneakers"
            },
            {
              id: 222,
              childIndex: 2,
              name: "Formal Shoes",
              managers: "Rachel Adams",
              date: "2025-03-31",
              description: "Category for formal shoes"
            }
          ]
        }
      ]
    }
  ];

  /**
   * id값과 알맞은 카테고리 데이터를 리턴시키는 함수
   * @param id 카테고리 번호
   * @param categories 전체 카테고리 리스트
   */
  const findCategoryById =  (id, categories = dumiData) => {
    for (const category of categories) {
      if (category.id === id) {
        return category;
      }
      if (category.subcategories && category.subcategories.length > 0) {
        const found = findCategoryById(id, category.subcategories);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }
</script>

<style scoped>
.col-list{
  padding: 10px;
}
.border-right{
  border-right: 1px solid #E4E7ED;
}
</style>