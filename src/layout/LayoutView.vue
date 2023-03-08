<template>
  <!-- Header -->
  <el-container>
    <el-header class="p-0">
      <NavBar @closeMenu="swiutchMenu" :isShowMenu="showMenu" />
    </el-header>
  </el-container>
  <el-container>
    <div class="absolute w-full" :style="{ height: height }">
      <!-- Menu -->
      <MenuItem
        :showMenu="showMenu"
        :height="height"
        :itemList="munuItemList"
        @closeMenu="swiutchMenu"
      />
      <!-- Main -->
      <div
        class="absolute inset-0 p-0 w-full"
        :style="{ height: height, zIndex: showMenu ? 0 : 1 }"
      >
        <el-main class="p-0 w-full">
          <div class="h-full">
            <el-scrollbar>
              <router-view />
            </el-scrollbar>
          </div>
        </el-main>
      </div>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import NavBar from "./components/NavBar.vue";
import MenuItem from "./components/MenuItem.vue";

const height = computed(() => "calc( 100vh - 60px )");
const showMenu = ref(false);

const munuItemList = [
  {
    id: "0",
    name: "首頁",
    icon: "HomeFilled",
  },
  {
    id: "1",
    name: "成員管理區",
    icon: "UserFilled",
  },
  {
    id: "2",
    name: "出席紀錄區",
    icon: "List",
  },
  {
    id: "3",
    name: "操作紀錄區",
    icon: "EditPen",
  },
  {
    id: "4",
    name: "財務紀錄區",
    icon: "Tickets",
  },
  {
    id: "5",
    name: "社費收取區",
    icon: "Money",
  },
  {
    id: "6",
    name: "活動紀錄區",
    icon: "Basketball",
  },
  {
    id: "7",
    name: "意見回饋區",
    icon: "ChatLineSquare",
  },
];

// 關閉開啟選單
const swiutchMenu = () => {
  showMenu.value = !showMenu.value;
};
</script>
