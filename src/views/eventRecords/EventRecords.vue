<template>
  <div class="flex-col">
    <div class="text-2xl font-extrabold text-gray-600 flex items-center">
      <el-icon class="mr-2"><ChatLineSquare /></el-icon>
      活動紀錄
    </div>
    <div class="my-1">
      <div class="my-3">
        <el-carousel
          :interval="4000"
          type="card"
          height="200px"
          :autoplay="false"
          :arrow="'never'"
          :indicator-position="'none'"
        >
          <el-skeleton-item
            v-if="currentImgData.length === 0"
            variant="image"
            class="h-full w-full"
          />
          <el-carousel-item v-else v-for="item in currentImgData" :key="item">
            <el-image :src="item" :fit="'contain'" class="w-full h-full" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div>
        <el-table
          :data="currentData"
          border
          height="530"
          style="width: 100%"
          :scrollbar-always-on="true"
          v-loading="isLoading"
        >
          <el-table-column prop="date" label="時間" :sortable="true" />
          <el-table-column prop="memberType" label="參與情況 (參加/報名)">
            <template #default="{ row }">
              {{ `${row.join} / ${row.totalJoin}` }}
            </template>
          </el-table-column>
          <el-table-column label="檢視圖片">
            <template #default="scope">
              <el-button
                v-if="!scope.row.isSelect"
                type="info"
                @click="showImg(scope.row, scope.$index)"
              >
                檢視
              </el-button>
              <el-button v-else type="warning"> 正在檢視 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useEventStore } from '../../store/store';
import { EventData } from '../../fakeData';
import { getEventData } from './api/api';
import { showMessage } from '../../common/common';
import type { EventDataTypeWithSelect } from '../../store/store';

const isLoading = ref(false);

const currentImgData = ref<string[]>([]);

const eventStore = useEventStore();

// 調整顯示的資料
const currentData = computed<EventDataTypeWithSelect[]>(() => {
  return eventStore.getEventData();
});

const fetchData = async () => {
  isLoading.value = true;
  try {
    const res = await getEventData();
    const { success, message } = res;

    if (!success) {
      showMessage(message ?? '', 'warning');
      isLoading.value = false;
      return;
    }

    showMessage('登入成功', 'success');
    isLoading.value = false;
    eventStore.setEventData(res.data);
  } catch (error: any) {
    showMessage(error.message, 'error');
    isLoading.value = false;

    eventStore.setEventData(EventData);
    console.warn('使用假資料');
  }
};

const showImg = (data: any, index: number) => {
  currentImgData.value = [...data.imgData];
  eventStore.selectEvent(index);
};

onMounted(async () => {
  await fetchData();
});
</script>

<style scoped></style>
