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
            mainData: {
                name: null,
                surname: null,
                image: null,
                about_me: null,
                email: null,
                phone_number: null,
                experiences: [{
                    position: null,
                    employer: null,
                    start_date: null,
                    due_date: null,
                    description: null,
                }],
                educations: [{
                    institute: null,
                    degree_id: null,
                    due_date: null,
                    description: null,
                }],
            },
        }
    },
    mutations: {
        saveLS(state) {
            localStorage.setItem("mainData", JSON.stringify(state.mainData));
        },
        getLS(state) {
            state.mainData = JSON.parse(localStorage.mainData);
        },
        addObj(state, payload) {
            state.mainData[payload.field].push(payload.obj);
        }
    },
    getters: {
        imgURL(state) {
            if (state.mainData.image) {
                if (state.mainData.image.name) {
                    return URL.createObjectURL(state.mainData.image);
                }
            }
            return null;
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