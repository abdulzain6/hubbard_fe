import './assets/main.css'
import VueApexCharts from "vue3-apexcharts";
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const pinia = createPinia()
const app = createApp(App)
app.use(PrimeVue, { ripple: true, styled: true });
app.use(pinia)
app.use(VueApexCharts)
app.use(router)

app.mount('#app')
