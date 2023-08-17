<template>
  <el-pagination
    layout="sizes, prev, pager, next"
    :page-sizes="[10, 20, 30]"
    :pager-count="5"
    :page-size="pageSize"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    class="justify-end my-3"
  />
</template>

<script setup lang="ts">
defineProps<{
  total: number;
  pageSize: number;
}>();

const emit = defineEmits(["sizeChange", "currentChange"]);

const handleSizeChange = (newSize: number) => {
  emit("sizeChange", newSize);
};

const handleCurrentChange = (newPage: number) => {
  emit("currentChange", newPage);
};
</script>

<style lang="scss" scoped></style>
