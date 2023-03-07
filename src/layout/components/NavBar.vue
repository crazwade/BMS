<template>
  <div class="flex justify-between bg-color-primary h-[60px] px-4">
    <div class="flex">
      <div
        class="flex items-center text-white mr-2 transition-all"
        :class="{ ' rotate-180 ': !isShow }"
      >
        <el-icon :size="35">
          <Expand @click="closeMenu" />
        </el-icon>
      </div>
      <div class="flex justify-center">
        <img src="../../assets/icon.png" class="cursor-pointer" />
      </div>
    </div>
    <div class="flex items-center">
      <span class="text-gray-300 hidden mr-1 sm:block"> TEST </span>
      <el-divider direction="vertical" />
      <el-dropdown ref="dropdown1">
        <el-button class="linkBtn text-gray-300 hover:text-white">
          <el-badge :value="3" :max="99">
            <el-icon size="20px">
              <Bell />
            </el-icon>
          </el-badge>
          <div class="ml-2">消息中心</div>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item><div>測試測試1</div></el-dropdown-item>
            <el-dropdown-item><div>測試測試2</div></el-dropdown-item>
            <el-dropdown-item><div>測試測試3</div></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-divider direction="vertical" />
      <el-dropdown>
        <el-button class="linkBtn text-gray-300 hover:text-white" link>
          <el-icon size="20px">
            <Icon icon="mingcute:user-2-line" />
          </el-icon>
          <div class="ml-2 text-gray-300">userName</div>
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <div>account</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div>修改暱稱</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div>變更密碼</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div>登出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { defineEmits } from "vue";

interface MenuItemProps {
  isShowMenu: boolean;
}

// 左上角Menu開關
const isShow = computed(() => props.isShowMenu);

// props data
const props = defineProps<MenuItemProps>();

// 定義 emits
const emits = defineEmits(["closeMenu"]);

// 關閉選單 emit
const closeMenu = () => {
  emits("closeMenu");
};
</script>
