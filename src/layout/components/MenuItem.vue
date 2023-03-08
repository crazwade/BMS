<template>
  <el-drawer
    v-model="showMenu"
    :show-close="false"
    :direction="'ltr'"
    size="30%"
    class="bg-primary"
    :before-close="closeMenu"
  >
    <div class="flex flex-col h-full">
      <h5 class="px-6 py-4 text-xl font-semibold border-b border-gray-300">
        El-Menu
      </h5>
      <el-menu default-active="5" class="flex-grow border-0" text-color="#000">
        <el-menu-item index="1" @click="closeMenu">
          <el-icon :color="'red'"><location /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="2" @click="closeMenu">
          <el-icon class="text-gray-600 mr-2"><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="3" @click="closeMenu">
          <el-icon class="text-gray-600 mr-2"><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { defineEmits } from "vue";

interface MenuItemProps {
  showMenu: boolean;
}

// props data
const props = defineProps<MenuItemProps>();

const showMenu = computed(() => props.showMenu);

// 定義 emits
const emits = defineEmits(["closeMenu"]);

// 關閉選單 emit
const closeMenu = () => {
  emits("closeMenu");
};
</script>
