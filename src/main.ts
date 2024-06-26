import './app.scss'
import App from './App.svelte'
import { registerSW } from 'virtual:pwa-register'
import "./i18n/locale"

registerSW({ immediate: true })

document.querySelector("html").setAttribute("theme", localStorage.getItem("st__theme"));
document.querySelector("html").setAttribute("color", localStorage.getItem("st__color"));
document.querySelector('meta[name="theme-color"]').setAttribute("content", getComputedStyle(document.body).getPropertyValue('--primary'));

const app = new App({
  target: document.getElementById('app')
});

export default app
