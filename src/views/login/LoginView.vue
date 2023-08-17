<template>
  <div class="relative h-screen flex justify-center items-center">
    <img
      class="absolute inset-0 w-full h-full object-cover blur-md opacity-70"
      src="@/assets/logo.png"
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
            class="w-full bg-primary text-blue-400 hover:text-blue-600"
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
import { useUserStore, useMemberStore } from "../../store/store";
import { useRouter } from "vue-router";
import { login } from "./api/api";
import { ElMessage } from "element-plus";
import { showMessage } from "../../common/common";
import { memberData } from "../../fakeData";

const router = useRouter();
const userStore = useUserStore();
const membersStore = useMemberStore();

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
  loading.value = true;
  try {
    const res = await login(form);
    const { success, message } = res;

    if (!success) {
      showMessage(message ?? "", "warning");
      loading.value = false;
      return;
    }

    showMessage("登入成功", "success");
    loading.value = false;
    userStore.SET_TOKEN("token_OTC");
    userStore.INIT_USER({
      account: form.account,
    });
    router.push("/");
  } catch (error: any) {
    showMessage(error.message, "error");
    loading.value = false;
    // TODO 如果登入不成功這邊要調整，這邊使DEMO使用
    membersStore.setMemberData(memberData);
    userStore.SET_TOKEN("token_OTC");
    userStore.INIT_USER({
      account: form.account,
    });
    router.push("/");
    console.warn("使用假資料");
  }
};
</script>
