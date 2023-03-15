<template>
  <div class="mt-5">
    <el-pagination
      class="justify-end"
      layout="total, prev, pager, next"
      background
      @current-change="handlePageChange"
      :current-page="props.currentPage"
      :page-size="10"
      :total="props.total"
      :pager-count="3"
    />
  </div>
</template>

<script setup lang="ts">
interface Title {
  total: number;
  currentPage: number;
}

// props data
const props = defineProps<Title>();

// emit event
const emit = defineEmits<{
  (e: "pageChange", page: number): void;
}>();

const handlePageChange = (page: number) => {
  emit("pageChange", page);
};
</script>
