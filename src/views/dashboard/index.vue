<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'
import Admin from './components/Admin.vue'
import NormalUser from './components/NormalUser.vue'

const userStore = useUserStore()
const isSuperuser = userStore.isSuperuser
</script>

<template>
  <component :is="isSuperuser ? Admin : NormalUser" />
</template>
