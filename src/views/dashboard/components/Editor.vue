<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { CalendarDateType, CalendarInstance } from 'element-plus'
import { useI18n } from 'vue-i18n'
onMounted(() => {
  console.log('Calendar component mounted.')
})
const { t } = useI18n()
const calendar = ref<CalendarInstance>()
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}
</script>

<template>
  <div class="app-container">
    <div class="sub-container">
      <el-table :data="newsData" style="width: 100%" max-height="250" :row-class-name="tableRowClassName">
        <el-table-column prop="id" label="Id" />
        <el-table-column prop="name" label="Name" />
      </el-table>
    </div>
    <div class="sub-container">
      <el-table :data="magazineData" style="width: 100%" max-height="250" :row-class-name="tableRowClassName">
        <el-table-column prop="id" label="Id" />
        <el-table-column prop="name" label="Name" />
      </el-table>
    </div>
    <div class="sub-container">
      <el-calendar ref="calendar">
        <template #header="{ date }">
          <span>{{ t('calendar.header.customContent') }}</span>
          <span>{{ date }}</span>
          <el-button-group>
            <el-button size="small" @click="selectDate('prev-year')"> {{ $t('calendar.header.prevYear') }} </el-button>
            <el-button size="small" @click="selectDate('prev-month')">
              {{ $t('calendar.header.prevMonth') }}
            </el-button>
            <el-button size="small" @click="selectDate('today')">{{ $t('calendar.header.today') }}</el-button>
            <el-button size="small" @click="selectDate('next-month')">
              {{ $t('calendar.header.nextMonth') }}
            </el-button>
            <el-button size="small" @click="selectDate('next-year')"> {{ $t('calendar.header.nextYear') }} </el-button>
          </el-button-group>
        </template>
      </el-calendar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.sub-container {
  margin: 0 1%;
}
</style>
