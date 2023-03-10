<template>
  <!-- Header -->
  <el-container>
    <el-header class="p-0">
      <NavBar
        @closeMenu="swiutchMenu"
        :isShowMenu="showMenu"
        :account="userStore.nickname"
      />
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
        class="absolute inset-0 p-0 w-full h-full"
        :style="{ height: height, zIndex: showMenu ? 0 : 1 }"
      >
        <el-main class="p-0 w-full h-full">
          <div class="h-full">
            <div class="h-full p-4 flex flex-col">
              <router-view />
            </div>
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
import { usePermissionStore, useUserStore } from "../store/store";

const height = computed(() => "calc( 100vh - 60px )");
const showMenu = ref(false);
const permissionStore = usePermissionStore();
const userStore = useUserStore();

// 關閉開啟選單
const swiutchMenu = () => {
  showMenu.value = !showMenu.value;
};
</script>
