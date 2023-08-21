<template>
  <div class="flex-col">
    <div class="text-2xl font-extrabold text-gray-600 flex items-center">
      <el-icon class="mr-2"><ChatLineSquare /></el-icon>
      意見回饋
    </div>
    <div class="my-1">
      <div class="mb-4">
        <label for="name" class="block text-gray-600 font-medium mb-1"
          >姓名</label
        >
        <input
          id="name"
          v-model="formData.name"
          type="text"
          class="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="請輸入姓名"
        />
        <p v-if="errors.name" class="text-red-500 mt-1">{{ errors.name }}</p>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-600 font-medium mb-1"
          >Email</label
        >
        <input
          id="email"
          v-model="formData.email"
          type="email"
          class="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="請輸入Email"
        />
        <p v-if="errors.email" class="text-red-500 mt-1">{{ errors.email }}</p>
      </div>
      <div class="mb-4">
        <label for="phone" class="block text-gray-600 font-medium mb-1"
          >連絡電話</label
        >
        <input
          id="phone"
          v-model="formData.phone"
          type="tel"
          class="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="請輸入連絡電話"
        />
      </div>
      <div class="mb-4">
        <label for="feedback" class="block text-gray-600 font-medium mb-1"
          >意見</label
        >
        <textarea
          id="feedback"
          v-model="formData.feedback"
          class="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="請輸入您的意見"
        ></textarea>
        <p v-if="errors.feedback" class="text-red-500 mt-1">
          {{ errors.feedback }}
        </p>
      </div>
      <div class="text-center">
        <button
          type="button"
          @click="submitForm()"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          意見送出
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
  name: '',
  email: '',
  phone: '',
  feedback: '',
});

const errors = ref({
  name: '',
  email: '',
  feedback: '',
});

function submitForm() {
  errors.value.name = formData.value.name ? '' : '請輸入姓名';
  errors.value.email = formData.value.email ? '' : '請輸入Email';
  errors.value.feedback = formData.value.feedback ? '' : '請輸入您的意見';

  // 验证是否有任何错误
  // const hasErrors = Object.values(errors).some((item, index) => {
  //   console.log(index);
  //   console.log(item);
  // });

  console.log(Object.keys(errors));

  // if (!hasErrors) {
  //   // 在这里执行提交操作，可以访问 formData 中的数据
  //   console.log('提交表單：', formData);
  // }
}
</script>

<style lang="scss" scoped></style>
