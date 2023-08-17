<template>
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
          height="440"
          style="width: 100%"
          :scrollbar-always-on="true"
        >
          <el-table-column prop="account" label="名稱" width="180" />
          <el-table-column prop="memberType" label="會員身分" width="180">
            <template #default="{ row }">
              {{ MemberTypeMap.get(row.memberType) }}
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="創建時間" />
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
import { ref, onMounted, reactive } from "vue";
import { useMemberStore } from "../../store/store";
import PaginationItem from "../../components/PaginationItem.vue";
import type { MemberType } from "@/type/member.interface";

const useStore = useMemberStore();

const MemberTypeMap: Map<string, string> = useStore.memberTypeMap;

const tableData: MemberType[] = [
  {
    account: "jacky",
    memberType: "normalMember",
    createTime: "2021-08-10",
  },
  {
    account: "John Smith",
    memberType: "normalMember",
    createTime: "2021-12-25",
  },
  {
    account: "Emily Johnson",
    memberType: "normalMember",
    createTime: "2022-04-03",
  },
  {
    account: "Michael Williams",
    memberType: "normalMember",
    createTime: "2021-11-18",
  },
  {
    account: "Jessica Brown",
    memberType: "normalMember",
    createTime: "2022-02-09",
  },
  {
    account: "Daniel Johnson",
    memberType: "normalMember",
    createTime: "2022-06-22",
  },
  {
    account: "Sophia Jones",
    memberType: "normalMember",
    createTime: "2022-05-14",
  },
  {
    account: "Olivia Williams",
    memberType: "normalMember",
    createTime: "2021-10-06",
  },
  {
    account: "James Davis",
    memberType: "normalMember",
    createTime: "2023-01-31",
  },
  {
    account: "Emma Smith",
    memberType: "normalMember",
    createTime: "2021-09-05",
  },
  {
    account: "William Johnson",
    memberType: "normalMember",
    createTime: "2023-05-18",
  },
  {
    account: "Liam Smith",
    memberType: "normalMember",
    createTime: "2023-02-28",
  },
  {
    account: "Olivia Johnson",
    memberType: "normalMember",
    createTime: "2023-06-09",
  },
  {
    account: "Noah Smith",
    memberType: "normalMember",
    createTime: "2023-04-16",
  },
  {
    account: "Ava Davis",
    memberType: "normalMember",
    createTime: "2021-11-08",
  },
  {
    account: "Isabella Johnson",
    memberType: "normalMember",
    createTime: "2022-09-20",
  },
  {
    account: "Ethan Davis",
    memberType: "normalMember",
    createTime: "2022-12-10",
  },
  {
    account: "Mia Brown",
    memberType: "normalMember",
    createTime: "2021-07-19",
  },
  {
    account: "Sophia Williams",
    memberType: "normalMember",
    createTime: "2022-08-03",
  },
  {
    account: "Emma Davis",
    memberType: "normalMember",
    createTime: "2021-10-15",
  },
  {
    account: "Oliver Johnson",
    memberType: "normalMember",
    createTime: "2021-12-02",
  },
  {
    account: "Aiden Smith",
    memberType: "normalMember",
    createTime: "2023-05-27",
  },
  {
    account: "Sophia Smith",
    memberType: "normalMember",
    createTime: "2022-07-17",
  },
  {
    account: "Lucas Johnson",
    memberType: "normalMember",
    createTime: "2021-09-12",
  },
  {
    account: "Emma Davis",
    memberType: "normalMember",
    createTime: "2022-11-30",
  },
  {
    account: "Ava Johnson",
    memberType: "normalMember",
    createTime: "2021-08-28",
  },
  {
    account: "Noah Smith",
    memberType: "normalMember",
    createTime: "2023-04-06",
  },
  {
    account: "Isabella Johnson",
    memberType: "normalMember",
    createTime: "2021-07-07",
  },
  {
    account: "Liam Smith",
    memberType: "normalMember",
    createTime: "2023-03-23",
  },
  {
    account: "Oliver Williams",
    memberType: "normalMember",
    createTime: "2022-01-11",
  },
  {
    account: "Ethan Davis",
    memberType: "normalMember",
    createTime: "2022-10-27",
  },
  {
    account: "Ava Johnson",
    memberType: "normalMember",
    createTime: "2023-07-14",
  },
  {
    account: "Sophia Smith",
    memberType: "normalMember",
    createTime: "2021-09-26",
  },
  {
    account: "Michael Scott",
    memberType: "seniorMember",
    createTime: "2021-08-10",
  },
  {
    account: "Angela Martin",
    memberType: "seniorMember",
    createTime: "2021-12-25",
  },
  {
    account: "Dwight Schrute",
    memberType: "seniorMember",
    createTime: "2022-04-03",
  },
  {
    account: "Pam Beesly",
    memberType: "seniorMember",
    createTime: "2021-11-18",
  },
  {
    account: "Jim Halpert",
    memberType: "seniorMember",
    createTime: "2022-02-09",
  },
  {
    account: "Ryan Howard",
    memberType: "seniorMember",
    createTime: "2022-06-22",
  },
  {
    account: "Kelly Kapoor",
    memberType: "seniorMember",
    createTime: "2022-05-14",
  },
  {
    account: "Stanley Hudson",
    memberType: "seniorMember",
    createTime: "2021-10-06",
  },
  {
    account: "Kevin Malone",
    memberType: "seniorMember",
    createTime: "2023-01-31",
  },
  {
    account: "Meredith Palmer",
    memberType: "seniorMember",
    createTime: "2021-09-05",
  },
  {
    account: "Creed Bratton",
    memberType: "seniorMember",
    createTime: "2023-05-18",
  },
  {
    account: "Oscar Martinez",
    memberType: "seniorMember",
    createTime: "2023-02-28",
  },
  {
    account: "Phyllis Smith",
    memberType: "seniorMember",
    createTime: "2023-06-09",
  },
  {
    account: "Andy Bernard",
    memberType: "seniorMember",
    createTime: "2023-04-16",
  },
  {
    account: "Toby Flenderson",
    memberType: "seniorMember",
    createTime: "2021-11-08",
  },
  {
    account: "Kelly Clarkson",
    memberType: "honoraryMember",
    createTime: "2021-08-10",
  },
  {
    account: "John Legend",
    memberType: "honoraryMember",
    createTime: "2021-12-25",
  },
  {
    account: "Adele Adkins",
    memberType: "honoraryMember",
    createTime: "2022-04-03",
  },
  {
    account: "Taylor Swift",
    memberType: "honoraryMember",
    createTime: "2021-11-18",
  },
  {
    account: "Beyoncé Knowles",
    memberType: "honoraryMember",
    createTime: "2022-02-09",
  },
  {
    account: "Ed Sheeran",
    memberType: "honoraryMember",
    createTime: "2022-06-22",
  },
  {
    account: "Rihanna Fenty",
    memberType: "honoraryMember",
    createTime: "2022-05-14",
  },
  {
    account: "Justin Bieber",
    memberType: "honoraryMember",
    createTime: "2021-10-06",
  },
];

const paginationData = reactive({
  total: 0,
  pageSize: 10,
  currentPage: 1,
});

const searchData = reactive({
  account: "",
  memberType: "",
});

const currentData = ref<MemberType[]>([]);

const handleSizeChange = (newSize: number) => {
  paginationData.pageSize = newSize;
  updateCurrentData();
};

const handleCurrentChange = (newPage: number) => {
  paginationData.currentPage = newPage;
  updateCurrentData();
};

const updateCurrentData = () => {
  const startIndex: number =
    (paginationData.currentPage - 1) * paginationData.pageSize;
  const endIndex: number = startIndex + paginationData.pageSize;

  let filteredData: MemberType[] = tableData;

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
