import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from "vue-router";

import App from './App.vue'

import TheHome from "./pages/TheHome.vue";
import PersonalInfo from "./pages/PersonalInfo.vue";
import TheExperience from "./pages/TheExperience.vue";
import TheEducation from "./pages/TheEducation.vue";
import TheResume from "./pages/TheResume.vue";

import TheHeader from './components/TheHeader.vue'
import ResumeComponent from './components/ResumeComponent.vue'

const store = createStore({
    state() {
        return {
            image: null,
            degree: 0
        }
    }
})

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/Home' },
        { path: '/Home', component: TheHome },
        { path: '/PersonalInfo', component: PersonalInfo },
        { path: '/Experience', component: TheExperience },
        { path: '/Education', component: TheEducation },
        { path: '/Resume', component: TheResume },
    ]
})

const app = createApp(App);

app.use(router);
app.use(store);

app.component('TheHeader', TheHeader)
    .component('ResumeComponent', ResumeComponent)

app.mount('#app');