<script>
export default {
  name: 'PeleaJuego'
}
</script>

<template>
  <body>
  <h1>Épicas Batallas de Rap del Frikismo</h1>
  <audio id="background-music" autoplay loop>
    <source src="assets/song.mp3" type="audio/mpeg">
    Tu navegador no soporta la etiqueta de audio.
  </audio>
  <div class="container">
    <div id="fight-section">
      <div class="health-bar" id="hero-health-bar">
        <div class="health" id="hero-health"></div>
        <p class="status" id="hero-status">Vida: 1000/1000</p>
      </div>
      <div class="health-bar" id="enemy-health-bar">
        <div class="health" id="enemy-health"></div>
        <p class="status" id="enemy-status">Vida: 1000/1000</p>
      </div>
      <div class="character" id="hero">
        <canvas id="hero-canvas" width="64" height="64"></canvas>
      </div>
      <div class="character" id="enemy">
        <canvas id="enemy-canvas" width="64" height="64"></canvas>
      </div>
    </div>
  </div>
  <div class="buttons">
    <button class="btn-personajes"> <router-link :to="{ path: '/menu'}" >Salir</router-link> </button>
    <button class="btn-personajes"> <router-link :to="{ path: '/seleccionar'}" >Cambiar Personaje</router-link> </button>
  </div>

  </body>

</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-image: url("../assets/background.jpg");
  background-size: cover;
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  color: rgb(255, 255, 255);
  font-family: 'Courier New', Courier, monospace;
}

h2 {
  color: #ffffff;
  font-family: 'Times New Roman', Times, serif;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
}

#fight-section {
  position: relative;
  width: 80%;
  height: 80%;
  border: 1px solid #000;
  overflow: hidden;
  background-color: rgba(255, 0, 242, 0.8)
}

.character {
  width: 10%;
  position: absolute;
  height: auto;
}

.character img {
  width: 100%;
  position: relative;
}

.health-bar {
  position: absolute;
  top: 0;
  width: 45%;
  height: 20px;
  background-color: #ccc;
  border: 1px solid #000;
  margin: 5px 2.5%;
  box-sizing: border-box;
  border-radius: 15px;
}

.health {
  height: 100%;
  background-color: #4caf50;
  width: 100%;
  border-radius: 15px;
}

.status {
  color: #ffffff;
  font-family: Arial, sans-serif;
  font-size: 14px;
  margin-top: 5px;
}

#hero-health-bar {
  left: 0;
}

#enemy-health-bar {
  right: 0;
}

.buttons {
  position: relative;
  bottom: 20px;
}

button {
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  border-radius: 15px;
  cursor: pointer;

}

.btn-personajes {
  background-color: #ffffff;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 15px;
  text-decoration: none;

}

.character canvas {
  width: 128px;
  height: 128px;
}
</style>