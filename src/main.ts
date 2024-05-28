// core
import App from '@/App.vue'
import router from '@/router'
import '@/router/permission'
import store from '@/store'
import { createApp } from 'vue'
// load
import { loadDirectives } from '@/directives'
import { loadSvg } from '@/icons'
import { loadPlugins } from '@/plugins'
// css
import i18n from '@/i18n'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'normalize.css'
import 'uno.css'
import 'vxe-table-plugin-element/dist/style.css'
import 'vxe-table/lib/style.css'

const app = createApp(App)

/** 加载插件 */
loadPlugins(app)
/** 加载全局 SVG */
loadSvg(app)
/** 加载自定义指令 */
loadDirectives(app)

app.use(store).use(router)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(i18n)
router.isReady().then(() => {
  app.mount('#app')
})
