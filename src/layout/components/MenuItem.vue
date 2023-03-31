<template>
  <el-drawer
    v-model="showMenu"
    :show-close="false"
    :direction="'ltr'"
    size="170px"
    :before-close="closeMenuSpace"
    :with-header="false"
    class="MenuItem"
    :style="{ height: height, marginTop: '60px' }"
  >
    <el-menu :default-active="tagView" class="flex-grow border-0">
      <el-menu-item
        v-for="item in itemList"
        :key="item.id"
        :index="item.id"
        @click="changePage(item.id.toString(), item.name)"
        :class="tagView === item.id ? 'bg-gray-200' : ''"
      >
        <el-icon class="text-gray-600 mr-2"
          ><component :is="item.icon"
        /></el-icon>
        <span
          class="text-black text-base font-bold"
          :style="{
            color:
              tagView === item.id ? 'var(--el-menu-active-color)' : 'black',
          }"
          >{{ item.title }}</span
        >
      </el-menu-item>
    </el-menu>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { defineEmits } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const tagView = ref("0");

interface MenuItemProps {
  height: string;
  showMenu: boolean;
  itemList: {
    id: string;
    title: string;
    icon: string;
    name: string;
  }[];
}

// props data
const props = defineProps<MenuItemProps>();

const showMenu = computed(() => props.showMenu);
const height = computed(() => props.height);
const itemList = computed(() => props.itemList);

// 定義 emits
const emits = defineEmits(["closeMenu"]);

// 關閉選單 emit
const closeMenuSpace = () => {
  emits("closeMenu");
};

// 關閉選單 emit
const changePage = (target: string, path: string) => {
  router.push({ path });
  tagView.value = target;
  emits("closeMenu");
};
</script>

<style>
.MenuItem .el-drawer__body {
  padding: 0;
}
</style>
