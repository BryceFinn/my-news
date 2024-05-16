// src/i18n/index.js
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh-CN.json'

const messages = {
  en,
  'zh-CN': zh
}

export default createI18n({
  locale: 'zh-CN', // 默认语言
  fallbackLocale: 'en', // 备用语言
  messages
})
