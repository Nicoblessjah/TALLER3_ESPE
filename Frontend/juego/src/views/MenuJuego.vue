<template>
  <div class="menu-container">
    <h1>Épicas Batallas de Rap del Frikismo</h1>
    <div class="menu-links">
      <router-link to="/seleccionar" class="menu-link">Seleccionar Personaje</router-link>
    </div>
    <NavBar />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "MenuJuego",
  components: {
    NavBar,
  },
  mounted() {
    document.body.classList.add("menu-background");
  },
  beforeUnmount() {
    document.body.classList.remove("menu-background");
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

h1 {
  font-family: "Press Start 2P", cursive;
  color: #fff;
  font-size: 30px;
  margin-bottom: 30px;
  text-align: center;
}

.menu-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
  text-align: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.menu-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.menu-link {
  background: #000;
  color: #fff;
  border: 2px solid #fff;
  padding: 15px 30px;
  margin: 10px;
  font-family: "Press Start 2P", cursive;
  font-size: 16px;
  text-decoration: none;
  display: block;
  text-align: center;
  border-radius: 5px;
  transition: background 0.3s, border-color 0.3s;
}

.menu-link:hover {
  background: #ffcc00;
  border-color: #ffcc00;
}
</style>

<style>
.menu-background {
  background-image: url("../assets/portada2.jpg");
  background-size: cover;
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
