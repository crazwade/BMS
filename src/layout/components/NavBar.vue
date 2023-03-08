<template>
  <div class="flex justify-between bg-gray-600 h-[60px] px-4">
    <div class="flex">
      <div
        class="flex items-center text-white mr-2 transition-all"
        :class="{ ' rotate-180 ': !isShow }"
      >
        <el-icon :size="35">
          <Expand @click="closeMenu" />
        </el-icon>
      </div>
      <div class="flex justify-center p-2">
        <img src="../../assets/icon.png" class="cursor-pointer" />
      </div>
    </div>
    <div class="flex items-center">
      <el-button
        class="text-gray-300 hover:text-white hover:bg-transparent border-none"
        @focus="blurOnFocus"
      >
        <el-badge :value="3" :max="99">
          <el-icon size="20px">
            <Bell />
          </el-icon>
        </el-badge>
        <div class="ml-2">消息中心</div>
      </el-button>
      <el-divider direction="vertical" />
      <el-dropdown>
        <el-button class="linkBtn" link @focus="blurOnFocus">
          <el-icon size="20px">
            <UserFilled />
          </el-icon>
          <div class="ml-2">userName</div>
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

const blurOnFocus = (e: any) => {
  e.target.blur();
};

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
<style scoped>
.linkBtn {
  color: #dfdfdf !important;
}

.linkBtn:hover {
  color: #fff !important;
}
</style>
