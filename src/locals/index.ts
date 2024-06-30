/**
 * @author: QingXia-Ela
 * 
 * 注意：多语言翻译大多情况都使用指令 (v-t="key")，只有你需要复杂变化以及更新渲染时才使用 $t 函数
 */

import { createI18n } from 'vue-i18n'

const locale = localStorage.getItem('i18n_locale') || 'zh-CN'

if (locale) {
  localStorage.setItem('i18n_locale', locale)
}

// todo!: move lang to json file
const i18n = createI18n({
  locale,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': {
      userToolbar: {
        notification: '网站更新公告'
      },
      language: {
        name: "简体中文"
      }
      // todo!: add global zh-CN messages
    },
    'en-US': {
      userToolbar: {
        notification: 'Update Notification'
      },
      language: {
        name: "English"
      }
      // todo!: add global en-US messages
    }
  }
})

// todo!: add lazy load language

export default i18n
