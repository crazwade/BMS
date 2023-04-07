<template>
  <div class="relative h-screen flex justify-center items-center">
    <img
      class="absolute inset-0 w-full h-full object-cover blur-md opacity-70"
      src="@/assets/icon.png"
    />
    <div class="relative z-10 w-96 bg-white rounded shadow-lg p-8">
      <h2 class="text-xl font-bold mb-6">Welcome back!</h2>
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <el-form-item>
          <el-input v-model="form.account" placeholder="Account" />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Password"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            native-type="submit"
            :loading="loading"
            :disabled="loading"
            class="w-full bg-primary text-white hover:bg-primary-contrast"
          >
            Log In
          </el-button>
        </el-form-item>
      </form>
      <p class="text-gray-500 text-xs mt-4">
        &copy;{{ new Date().getFullYear() }} Company. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElInput, ElFormItem, ElButton } from "element-plus";
import { useUserStore } from "../../store/store";
import { useRouter } from "vue-router";
import { login } from "./api/api";
import { showMessage } from "../../common/common";

const router = useRouter();
const userSoter = useUserStore();

interface Form {
  account: string;
  password: string;
}

const form: Form = reactive({
  account: "jacky",
  password: "jacky777",
});
const loading = ref(false);

const handleSubmit = async () => {
  const res = await login(form);
  const { success, message } = res;
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    showMessage(message ?? "登入成功", success ? "success" : "error");
    if (success) {
      userSoter.SET_TOKEN("token_OTC");
      router.push("/");
    }
  }, 2000);
};
</script>
