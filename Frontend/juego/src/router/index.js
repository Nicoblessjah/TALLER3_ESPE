import { createRouter, createWebHistory } from 'vue-router';
import MenuJuego from '../views/MenuJuego.vue';
import PeleaJuego from '../views/PeleaJuego.vue';
import SeleccionarPersonaje from "@/views/SeleccionarPersonaje.vue";

const routes = [
    { path: '/', name: 'Menu', component: MenuJuego },
    { path: '/Pelea', name: 'PeleaJuego', component: PeleaJuego },
    { path: '/Seleccionar', name: 'SeleccionarPersonaje', component: SeleccionarPersonaje },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;