<template>
  <div>
    <h1>Seleccionar Personaje</h1>
    <div class="character-selection">
      <div class="player-selection">
        <h2>Jugador 1</h2>
        <div class="carousel" id="carousel1">
          <div
            v-for="character in characters"
            :key="character"
            class="character"
            @click="selectCharacter(1, character)"
          >
            <p class="character-name">{{ character }}</p>
            <img :src="getCharacterImage(character)" alt="Character image" />
          </div>
        </div>
        <button class="prev" @click="prevCharacter('carousel1')">&#10094;</button>
        <button class="next" @click="nextCharacter('carousel1')">&#10095;</button>
        <img
          id="selected-character1"
          class="selected-character"
          :src="selectedCharacter1Image"
        />
      </div>

      <div class="player-selection">
        <h2>Jugador 2</h2>
        <div class="carousel" id="carousel2">
          <div
            v-for="character in characters"
            :key="character"
            class="character"
            @click="selectCharacter(2, character)"
          >
            <p class="character-name">{{ character }}</p>
            <img :src="getCharacterImage(character)" alt="Character image" />
          </div>
        </div>
        <button class="prev" @click="prevCharacter('carousel2')">&#10094;</button>
        <button class="next" @click="nextCharacter('carousel2')">&#10095;</button>
        <img
          id="selected-character2"
          class="selected-character"
          :src="selectedCharacter2Image"
        />
      </div>
    </div>

    <div class="buttons">
      <button class="btn" :disabled="!canStartGame" @click="startGame">
        Iniciar Juego
      </button>
      <router-link to="/menu" class="menu-link">
        <button class="btn">Volver</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
export default {
  name: "SelectCharacter",
  setup() {
    const characters = ref(["finn", "jake", "mordecai", "rigby"]);
    const selectedCharacter1 = ref(null);
    const selectedCharacter2 = ref(null);
    const selectedCharacter1Image = ref("");
    const selectedCharacter2Image = ref("");
    const getCharacterImage = (character) => {
      return require(`../assets/${character.toLowerCase()}/${character.toLowerCase()}select.png`);
    };

    const selectCharacter = (player, character) => {
      const characterImage = getCharacterImage(character);
      if (player === 1) {
        selectedCharacter1.value = character.toLowerCase();
        selectedCharacter1Image.value = characterImage;
        console.log(`Jugador 1 ha seleccionado: ${selectedCharacter1.value}`);
      } else {
        selectedCharacter2.value = character.toLowerCase();
        selectedCharacter2Image.value = characterImage;
        console.log(`Jugador 2 ha seleccionado: ${selectedCharacter2.value}`);
      }
    };
    const nextCharacter = (carouselId) => {
      const carousel = document.getElementById(carouselId);
      carousel.appendChild(carousel.firstElementChild);
      updateSelection(carouselId);
    };
    const prevCharacter = (carouselId) => {
      const carousel = document.getElementById(carouselId);
      carousel.insertBefore(carousel.lastElementChild, carousel.firstElementChild);
      updateSelection(carouselId);
    };
    const updateSelection = (carouselId) => {
      const carousel = document.getElementById(carouselId);
      const selectedCharacter = carousel.children[0].textContent.trim();
      if (carouselId === "carousel1") {
        selectCharacter(1, selectedCharacter);
      } else {
        selectCharacter(2, selectedCharacter);
      }
    };
    const canStartGame = computed(
      () => selectedCharacter1.value && selectedCharacter2.value
    );
    const startGame = () => {
      if (canStartGame.value) {
        localStorage.setItem("player1Character", selectedCharacter1.value);
        localStorage.setItem("player2Character", selectedCharacter2.value);
        window.location.href = "/pelea";
      }
    };
    onMounted(() => {
      document.body.classList.add("character-selection-background");
    });
    onUnmounted(() => {
      document.body.classList.remove("character-selection-background");
    });
    return {
      characters,
      selectedCharacter1,
      selectedCharacter2,
      selectedCharacter1Image,
      selectedCharacter2Image,
      getCharacterImage,
      selectCharacter,
      nextCharacter,
      prevCharacter,
      startGame,
      canStartGame,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

h1,
h2 {
  font-family: "Press Start 2P", cursive;
  color: white;
  text-align: center;
}

.character-selection {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 20px 0;
  gap: 700px;
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.character {
  width: 180px;
  height: 250px;
  margin: 10px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 400px;
  transition: transform 0.2s;
}

.character-name {
  color: #ccc;
  position: relative;
  text-align: center;
}

.character img {
  position: relative;
  max-width: 90%;
  margin: 100px;
  bottom: 90px;
  right: 90px;
  object-fit: contain;
}

.prev,
.next {
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
  text-align: center;
}

button {
  padding: 15px 30px;
  font-size: 16px;
  background-color: #333;
  color: white;
  border: 2px solid #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover {
  background-color: #ffcc00;
  border-color: #ffcc00;
}

.menu-link {
  text-decoration: none;
  display: inline-block;
}

.disabled-link button {
  background-color: #777;
  cursor: not-allowed;
}
</style>

<style>
.character-selection-background {
  background-image: url("../assets/Mapa.png");
  background-size: cover;
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
