<script>
export default {
  name: 'SeleccionarPersonaje'
}
</script>


<template>
  <body>
  <h1>Seleccionar Personaje</h1>
  <div class="character-selection">
    <div class="player-selection">
      <h2>Jugador 1</h2>
      <div class="carousel" id="carousel1">
        <div class="character" data-character="Finn" onclick="selectCharacter(1, 'Finn')">
          <p>Finn</p>
        </div>
        <div class="character" data-character="Mordecai" onclick="selectCharacter(1, 'Mordecai')">
          <p>Mordecai</p>
        </div>
        <div class="character" data-character="Rigby" onclick="selectCharacter(1, 'Rigby')">
          <p>Rigby</p>
        </div>
        <div class="character" data-character="Jake" onclick="selectCharacter(1, 'Jake')">
          <p>Jake</p>
        </div>
      </div>
      <button class="prev" onclick="prevCharacter('carousel1')">&#10094;</button>
      <button class="next" onclick="nextCharacter('carousel1')">&#10095;</button>
      <div id="selected-character1" class="selected-character"></div>
    </div>

    <div class="player-selection">
      <h2>Jugador 2</h2>
      <div class="carousel" id="carousel2">
        <div class="character" data-character="Finn" onclick="selectCharacter(2, 'Finn')">
          <p>Finn</p>
        </div>
        <div class="character" data-character="Mordecai" onclick="selectCharacter(2, 'Mordecai')">
          <p>Mordecai</p>
        </div>
        <div class="character" data-character="Rigby" onclick="selectCharacter(2, 'Rigby')">
          <p>Rigby</p>
        </div>
        <div class="character" data-character="Jake" onclick="selectCharacter(2, 'Jake')">
          <p>Jake</p>
        </div>
      </div>
      <button class="prev" onclick="prevCharacter('carousel2')">&#10094;</button>
      <button class="next" onclick="nextCharacter('carousel2')">&#10095;</button>
      <div id="selected-character2" class="selected-character"></div>
    </div>
  </div>

  <div class="buttons">
    <button class="btn"> <router-link :to="{ path: '/pelea'}" >Iniciar Juego</router-link> </button>
    <button class="btn"> <router-link :to="{ path: '/menu'}" >Volver</router-link> </button>
  </div>
  <audio id="click-sound" src="./assets/boton.mp3"></audio>
  </body>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-image: url("../assets/Mapa.png");
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
}
h2{
  color: #ffffff;
}

.btn{
  border-radius: 15px;
}

.character-selection {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 20px 0;
}

.player-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.carousel {
  display: flex;
  overflow: hidden;
  width: 200px;
  height: 250px;
  margin: 10px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Sombra */
}

.character {
  width: 200px;
  height: 250px;
  margin: 10px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 400px;
  transition: transform 0.2s;
}
.character img {
  position: relative;
  max-width: 90%;
  margin: 100px;
  bottom: 90px;
  right: 100px;
  object-fit: contain;
}

.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px;
  font-size: 18px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  outline: none;
}

.prev {
  left: -50px;
}

.next {
  right: -50px;
}

.selected-character {
  width: 150px;
  height: 150px;
  background-repeat: no-repeat;
  display: none;
  margin-top: 10px;
  position: relative;
}

.buttons {
  margin-top: 20px;
}

button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

}

</style>