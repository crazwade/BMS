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
        :itemList="permissionStore.route"
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
import { usePermissionStore } from "../store/store";

const height = computed(() => "calc( 100vh - 60px )");
const showMenu = ref(false);
const permissionStore = usePermissionStore();

// 關閉開啟選單
const swiutchMenu = () => {
  showMenu.value = !showMenu.value;
};
</script>
