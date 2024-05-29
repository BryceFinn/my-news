import routeSettings from '@/config/route'
import isWhiteList from '@/config/white-list'
import { setRouteChange } from '@/hooks/useRouteListener'
import { useTitle } from '@/hooks/useTitle'
import router from '@/router'
import { usePermissionStoreHook } from '@/store/modules/permission'
import { useUserStoreHook } from '@/store/modules/user'
import { getToken } from '@/utils/cache/cookies'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const { setTitle } = useTitle()
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  const userStore = useUserStoreHook()
  const permissionStore = usePermissionStoreHook()
  const token = getToken()
  console.log(!token)

  // 如果没有登陆
  if (!token) {
    // 如果在免登录的白名单中，则直接进入
    if (isWhiteList(to)) return next()
    // 其他没有访问权限的页面将被重定向到登录页面
    return next('/login')
  }
  console.log(to)

  // 如果已经登录，并准备进入 Login 页面，则重定向到主页
  if (to.path === '/login') {
    console.log(token)
    return next({ path: '/dashboard' })
  }
  console.log(2222)

  // 如果用户已经获得其权限角色
  console.log(userStore.isActive && userStore.vipLevel >= 0)
  // debugger
  if (userStore.isActive && userStore.vipLevel >= 0) return next({ path: '/dashboard' })
  try {
    const vipLevel = userStore.vipLevel
    // 生成可访问的 Routes
    console.log(routeSettings.dynamic)
    routeSettings.dynamic ? permissionStore.setRoutes(vipLevel) : permissionStore.setAllRoutes()
    // 将 "有访问权限的动态路由" 添加到 Router 中
    console.log(permissionStore.addRoutes)

    permissionStore.addRoutes.forEach((route) => router.addRoute(route))
    // 确保添加路由已完成
    // 设置 replace: true, 因此导航将不会留下历史记录
    console.log('to', to)

    next({ ...to, replace: true })
  } catch (err: any) {
    // 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
    userStore.resetToken()
    ElMessage.error(err.message || '路由守卫过程发生错误')
    next('/login')
  }
})

router.afterEach((to) => {
  setRouteChange(to)
  setTitle(to.meta.title)
  NProgress.done()
})
