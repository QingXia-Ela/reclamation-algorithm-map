/**
 * @author: QingXia-Ela
 * 
 * 注意：多语言翻译大多情况都使用指令 (v-t="key")，只有你需要复杂变化以及更新渲染时才使用 $t 函数
 */

import { createI18n } from 'vue-i18n'
import en_US from './en-US.json'
import zh_CN from './zh-CN.json'
const locale = localStorage.getItem('i18n_locale') || 'zh-CN'

if (locale) {
  localStorage.setItem('i18n_locale', locale)
}

// todo!: move lang to json file
const i18n = createI18n({
  locale,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zh_CN,
    'en-US': en_US
  }
})

// todo!: add lazy load language

export default i18n
