<template>
  <el-container class="layout-container-demo" style="height: 95%">
    <el-aside width="20%">
      <el-scrollbar>
        <el-menu v-for="(tab, i) in tabs" :default-active="activeTag" class="el-menu-vertical-demo"
          :collapse="isCollapse">
          <el-menu-item :index="tab[0]" v-on:click="handleOpen">
            <el-icon>
              <icon-menu />
            </el-icon>
            <template #title>{{ tab[0] }}</template>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-button @click="() => saveSitesData(reactiveData)">保存</el-button>
        </div>
      </el-header>
      <Dialog :visible=visible @updateDialog='updateDialog' @updateData="updateData" :form="selectedData"></Dialog>
      <el-main>
        <el-scrollbar>
          <el-table fit :data="tableData" height="80vh" v-on:row-dblclick="changeItem" ref="multipleTableRef"
            @cell-click='deleteItem'>
            <el-table-column type="index" width="50" />
            <el-table-column prop="title" label="名称" width="140" />
            <el-table-column prop="href" label="链接" />
            <el-table-column prop="slogan" label="描述" />
            <el-table-column prop="star" label="收藏" width="60" />
            <el-table-column fixed="right" label="操作" width="120">
              <el-popconfirm title="Are you sure to delete this?" @confirm="confirmEvent">
                <template #reference>
                  <el-button type="text" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </el-table-column>
          </el-table>
          <el-button type="primary" @click="addItem" style="display: inline-block; margin-top: 6px;">增加</el-button>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
            

<script lang="ts" setup>
import { computed, ref, onBeforeMount } from 'vue'
import { Menu as IconMenu, } from '@element-plus/icons-vue'
import Dialog from './Dialog.vue'
import type { ElTable } from 'element-plus'
import { useSessionStorage } from '@vueuse/core'


import { saveSitesData, initSitesData } from '../api/server.js'
// import data from '../assets/sites.json'


export interface IPropData {
  title?: string,
  href?: string,
  kind_name: string,
  slogan?: string,
  star?: "star" | null,
}
const isCollapse = ref(false)
const activeTag = ref('娱乐')
// const reactiveData = ref<IPropData[]>([]);   
const reactiveData = useSessionStorage<IPropData[]>('sitesData', [])
onBeforeMount(async () => {
  if (reactiveData.value.length) return
  const d = await initSitesData();
  return reactiveData.value = d.data as IPropData[];
})
// console.log(reactiveData.value);

let selectedData = ref<IPropData>({
  title: '',
  href: '',
  kind_name: '',
  slogan: '',
  star: null
});

let visible = ref<string | boolean>(false)
let cacheItem = null;

const multipleTableRef = ref<InstanceType<typeof ElTable>>()

// hide Dialog
const updateDialog = (val: string | boolean) => {
  visible.value = val
}
const updateData = (val, type: string) => {
  switch (type) {
    case 'addItem':
      // console.log('val', val);
      reactiveData.value.splice(0, 0, val)
      break;
    case 'changeItem':
      if (Object.keys(cacheItem).length) {
        const older = [...reactiveData.value];
        let _ = older.map((i) => {
          if (i.href == cacheItem.href) {
            i = val;
          }
          return i
        })
        reactiveData.value = _;
      }
      break;
    default:
      break;
  }
}

const handleOpen = (key: { index: string; }) => {
  activeTag.value = key.index;
}
const addItem = () => {
  // const old = tableData.value;
  selectedData.value = { kind_name: activeTag.value }
  updateDialog('addItem')

}
const deleteItem = (e, y, z) => {
  if (z.innerText === '删除') {
    cacheItem = { ...e }
  }
}
const confirmEvent = (e, y, z) => {
  const index = reactiveData.value.findIndex((i) => {
    return i.title === cacheItem.title
  })
  reactiveData.value.splice(index, 1)
}
const changeItem = (e: any) => {
  // e.stopPropagation;
  updateDialog('changeItem')
  selectedData.value = { ...e }
  cacheItem = { ...e }
}

let tableData = computed(() => {
  return reactiveData.value.filter((item) => {
    return item.kind_name == activeTag.value;
  })
})
// watch(activeTag, () => {
//   tableData.value = reactiveData.value.filter((item) => {
//     return item.type == activeTag.value;
//   })
// }) 

const tabs = computed(() => {
  const map = new Map;
  reactiveData.value.forEach((item, index) => {
    if (!map.has(item.kind_name)) {
      map.set(item.kind_name, index)
    }
  })
  return Array.from(map)
});
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  height: 100vh;
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0 2vw;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
