import { createRouter, createWebHistory } from 'vue-router';
import MenuJuego from '../views/MenuJuego.vue';
import PeleaJuego from '../views/PeleaJuego.vue';
import SeleccionarPersonaje from "@/views/SeleccionarPersonaje.vue";
import Login from '../components/LoginPage.vue';
import Register from '../components/RegisterPage.vue';
import Lore from '../views/LoreJuego.vue';
import RegistroPartidas from '@/views/RegistroPartidas.vue';

const routes = [
    { path: '/menu', name: 'Menu', component: MenuJuego, meta: { requiresAuth: true } },
    { path: '/pelea', name: 'PeleaJuego', component: PeleaJuego, meta: { requiresAuth: true } },
    { path: '/seleccionar', name: 'SeleccionarPersonaje', component: SeleccionarPersonaje, meta: { requiresAuth: true } },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/', redirect: '/login' },
    { path: '/lore', name: 'LoreJuego', component: Lore},
    { path: '/registro', name: 'RegistroPartidas', component: RegistroPartidas },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = localStorage.getItem('token');
        if (!token) {
            next({ path: '/login' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
