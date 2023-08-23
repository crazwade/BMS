<template>
  <div class="flex-col">
    <div class="text-2xl font-extrabold text-gray-600 flex items-center">
      <el-icon class="mr-2"><ChatLineSquare /></el-icon>
      意見回饋
    </div>
    <div class="my-4">
      <el-form
        ref="feedbackForm"
        :model="formData"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name" class="my-7">
          <el-input v-model="formData.name" placeholder="請輸入您的名稱" />
        </el-form-item>
        <el-form-item label="Email" prop="email" class="my-7">
          <el-input
            v-model="formData.email"
            placeholder="請輸入您的信箱方便聯繫"
          />
        </el-form-item>
        <el-form-item label="連絡電話" prop="phone" class="my-7">
          <el-input v-model="formData.phone" placeholder="請輸入您的連絡電話" />
        </el-form-item>
        <el-form-item label="意見" prop="feedback" class="my-7">
          <el-input
            type="textarea"
            v-model="formData.feedback"
            placeholder="請輸入您的建議或意見"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(feedbackForm)">
            提交意見
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { showMessage } from '@/common/common';

interface RuleForm {
  name: string;
  email: string;
  phone: string;
  feedback: string;
}

const feedbackForm = ref<FormInstance>();

const formData = reactive<RuleForm>({
  name: '',
  email: '',
  phone: '',
  feedback: '',
});

const rules = reactive<FormRules>({
  name: [{ required: true, message: '請輸入姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '請輸入Email', trigger: 'blur' },
    { type: 'email', message: '請輸入有效的Email', trigger: 'blur' },
  ],
  phone: [{ required: false, message: '請輸入姓名', trigger: 'blur' }],
  feedback: [{ required: true, message: '請輸入意見', trigger: 'blur' }],
});

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate((valid) => {
    if (valid) {
      showMessage('已收到您的建議', 'success');
      console.log('submit!', formData);
      // reset
      resetForm(formEl);
    }
  });
};
</script>

<style lang="scss" scoped></style>
