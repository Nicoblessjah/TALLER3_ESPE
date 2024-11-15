<template>
  <div>
    <h1>Épicas Batallas de Rap del Frikismo</h1>
    <audio id="background-music" autoplay loop>
      <source src="../assets/song.mp3" type="audio/mpeg" />
      Tu navegador no soporta la etiqueta de audio.
    </audio>
    <div class="container">
      <div id="fight-section">
        <div v-if="gameOver" class="game-over">
          <h2 style="height: 0px">
            ¡{{ winner === 1 ? username1 : username2 }} ha ganado!
          </h2>
        </div>
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

    <div v-if="gameOver" class="modal">
      <div class="modal-content">
        <h2>¿Quieres volver a jugar?</h2>
        <button class="btn" @click="restartGame">Reiniciar pelea</button>
        <br />
        <button class="btn" style="left: 75px" @click="exitGame">Menu</button>
        <button class="btn" @click="cambiarChar">Cambiar personaje</button>
      </div>
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
    const username1 = ref(localStorage.getItem("username") || "Jugador 1");
    const username2 = ref("Jugador 2");

    const keys = {};
    const punchSound = new Audio(require("../assets/punch.mp3"));

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
      const spriteWidth = 22;
      const spriteHeight = 35;
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
      if (event.key === "w") heroJumping.value = false;
      if (event.key === "ArrowUp") enemyJumping.value = false;
    };

    const getRandomDamage = () => {
      return Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    };

    const updateUserStats = async (username, hasWon) => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/update-stats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ username, hasWon }),
        });
        const data = await response.json();
        if (!response.ok) {
          console.error("Error al actualizar estadísticas:", data.message);
        } else {
          console.log("Estadísticas actualizadas con éxito:", data.message);
        }
      } catch (error) {
        console.error("Error de red al actualizar estadísticas:", error);
      }
    };

    const handleGameOver = () => {
      if (winner.value === 1) {
        updateUserStats(username1.value, true);
        updateUserStats(username2.value, false);
      } else if (winner.value === 2) {
        updateUserStats(username2.value, true);
        updateUserStats(username1.value, false);
      }
    };

    const restartGame = () => {
      heroHealth.value = 100;
      enemyHealth.value = 100;
      heroX.value = 20;
      heroY.value = 100;
      enemyX.value = 150;
      enemyY.value = 100;
      gameOver.value = false;
      winner.value = null;

      loadCharacters();
    };

    const exitGame = () => {
      window.location.href = "/menu";
    };

    const cambiarChar = () => {
      window.location.href = "/seleccionar";
    };

    const attack = (x, y, player) => {
      const heroWidth = 25;
      const enemyWidth = 25;
      const heroHeight = 30;
      const enemyHeight = 30;

      if (
        player === "hero" &&
        x + heroWidth > enemyX.value &&
        x < enemyX.value + enemyWidth &&
        y + heroHeight > enemyY.value &&
        y < enemyY.value + enemyHeight
      ) {
        const damage = getRandomDamage();
        enemyHealth.value -= damage;
        punchSound.play();
        console.log(`¡Daño al enemigo! -${damage}`);
        if (enemyHealth.value <= 0) {
          winner.value = 1;
          gameOver.value = true;
          handleGameOver();
        }
      } else if (
        player === "enemy" &&
        x + heroWidth > heroX.value &&
        x < heroX.value + heroWidth &&
        y + heroHeight > heroY.value &&
        y < heroY.value + heroHeight
      ) {
        const damage = getRandomDamage();
        heroHealth.value -= damage;
        punchSound.play();
        console.log(`¡Daño al héroe! -${damage}`);
        if (heroHealth.value <= 0) {
          winner.value = 2;
          gameOver.value = true;
          handleGameOver();
        }
      }
    };

    const updateGame = () => {
      if (gameOver.value) return;

      const heroCanvasWidth = heroCanvas.value.width;
      const enemyCanvasWidth = enemyCanvas.value.width;

      if (keys["a"] && heroX.value > 0) heroX.value -= 2;
      if (keys["d"] && heroX.value < heroCanvasWidth - 25) heroX.value += 2;
      if (keys["w"] && !heroJumping.value) {
        heroJumping.value = true;
        heroY.value = Math.max(0, heroY.value - 30);
      }
      if (keys[" "] || keys["Space"]) attack(heroX.value, heroY.value, "hero");

      if (keys["ArrowLeft"] && enemyX.value > 0) enemyX.value -= 2;
      if (keys["ArrowRight"] && enemyX.value < enemyCanvasWidth - 25) enemyX.value += 2;
      if (keys["ArrowUp"] && !enemyJumping.value) {
        enemyJumping.value = true;
        enemyY.value = Math.max(0, enemyY.value - 30);
      }
      if (keys["Enter"]) attack(enemyX.value, enemyY.value, "enemy");

      if (heroY.value < 100) heroY.value += 5;
      if (enemyY.value < 100) enemyY.value += 5;

      drawCharacter(heroCanvas.value, heroImage.value, heroX.value, heroY.value);
      drawCharacter(enemyCanvas.value, enemyImage.value, enemyX.value, enemyY.value);
    };

    onMounted(() => {
      loadCharacters();

      heroCanvas.value.width = 200;
      heroCanvas.value.height = 150;
      enemyCanvas.value.width = 200;
      enemyCanvas.value.height = 150;

      heroX.value = 20;
      enemyX.value = 150;

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
      username1,
      username2,
      gameOver,
      winner,
      cambiarChar,
      restartGame,
      exitGame,
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
  height: 90%;
  flex-direction: column;
  position: relative;
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
  position: absolute;
  width: 100px;
  height: 10px;
  background-color: #ccc;
  border: 1px solid #000;
  border-radius: 5px;
  box-sizing: border-box;
  z-index: 1;
}

.health {
  height: 100%;
  background-color: #4caf50;
  border-radius: 5px;
}

.status {
  color: #ffffff;
  font-family: Arial, sans-serif;
  font-size: 14px;
  margin-top: 5px;
}

#hero-health-bar {
  top: 10px;
  right: 550px;
}
#enemy-health-bar {
  top: 10px;
  left: 550px;
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
  position: relative;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 15px;
  cursor: pointer;
  margin: 10px;
  position: relative;
}

.btn {
  background: #000;
  color: #fff;
  border: 2px solid #fff;
  margin: 10px;
  position: relative;
  font-family: "Press Start 2P", cursive;
  font-size: 16px;
  text-decoration: none;
  display: block;
  text-align: center;
  border-radius: 5px;
  transition: background 0.3s, border-color 0.3s;
}

button:hover {
  background: #ffcc00;
  border-color: #ffcc00;
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
