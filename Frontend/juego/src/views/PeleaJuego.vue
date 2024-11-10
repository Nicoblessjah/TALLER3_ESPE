<template>
  <div>
    <h1>Épicas Batallas de Rap del Frikismo</h1>
    <audio id="background-music" autoplay loop>
      <source src="../assets/song.mp3" type="audio/mpeg">
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
        <div class="character" id="hero" ref="heroElement">
          <img :src="heroImage" alt="Hero">
        </div>
        <div class="character" id="enemy" ref="enemyElement">
          <img :src="enemyImage" alt="Enemy">
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
import { ref, onMounted, onUnmounted, watch } from 'vue';

export default {
  name: 'PeleaJuego',
  setup() {
    const heroHealth = ref(100);
    const enemyHealth = ref(100);
    const heroY = ref(0);
    const heroVelocity = ref(0);
    const keys = ref({});
    const heroElement = ref(null);
    const enemyElement = ref(null);
    const gravity = 0.5;
    const heroImage = ref('');
    const enemyImage = ref('');

    const loadCharacters = () => {
      const player1Character = localStorage.getItem('player1Character');
      const player2Character = localStorage.getItem('player2Character');

      console.log('Cargando personajes:', player1Character, player2Character);

      if (player1Character && player2Character) {
        heroImage.value = `../assets/${player1Character}/${player1Character}.png`;
        enemyImage.value = `assets/${player2Character}/${player2Character}.png`;
        console.log('Imágenes cargadas:', heroImage.value, enemyImage.value);
      } else {
        window.location.href = './select_character.html';
      }
    };

    const handleKeyDown = (event) => {
      keys.value[event.key] = true;
      console.log('Key down:', event.key, keys.value);
    };

    const handleKeyUp = (event) => {
      keys.value[event.key] = false;
      console.log('Key up:', event.key, keys.value);
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
      if (!heroElement.value) return;
      const currentLeft = parseFloat(window.getComputedStyle(heroElement.value).left) || 0;
      heroElement.value.style.left = currentLeft + direction * 5 + 'px'; // Mueve el personaje horizontalmente
      console.log('Hero moved to:', heroElement.value.style.left);
    };

    const jumpHero = () => {
      if (heroY.value === 0) {
        heroVelocity.value = -10;
        console.log('Hero jumps');
      }
    };

    const applyGravity = () => {
      if (!heroElement.value) return;
      heroVelocity.value += gravity;
      heroY.value += heroVelocity.value;

      // Limitar el valor de Y para que no se mueva más allá del suelo
      if (heroY.value > 0) {
        heroY.value = 0;
        heroVelocity.value = 0;
      }

      heroElement.value.style.bottom = heroY.value + 'px'; // Asegúrate de que esté en píxeles
      console.log('Gravity applied:', heroY.value, heroElement.value.style.bottom);
    };

    watch(heroElement, (newVal) => {
      if (newVal) {
        console.log('Hero element set:', newVal);
        updateGame();
      }
    });

    onMounted(() => {
      loadCharacters();
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      document.body.classList.add('fight-background');
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      document.body.classList.remove('fight-background');
    });

    return {
      heroHealth,
      enemyHealth,
      heroElement,
      enemyElement,
      heroImage,
      enemyImage
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
  display: block;
}

#hero, #enemy {
  position: absolute;
  bottom: 0;
  left: 50px;  /* Asegúrate de que el héroe esté dentro de la pantalla */
  transition: left 0.1s ease;
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
