import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router";

import App from './App.vue'

import TheHome from "./pages/TheHome.vue";
import PersonalInfo from "./pages/PersonalInfo.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/Home' },
        { path: '/Home', component: TheHome },
        { path: '/PersonalInfo', component: PersonalInfo },
    ]
})

const app = createApp(App);

app.use(router);


app.mount('#app');