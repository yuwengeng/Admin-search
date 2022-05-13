<template>
  <el-row
    :gutter="40"
    class="panel-group"
  >
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('newVisitis')"
      >
        <div class="card-panel-icon-wrapper icon-people">
          <img
            :src="visits"
          >
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            New Visits
          </div>
          <CountTo
            ref="myCount"
            :start-val="0"
            :end-val="102400"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('messages')"
      >
        <div class="card-panel-icon-wrapper icon-message">
          <img
            :src="messages"
          >
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Messages
          </div>
          <CountTo
            :start-val="0"
            :end-val="81212"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('purchases')"
      >
        <div class="card-panel-icon-wrapper icon-money">
          <img
            :src="purchases"
          >
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Purchases
          </div>
          <CountTo
            :start-val="0"
            :end-val="9280"
            :duration="3200"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('shoppings')"
      >
        <div class="card-panel-icon-wrapper icon-shopping">
          <img
            :src="shoppings"
          >
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Shoppings
          </div>
          <CountTo
            :start-val="0"
            :end-val="13600"
            :duration="3600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
// import { CountTo } from 'vue3-count-to'
import messages from '@/assets/images/home/messages.png'
import purchases from '@/assets/images/home/purchases.png'
import shoppings from '@/assets/images/home/shoppings.png'
import visits from '@/assets/images/home/visits.png'
export default defineComponent({
  // components: {
  //   CountTo
  // },
  emits: ['handle-set-line-chart-data'],
  setup(_, { emit }) {
    const handleSetLineChartData = (type: string) => {
      emit('handle-set-line-chart-data', type)
    }
    const myCount = ref(null)
    onMounted(() => {
      console.log((myCount.value as any).value)
    })
    return {
      handleSetLineChartData,
      myCount,
      messages,
      purchases,
      visits,
      shoppings
    }
  }
})
</script>

<style lang="css" scoped>

</style>