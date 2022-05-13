<script>
// import { computed, ref } from 'vue';
import SearchManage from '../components/SearchManage.vue'
import SiteManage from '../components/SiteManage.vue'
export default {
  components: {
    SearchManage,
    SiteManage,
  },
  data() {
    return {
      currentTab: '首页',
      tabs: ['SearchManage', 'SiteManage', '首页']
    }
  }
}
</script>
<template>
  <main>
    <ul class="nav">
      <li v-for="tab in tabs" :key="tab" :class="['tab-li', { active: currentTab === tab }]" @click="currentTab = tab">
        <a :href="'#' + tab">
          <el-link type="primary">{{ tab }}</el-link>
        </a>
      </li>
    </ul>
    <component :is="currentTab"></component>

  </main>

</template>

<style scoped>
main {
  background: #E4EBF8;
  height: 100vh;
}

ul.nav {
  list-style: none;
  display: flex;
  justify-content: center;
  position: fixed;
  left: 21%;
  z-index: 99;
}
li {
  border: none !important;
  color: #333 !important;
  letter-spacing: 1px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  background: rgb(0 0 0 / 12%) !important;
  padding: 8px 20px;
  margin: 0 3px;
  border-radius: 0.3em;
  outline: 0 !important;
  box-shadow: 0.1rem 0.1rem 0.2rem #c8d0e7, -0.1rem -0.1rem 0.2rem #FFFFFF !important;
}
li.active {
    color: #ff8c00 !important;
    background: rgba(0, 0, 0, 0) !important;
    box-shadow: inset 0.15rem 0.15rem 0.2rem #c8d0e7, inset -0.15rem -0.15rem 0.2rem #fff !important;
}

.el-link {
  margin-right: 8px;
}

.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>
