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

const newsData = [
  {
    name: 'News 1'
  },
  {
    name: 'News 2'
  },
  {
    name: 'News 3'
  }
]
const magazineData = [
  {
    name: 'Magazine 1'
  },
  {
    name: 'Magazine 2'
  },
  {
    name: 'Magazine 3'
  }
]
</script>

<template>
  <div class="app-container">
    <div class="table-container">
      <el-table :data="newsData">
        <el-table-column prop="name" label="今日报刊" />
      </el-table>
    </div>
    <div class="table-container">
      <el-table :data="magazineData">
        <el-table-column prop="name" label="今日杂志" />
      </el-table>
    </div>
    <div class="calendar-container">
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
html {
  font-size: 14px;
}
.app-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.table-container {
  width: 20%;
  margin: 0.1rem;
}
.calendar-container {
  width: 60%;
  margin: 0.1rem;
}
</style>
