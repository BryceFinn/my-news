import { loginApi } from '@/api/login'
import { type LoginRequestData } from '@/api/login/types/login'
import { registerApi } from '@/api/register'
import { RegisterRequestData } from '@/api/register/types/register'
import { resetRouter } from '@/router'
import store from '@/store'
import { removeCookie, removeToken, setCookie, setToken } from '@/utils/cache/cookies'
import { defineStore } from 'pinia'
import { useSettingsStore } from './settings'
import { useTagsViewStore } from './tags-view'

export const useUserStore = defineStore('user', () => {
  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()

  /** 登录 */
  const login = async ({ username, password, captcha }: LoginRequestData) => {
    const { data } = await loginApi({ username, password, captcha })
    setCookie('userInfo', data)
    setToken(data.token)
  }

  const register = async ({ alias, username, password, captcha }: RegisterRequestData) => {
    const { data } = await registerApi({ alias, username, password, captcha })
    setCookie('userInfo', data)
  }

  /** 登出 */
  const logout = () => {
    removeToken()
    removeCookie('userInfo')
    resetRouter()
    _resetTagsView()
  }
  /** 重置 Token */
  const resetToken = () => {
    removeToken()
  }
  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }

  return { register, login, logout, resetToken }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
