<template>
  <div class="w-screen h-screen flex justify-center items-center bg-gray-200">
    <div class="w-4/5 h-4/5 bg-white flex flex-col justify-around items-center">
      <button
        class="w-1/2 h-1/6 bg-pink-100 hover:bg-pink-200 active:bg-pink-300 relative"
        @mouseenter="addCircle"
        @mouseleave="removeCircle"
        ref="button1"
      >
        <span v-if="showBasketball" class="basketball"></span>
        按鈕 1
      </button>
      <button
        class="w-1/2 h-1/6 bg-blue-100 hover:bg-blue-200 active:bg-blue-300"
      >
        按鈕 2
      </button>
      <button
        class="w-1/2 h-1/6 bg-green-100 hover:bg-green-200 active:bg-green-300"
      >
        按鈕 3
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const showBasketball = ref(false);
const addCircle = () => {
  showBasketball.value = true;
};
const removeCircle = () => {
  showBasketball.value = false;
};
</script>

<style scoped>
.basketball {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
  top: 0;
  left: 0;
  animation: bounce 3s ease-in-out infinite;
}

@keyframes bounce {
  0% {
    top: 0;
    left: 0;
  }
  25% {
    top: 0;
    left: calc(100% - 10px);
  }
  50% {
    top: calc(100% - 10px);
    left: calc(100% - 10px);
  }
  75% {
    top: calc(100% - 10px);
    left: 0;
  }
  100% {
    top: 0;
    left: 0;
  }
}
</style>
