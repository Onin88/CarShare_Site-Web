import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import "./index.css";

// https redirection (should be done in NGINX, but it not we do it here)
// if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
//     window.location.protocol = 'https:';
// }

const routes = [
    { path: "/", name: 'Main', component: () => import("./views/Main.vue") },
    { path: "/home", name: 'Home', component: () => import("./views/Home.vue") },
    { path: "/register", name: 'Register', component: () => import("./views/Register.vue") },
    { path: "/login", name: 'Login', component: () => import("./views/Login.vue") },
    { path: "/recovery", name: 'Recovery', component: () => import("./views/Recovery.vue") },
    { path: "/reinit", name: 'Reinit', component: () => import("./views/Reinit.vue") },
    { path: "/validate", name: 'Validate', component: () => import("./views/Validate.vue") },
    { path: "/profile", name: 'Profile', component: () => import("./views/Profile.vue") },
    { path: "/admin", name: 'Admin', component: () => import("./views/Admin.vue") },
    { path: "/trips/new", name: 'TripsNew', component: () => import("./views/TripsNew.vue") },
    { path: "/trips/edit", name: 'TripsEdit', component: () => import("./views/TripsNew.vue") },
    // 404 redirection
    { path: "/:catchAll(.*)", name: 'NotFound', component: () => import("./views/NotFound.vue") }
]


const router = createRouter({
    mode: "history",
    history: createWebHistory(),
    routes: routes
});

createApp(App).use(router).mount('#app');