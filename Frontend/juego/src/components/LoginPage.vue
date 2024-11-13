<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login" class="login-form">
      <input type="text" v-model="username" placeholder="Username" required class="pixel-input" />
      <input type="password" v-model="password" placeholder="Password" required class="pixel-input" />
      <button type="submit" class="pixel-button">Login</button>
    </form>
    <router-link to="/register" class="pixel-link">Register</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          username: this.username,
          password: this.password,
        });

        alert(response.data.message);
        localStorage.setItem('token', response.data.token); // Almacenar el token en localStorage
        this.$router.push('/menu');
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  },
  mounted() {
    document.body.classList.add('login-background');
  },
  beforeUnmount() {
    document.body.classList.remove('login-background');
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

body {
  margin: 0;
  font-family: 'Press Start 2P', cursive;
  background-color: transparent;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #fff;
  text-align: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pixel-input {
  background: #000;
  color: #fff;
  border: 2px solid #fff;
  padding: 10px;
  margin: 10px 0;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  width: 200px;
}

.pixel-button {
  background: #ffcc00;
  color: #000;
  border: 2px solid #fff;
  padding: 10px 20px;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  transition: background 0.3s;
}

.pixel-button:hover {
  background: #ff9900;
}

.pixel-link {
  color: #ffcc00;
  margin-top: 20px;
  text-decoration: none;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
}

.pixel-link:hover {
  text-decoration: underline;
}
</style>

<style>
.login-background {
  background-image: url("../assets/portada2.jpg");
  background-size: cover;
  background-position: center;
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
