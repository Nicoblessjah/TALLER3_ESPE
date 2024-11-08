<template>
  <div>
    <h1>Épicas Batallas de Rap del Frikismo</h1>
    <audio id="background-music" autoplay loop>
      <source src="assets/song.mp3" type="audio/mpeg">
      Tu navegador no soporta la etiqueta de audio.
    </audio>
    <div class="container">
      <div id="fight-section">
        <div class="health-bar" id="hero-health-bar">
          <div class="health" id="hero-health" :style="{ width: heroHealth + '%' }"></div>
          <p class="status" id="hero-status">Vida: {{ heroHealth }}/100</p>
        </div>
        <div class="health-bar" id="enemy-health-bar">
          <div class="health" id="enemy-health" :style="{ width: enemyHealth + '%' }"></div>
          <p class="status" id="enemy-status">Vida: {{ enemyHealth }}/100</p>
        </div>
        <div class="character" id="hero" ref="hero">
          <img :src="hero.image" alt="Hero">
        </div>
        <div class="character" id="enemy" ref="enemy">
          <img :src="enemy.image" alt="Enemy">
        </div>
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
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'PeleaJuego',
  setup() {
    const hero = ref({
      health: 100,
      damage: 25,
      image: '', // Ruta de la imagen del héroe seleccionado
    });

    const enemy = ref({
      health: 100,
      damage: 25,
      image: '', // Ruta de la imagen del enemigo seleccionado
    });

    const heroHealth = ref(100);
    const enemyHealth = ref(100);
    const heroY = ref(0);
    const heroVelocity = ref(0);
    const keys = ref({});

    const gravity = 0.5;

    const loadCharacters = () => {
      const selectedHero = JSON.parse(localStorage.getItem('selectedHero'));
      const selectedEnemy = JSON.parse(localStorage.getItem('selectedEnemy'));

      hero.value = {...hero.value, ...selectedHero};
      enemy.value = {...enemy.value, ...selectedEnemy};
    };

    const handleKeyDown = (event) => {
      keys.value[event.key] = true;
    };

    const handleKeyUp = (event) => {
      keys.value[event.key] = false;
    };

    const updateGame = () => {
      if (keys.value['ArrowRight']) {
        moveHero(1);
      }
      if (keys.value['ArrowLeft']) {
        moveHero(-1);
      }
      if (keys.value['ArrowUp']) {
        jumpHero();
      }

      applyGravity();

      requestAnimationFrame(updateGame);
    };

    const moveHero = (direction) => {
      const heroElement = hero.value.$el;
      const left = parseFloat(window.getComputedStyle(heroElement).left);
      heroElement.style.left = left + direction * 5 + 'px';
    };

    const jumpHero = () => {
      if (heroY.value === 0) {
        heroVelocity.value = -10;
      }
    };

    const applyGravity = () => {
      const heroElement = hero.value.$el;
      heroVelocity.value += gravity;
      heroY.value += heroVelocity.value;
      if (heroY.value > 0) {
        heroY.value = 0;
        heroVelocity.value = 0;
      }
      heroElement.style.bottom = heroY.value + 'px';
    };

    onMounted(() => {
      loadCharacters();
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      updateGame();
      document.body.classList.add('fight-background');
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      document.body.classList.remove('fight-background');
    });

    return {
      hero,
      enemy,
      heroHealth,
      enemyHealth,
    };
  },
};
</script>

<style scoped>
h1 {
  font-family: Arial, sans-serif;
  text-align: center;
  color: rgb(255, 255, 255);
  font-family: 'Courier New', Courier, monospace;
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
  background-color: rgba(255, 0, 242, 0.8);
}

.character {
  width: 10%;
  position: absolute;
  bottom: 0;
}

.character img {
  width: 100%;
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
</style>

<style>
.fight-background {
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
</style>
