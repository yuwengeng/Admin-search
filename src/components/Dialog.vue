<template>
  <!-- Form -->
  <el-dialog v-model="visible" title="编辑">
    <el-form :model="form">
      <el-form-item label="name" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="URL" :label-width="formLabelWidth">
        <el-input v-model="form.url" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Tag" :label-width="formLabelWidth">
        <el-input v-model="form.type" autocomplete="off" />
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
// import { reactive, toRef } from 'vue'
const props =defineProps<{
  visible: boolean | string,
  form: {
  title?: string,
  url?: string,
  type: string
}
}>()
// const forms = toRef(props,'form')

let emits = defineEmits(['updateDialog','updateData'])

const close = () => emits('updateDialog', false);

const confirm = () => {
  console.log(props.form,props.visible)

  emits('updateData',{...props.form},props.visible)
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
