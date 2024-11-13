<template>
  <nav class="navbar">
    <div class="navbar-content">
      <button @click="logout" class="navbar-button">Cerrar Sesión</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.navbar {
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Press Start 2P', cursive;
}

.navbar-content {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 1200px;
}

.navbar-button {
  background-color: #ffcc00;
  border: 2px solid #fff;
  padding: 10px 20px;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.navbar-button:hover {
  background-color: #ff9900;
  color: #000;
}
</style>
