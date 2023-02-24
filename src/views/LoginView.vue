<template>
  <el-form label-position="left" label-width="150px" style="max-width: 460px">
    <el-space fill>
      <el-alert type="info" show-icon :closable="false">
        <p>輸入您的帳號:</p>
      </el-alert>
      <el-form-item label="帳號">
        <el-input v-model="formAccessibility.account" />
      </el-form-item>
    </el-space>
    <el-space fill>
      <el-alert type="info" show-icon :closable="false">
        <p>輸入您的密碼:</p>
      </el-alert>
      <el-form-item label="密碼">
        <el-input v-model="formAccessibility.password" />
      </el-form-item>
    </el-space>
    <el-form-item>
      <el-button type="primary">
        登入<el-icon class="el-icon--right" @click="submit"
          ><ArrowRight
        /></el-icon>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const formAccessibility = reactive({
  account: "",
  password: "",
});

const submit = () => {
  console.log(formAccessibility);
};
</script>
