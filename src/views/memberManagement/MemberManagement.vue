<template>
  <EditDialog
    :visable="dialogVisible"
    :data="dialogData"
    @close="dialogClose"
    @update="dialogSave"
  />
  <div class="flex-col">
    <div class="text-2xl font-extrabold text-gray-600 flex items-center">
      <el-icon class="mr-2"><UserFilled /></el-icon>
      成員管理區
    </div>
    <div class="my-1 h-full flex flex-col">
      <div class="flex flex-row items-center my-3">
        <el-form-item label="學生姓名：">
          <el-input
            v-model="searchData.account"
            clearable
            :placeholder="'名稱'"
          />
        </el-form-item>
        <el-form-item label="身分：" class="ml-3">
          <el-select
            v-model="searchData.memberType"
            placeholder="請選擇會員類型"
          >
            <el-option :key="''" :value="''" :label="'全選'" />
            <el-option
              v-for="[name, type] of MemberTypeMap"
              :key="type"
              :value="name"
              :label="type"
            />
          </el-select>
        </el-form-item>
        <el-button
          class="mb-[18px] ml-3"
          @click="updateCurrentData()"
          type="success"
        >
          搜尋
        </el-button>
      </div>
      <div>
        <el-table
          :data="currentData"
          border
          height="530"
          style="width: 100%"
          :scrollbar-always-on="true"
        >
          <el-table-column prop="account" label="名稱" />
          <el-table-column prop="memberType" label="會員身分">
            <template #default="{ row }">
              {{ MemberTypeMap.get(row.memberType) }}
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="創建時間" />
          <el-table-column label="管理">
            <template #default="{ row }">
              <el-button type="info" @click="openEditDialog(row.uid)">
                編輯
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <PaginationItem
          :total="paginationData.total"
          :pageSize="paginationData.pageSize"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useMemberStore } from '../../store/store';
import PaginationItem from '../../components/PaginationItem.vue';
import type { MemberType } from '@/type/member.interface';
import EditDialog from './compontents/EditDialog.vue';
import { showMessage } from '@/common/common';

const membersStore = useMemberStore();

const MemberTypeMap: Map<string, string> = membersStore.memberTypeMap;

const dialogVisible = ref(false);
const dialogData: MemberType = reactive({
  uid: 0,
  account: '',
  memberType: '',
  createTime: '',
});

const paginationData = reactive({
  total: 0,
  pageSize: 10,
  currentPage: 1,
});

const searchData = reactive({
  account: '',
  memberType: '',
});

const currentData = ref<MemberType[]>([]);

const openEditDialog = (uid: number) => {
  const getData: MemberType | undefined = membersStore.getMemberData(uid);
  if (getData === undefined) {
    showMessage('有哪裡壞了', 'warning');
    return;
  }
  dialogData.uid = getData.uid;
  dialogData.account = getData.account;
  dialogData.memberType = getData.memberType;
  dialogData.createTime = getData.createTime;
  dialogVisible.value = true;
};

const dialogClose = () => {
  dialogVisible.value = false;
};

const dialogSave = (saveData: MemberType) => {
  membersStore.updateMember(saveData.uid, saveData);
  showMessage('更新成功', 'success');
  dialogVisible.value = false;
};

const handleSizeChange = (newSize: number) => {
  paginationData.pageSize = newSize;
  updateCurrentData();
};

const handleCurrentChange = (newPage: number) => {
  paginationData.currentPage = newPage;
  updateCurrentData();
};

// 調整顯示的資料
const updateCurrentData = () => {
  const startIndex: number =
    (paginationData.currentPage - 1) * paginationData.pageSize;
  const endIndex: number = startIndex + paginationData.pageSize;

  let filteredData: MemberType[] = membersStore.getAllMemberData();

  if (searchData.account) {
    filteredData = filteredData.filter((item) =>
      item.account.includes(searchData.account)
    );
  }

  if (searchData.memberType) {
    filteredData = filteredData.filter(
      (item) => item.memberType === searchData.memberType
    );
  }

  paginationData.total = filteredData.length;

  currentData.value = filteredData.slice(startIndex, endIndex);
};

onMounted(() => {
  updateCurrentData();
});
</script>

<style lang="scss" scoped></style>
