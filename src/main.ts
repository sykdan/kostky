import { mount } from 'svelte'
import { registerSW } from 'virtual:pwa-register'
import App from './App.svelte'
import './app.scss'
import "./i18n/locale"
import SvgIcon from "@jamescoyle/svelte-icon";

registerSW({ immediate: true })

document.querySelector("html").setAttribute("theme", localStorage.getItem("st__theme"));
document.querySelector("html").setAttribute("color", localStorage.getItem("st__color"));
document.querySelector('meta[name="theme-color"]').setAttribute("content", getComputedStyle(document.body).getPropertyValue('--primary'));

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
