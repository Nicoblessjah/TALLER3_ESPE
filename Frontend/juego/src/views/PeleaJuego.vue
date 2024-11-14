<template>
  <div>
    <h1>Épicas Batallas de Rap del Frikismo</h1>
    <audio id="background-music" autoplay loop>
      <source src="../assets/song.mp3" type="audio/mpeg" />
      Tu navegador no soporta la etiqueta de audio.
    </audio>
    <div class="container">
      <div id="fight-section">
        <canvas id="hero-canvas" ref="heroCanvas"></canvas>
        <canvas id="enemy-canvas" ref="enemyCanvas"></canvas>
      </div>
      <div class="health-bar" id="hero-health-bar">
        <div class="health" :style="{ width: heroHealth + '%' }"></div>
        <p class="status">Vida: {{ heroHealth }}/100</p>
      </div>
      <div class="health-bar" id="enemy-health-bar">
        <div class="health" :style="{ width: enemyHealth + '%' }"></div>
        <p class="status">Vida: {{ enemyHealth }}/100</p>
      </div>
    </div>
    <div class="buttons">
      <button class="btn-personajes">
        <router-link :to="{ path: '/menu' }">Salir</router-link>
      </button>
      <button class="btn-personajes">
        <router-link :to="{ path: '/seleccionar' }">Cambiar Personaje</router-link>
      </button>
    </div>
    <div v-if="gameOver" class="game-over">
      <h2>Jugador {{ winner }} ha ganado!</h2>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "PeleaJuego",
  setup() {
    const heroHealth = ref(100);
    const enemyHealth = ref(100);
    const heroImage = ref(null);
    const enemyImage = ref(null);
    const heroCanvas = ref(null);
    const enemyCanvas = ref(null);
    const heroX = ref(100);
    const heroY = ref(100);
    const enemyX = ref(300);
    const enemyY = ref(100);
    const heroJumping = ref(false);
    const enemyJumping = ref(false);
    const gameOver = ref(false);
    const winner = ref(null);

    const keys = {};

    const loadCharacters = () => {
      const player1Character = localStorage.getItem("player1Character");
      const player2Character = localStorage.getItem("player2Character");

      if (player1Character && player2Character) {
        try {
          heroImage.value = new Image();
          heroImage.value.src = require(`../assets/${player1Character}/${player1Character}.png`);
          enemyImage.value = new Image();
          enemyImage.value.src = require(`../assets/${player2Character}/${player2Character}.png`);

          heroImage.value.onload = () =>
            drawCharacter(heroCanvas.value, heroImage.value, heroX.value, heroY.value);
          enemyImage.value.onload = () =>
            drawCharacter(
              enemyCanvas.value,
              enemyImage.value,
              enemyX.value,
              enemyY.value
            );
        } catch (error) {
          console.error("Error al cargar la imagen:", error);
        }
      } else {
        window.location.href = "/seleccionar";
      }
    };

    const drawCharacter = (canvas, image, x, y) => {
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      const spriteWidth = 25;
      const spriteHeight = 30;
      context.drawImage(
        image,
        0,
        0,
        spriteWidth,
        spriteHeight,
        x,
        y,
        spriteWidth,
        spriteHeight
      );
    };

    const handleKeydown = (event) => {
      keys[event.key] = true;
    };

    const handleKeyup = (event) => {
      keys[event.key] = false;
    };

    const attack = (x, y, player) => {
      if (
        player === "hero" &&
        x + 150 > enemyX.value &&
        x < enemyX.value + 150 &&
        y < enemyY.value + 150
      ) {
        enemyHealth.value -= 10;
        if (enemyHealth.value <= 0) {
          winner.value = 1;
          gameOver.value = true;
        }
      } else if (
        player === "enemy" &&
        x + 150 > heroX.value &&
        x < heroX.value + 150 &&
        y < heroY.value + 150
      ) {
        heroHealth.value -= 10;
        if (heroHealth.value <= 0) {
          winner.value = 2;
          gameOver.value = true;
        }
      }
    };

    const updateGame = () => {
      if (gameOver.value) return;

      if (keys["a"]) heroX.value -= 5;
      if (keys["d"]) heroX.value += 5;
      if (keys["w"] && !heroJumping.value) heroY.value -= 50;
      if (keys[" "] || keys["Space"]) attack(heroX.value, heroY.value, "hero");

      if (keys["ArrowLeft"]) enemyX.value -= 5;
      if (keys["ArrowRight"]) enemyX.value += 5;
      if (keys["ArrowUp"] && !enemyJumping.value) enemyY.value -= 50;
      if (keys["Enter"]) attack(enemyX.value, enemyY.value, "enemy");

      if (heroY.value < 100) heroY.value += 5;
      if (enemyY.value < 100) enemyY.value += 5;

      drawCharacter(heroCanvas.value, heroImage.value, heroX.value, heroY.value);
      drawCharacter(enemyCanvas.value, enemyImage.value, enemyX.value, enemyY.value);
    };

    onMounted(() => {
      loadCharacters();

      heroCanvas.value.width = 150;
      heroCanvas.value.height = 150;
      enemyCanvas.value.width = 150;
      enemyCanvas.value.height = 150;

      heroX.value = 10;
      enemyX.value = 110;

      document.body.classList.add("fight-background");

      window.addEventListener("keydown", handleKeydown);
      window.addEventListener("keyup", handleKeyup);

      setInterval(updateGame, 1000 / 60);
    });

    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
      document.body.classList.remove("fight-background");
    });

    return {
      heroHealth,
      enemyHealth,
      heroCanvas,
      enemyCanvas,
      gameOver,
      winner,
    };
  },
};
</script>

<style scoped>
h1 {
  font-family: Arial, sans-serif;
  text-align: center;
  color: rgb(255, 255, 255);
  font-family: "Courier New", Courier, monospace;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  flex-direction: column;
}

#fight-section {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  background-color: rgba(255, 0, 242, 0.8);
}

canvas {
  position: absolute;
  width: 100%;
  height: 100%;
}

.health-bar {
  position: relative;
  width: 45%;
  height: 20px;
  background-color: #ccc;
  border: 1px solid #000;
  margin: 10px;
  border-radius: 10px;
  box-sizing: border-box;
}

.health {
  height: 100%;
  background-color: #4caf50;
  border-radius: 10px;
}

.status {
  color: #ffffff;
  font-family: Arial, sans-serif;
  font-size: 14px;
  margin-top: 5px;
}

#hero-health-bar {
  align-self: flex-start;
}

#enemy-health-bar {
  align-self: flex-end;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 15px;
  cursor: pointer;
  margin: 0 10px;
}

.btn-personajes {
  background-color: #ffffff;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 15px;
  text-decoration: none;
}

.game-over {
  text-align: center;
  color: #ffffff;
  font-size: 24px;
  margin-top: 20px;
}
</style>

<style>
.fight-background {
  background-image: url("../assets/background.jpg");
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
