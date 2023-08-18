<template>
  <el-dialog
    :model-value="visable"
    title="編輯"
    width="80%"
    :before-close="handleClose"
  >
    <el-form :model="memberData">
      <el-form-item :label="'名稱：'">
        <el-input
          v-model="memberData.account"
          clearable
          :placeholder="'名稱'"
        />
      </el-form-item>
      <el-form-item label="身分：">
        <el-select v-model="memberData.memberType" placeholder="請選擇會員類型">
          <el-option
            v-for="[name, type] of MemberTypeMap"
            :key="type"
            :value="name"
            :label="type"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSave"> 儲存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue';
import { useMemberStore } from '../../../store/store';
import type { MemberType } from '@/type/member.interface';

const membersStore = useMemberStore();

const MemberTypeMap: Map<string, string> = membersStore.memberTypeMap;

const props = defineProps({
  visable: Boolean,
  data: {
    type: Object as () => MemberType,
    required: true,
  },
});

const memberData: MemberType = reactive({
  uid: 0,
  account: '',
  memberType: '',
  createTime: '',
});

watch(
  () => props.visable,
  () => {
    if (props.visable) {
      memberData.uid = props.data.uid;
      memberData.account = props.data.account;
      memberData.memberType = props.data.memberType;
      memberData.createTime = props.data.createTime;
    }
  }
);

const emits = defineEmits(['close', 'update']);

const handleClose = () => {
  emits('close');
};

const handleSave = () => {
  emits('update', memberData);
};
</script>

<style lang="scss" scoped></style>
