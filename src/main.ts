import { mount } from 'svelte'
// @ts-ignore
import { registerSW } from 'virtual:pwa-register'
import App from './App.svelte'
import './style/main.css'
import "./i18n/locale"

registerSW({ immediate: true })

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
