<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <router-link to="/register">Register</router-link>
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

        // Si el login es exitoso, redirige a la página de menú
        alert(response.data.message);
        this.$router.push('/menu');  // Redirige a /menu

      } catch (error) {
        alert(error.response.data.message);  // Muestra el mensaje de error si no es exitoso
      }
    },
  },
};
</script>
