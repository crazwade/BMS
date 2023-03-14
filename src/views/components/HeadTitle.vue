<template>
  <h1>{{ props.title }}</h1>
</template>

<script setup lang="ts">
interface Title {
  title: string;
}

// props data
const props = defineProps<Title>();
</script>
