/** 统一处理 Cookie */

import CacheKey from '@/constants/cache-key'
import Cookies from 'js-cookie'

export const getToken = () => {
  return Cookies.get(CacheKey.AUTHORIZATION)
}
export const setToken = (token: string) => {
  Cookies.set(CacheKey.AUTHORIZATION, token)
}
export const removeToken = () => {
  Cookies.remove(CacheKey.AUTHORIZATION)
}

export const getCookie = (key: string) => {
  return Cookies.get(key)
}

/**
 * Sets a cookie with the given key and value.
 *
 * @param {string} key The key of the cookie.
 * @param {string} value The value of the cookie.
 */
export const setCookie = (key: string, value: string): void => {
  Cookies.set(key, value)
}

/**
 * Removes a cookie with the given key.
 *
 * @param {string} key The key of the cookie to be removed.
 */
export const removeCookie = (key: string) => {
  /**
   * Removes a cookie with the given key.
   *
   * @see https://github.com/js-cookie/js-cookie#cookie-removal
   */
  Cookies.remove(key)
}
