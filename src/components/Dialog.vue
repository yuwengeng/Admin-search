<template>
  <!-- Form -->
  <el-dialog v-model="visible" title="编辑">
    <el-form :model="form">
      <el-form-item label="name" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="URL" :label-width="formLabelWidth">
        <el-input v-model="form.href" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Tag" :label-width="formLabelWidth">
        <el-input v-model="form.kind_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="slogan" :label-width="formLabelWidth">
        <el-input v-model="form.slogan" autocomplete="off" />
      </el-form-item>
      <el-form-item label="star" :label-width="formLabelWidth">
        <el-input v-model="form.star" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="confirm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { IPropData } from './SiteManage.vue'

const props = defineProps<{
  visible: boolean | string,
  form: IPropData
}>()
let emits = defineEmits(['updateDialog', 'updateData'])

const close = () => emits('updateDialog', false);

const confirm = () => {
  // console.log(props.form,props.visible)
  emits('updateData', { ...props.form }, props.visible)
  emits('updateDialog', false)
};

const formLabelWidth = '140px'

</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
