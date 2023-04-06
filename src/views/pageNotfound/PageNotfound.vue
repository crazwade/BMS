<template>
  <div>
    <h1>Page Not Found</h1>
    <h2>Sorry, the page you are looking for does not exist.</h2>
    <el-button type="info" @click="goToHomePage">Go to Home Page</el-button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToHomePage = () => {
  router.push({ path: "/" });
};
</script>
