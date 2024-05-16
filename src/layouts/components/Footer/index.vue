<script lang="ts" setup>
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE ?? '睁眼看世界'
import { ref } from 'vue'
const currentYearRef = ref(0)
currentYearRef.value = new Date().getFullYear()
</script>

<template>
  <footer class="layout-footer">Copyright © {{ currentYearRef }} {{ VITE_APP_TITLE }}</footer>
</template>

<style lang="scss" scoped>
.layout-footer {
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--el-text-color-placeholder);
}
</style>
