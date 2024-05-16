<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme'
import { ElNotification } from 'element-plus'
// 将 Element Plus 的语言设置为中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()

/** 作者小心思 */
ElNotification({
  title: 'Hello, World!',
  type: 'success',
  dangerouslyUseHTMLString: true,
  message:
    "<a style='color: teal' target='_blank' href='https://github.com/un-pany/v3-admin-vite'>睁眼看世界读书会，睁眼看世界读书会是一个致力于推广阅读和文化交流的平台，通过组织各类读书活动，鼓励人们开阔视野，增长知识，促进思想交流和文化传承。</a>",
  duration: 0,
  position: 'bottom-right'
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
