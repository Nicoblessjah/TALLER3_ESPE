import { createRouter, createWebHistory } from 'vue-router';
import MenuJuego from '../views/MenuJuego.vue';
import PeleaJuego from '../views/PeleaJuego.vue';
import SeleccionarPersonaje from "@/views/SeleccionarPersonaje.vue";
import Login from '../components/LoginPage.vue';
import Register from '../components/RegisterPage.vue';
import Lore from '../views/LoreJuego.vue';

const routes = [
    { path: '/menu', name: 'Menu', component: MenuJuego },
    { path: '/pelea', name: 'PeleaJuego', component: PeleaJuego },
    { path: '/seleccionar', name: 'SeleccionarPersonaje', component: SeleccionarPersonaje },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/', redirect: '/login' },
    { path: '/lore', name: 'LoreJuego', component: Lore },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;