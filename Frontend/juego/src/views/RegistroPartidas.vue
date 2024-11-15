<template>
  <div class="menu-background">
    <div class="menu-container">
      <h1>Registro de Partidas</h1>
      <div class="users-list">
        <div class="user-card" v-for="user in users" :key="user.username">
          <h2>{{ user.username }}</h2>
          <p>Victorias: {{ user.winner }}</p>
          <p>Derrotas: {{ user.loser }}</p>
        </div>
      </div>
      <router-link to="/menu" class="back-button">Volver</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegistroPartidas',
  data() {
    return {
      users: []
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    }
  }
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

.users-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.user-card {
  background: #000;
  color: #fff;
  border: 2px solid #fff;
  padding: 20px;
  margin: 10px;
  font-family: "Press Start 2P", cursive;
  font-size: 16px;
  text-align: center;
  border-radius: 5px;
  transition: background 0.3s, border-color 0.3s;
  width: 200px;
}

.user-card h2 {
  margin-bottom: 10px;
}

.user-card p {
  margin: 5px 0;
}

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

.back-button {
  background: #000;
  color: #fff;
  border: 2px solid #fff;
  padding: 15px 30px;
  margin-top: 20px;
  font-family: "Press Start 2P", cursive;
  font-size: 16px;
  text-decoration: none;
  display: block;
  text-align: center;
  border-radius: 5px;
  transition: background 0.3s, border-color 0.3s;
}

.back-button:hover {
  background: #ffcc00;
  border-color: #ffcc00;
}
</style>
