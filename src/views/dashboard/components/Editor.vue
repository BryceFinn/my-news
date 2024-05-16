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
  <div class="app-container center">
    <el-calendar ref="calendar">
      <template #header="{ date }">
        <span>{{ t('calendar.header.customContent') }}</span>
        <span>{{ date }}</span>
        <el-button-group>
          <el-button size="small" @click="selectDate('prev-year')"> {{ $t('calendar.header.prevYear') }} </el-button>
          <el-button size="small" @click="selectDate('prev-month')"> {{ $t('calendar.header.prevMonth') }} </el-button>
          <el-button size="small" @click="selectDate('today')">{{ $t('calendar.header.today') }}</el-button>
          <el-button size="small" @click="selectDate('next-month')"> {{ $t('calendar.header.nextMonth') }} </el-button>
          <el-button size="small" @click="selectDate('next-year')"> {{ $t('calendar.header.nextYear') }} </el-button>
        </el-button-group>
      </template>
    </el-calendar>
  </div>
</template>

<style lang="scss" scoped>
.center {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
