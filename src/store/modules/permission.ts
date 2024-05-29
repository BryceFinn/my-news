import routeSettings from '@/config/route'
import { constantRoutes, dynamicRoutes } from '@/router'
import { flatMultiLevelRoutes } from '@/router/helper'
import store from '@/store'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type RouteRecordRaw } from 'vue-router'

const hasPermission = (vipLevel: number, route: RouteRecordRaw) => {
  // 尝试从路由的meta属性中获取vipLevel
  const requiredVipLevel = route.meta?.vipLevel
  console.log(requiredVipLevel, vipLevel, 'vipLevel')
  // if requiredVipLevel === undefined {
  //   requiredVipLevel = 0
  // }
  console.log(!requiredVipLevel || requiredVipLevel === 0)

  if (!requiredVipLevel || requiredVipLevel === 0) {
    return true
  }
  if (vipLevel >= requiredVipLevel) {
    return true
  } else {
    return false
  }
  // 如果路由vip参数不存在，或者为0，则允许访问
  // page A  0  all
  // page B  1  v1
  // page C  2  v2
  // page DEF 0  all

  // 如果requiredVipLevel未定义，或者当前vipLevel大于所需vipLevel，则允许访问
  // return vipLevel >= requiredVipLevel
}

const filterDynamicRoutes = (routes: RouteRecordRaw[], vipLevel: number) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tempRoute = { ...route }
    if (hasPermission(vipLevel, tempRoute)) {
      console.log('tempRoute', tempRoute)

      if (tempRoute.children) {
        tempRoute.children = filterDynamicRoutes(tempRoute.children, vipLevel)
      }
      res.push(tempRoute)
    }
  })
  return res
}

export const usePermissionStore = defineStore('permission', () => {
  /** 可访问的路由 */
  const routes = ref<RouteRecordRaw[]>([])
  /** 有访问权限的动态路由 */
  const addRoutes = ref<RouteRecordRaw[]>([])

  /** 根据角色生成可访问的 Routes（可访问的路由 = 常驻路由 + 有访问权限的动态路由） */
  const setRoutes = (vipLevel: number) => {
    const accessedRoutes = filterDynamicRoutes(dynamicRoutes, vipLevel)
    _set(accessedRoutes)
  }

  /** 所有路由 = 所有常驻路由 + 所有动态路由 */
  const setAllRoutes = () => {
    _set(dynamicRoutes)
  }

  const _set = (accessedRoutes: RouteRecordRaw[]) => {
    routes.value = constantRoutes.concat(accessedRoutes)
    addRoutes.value = routeSettings.thirdLevelRouteCache ? flatMultiLevelRoutes(accessedRoutes) : accessedRoutes
  }

  return { routes, addRoutes, setRoutes, setAllRoutes }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
