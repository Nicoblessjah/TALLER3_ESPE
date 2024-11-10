<template>
  <div class="lore-container">
    <h1>El Lore de las Épicas Batallas de Rap del Frikismo</h1>
    <div class="lore-text">
      <p>
        ¡Bienvenidos al torneo más épico de todos! Las **Épicas Batallas de Rap del
        Frikismo** han llegado, y los luchadores más poderosos del mundo de la cultura pop
        están listos para enfrentarse en el escenario más grande de todos: ¡El Micrófono!
      </p>

      <p>
        La historia comenzó cuando un misterioso **youtuber** convocó a los mejores
        rapistas del multiverso a competir por el título de **"Rey del Rap del
        Frikismo"**. Los combates no son solo de fuerza, sino de ingenio, habilidad con
        las palabras y estilo en el escenario.
      </p>

      <h2>Los Peleadores</h2>

      <div v-for="character in characters" :key="character.id" class="character-info">
        <p>
          <strong>{{ character.name }}</strong
          >: {{ character.description }}
        </p>
        <img
          :src="`http://localhost:3000/assets/${character.image}`"
          alt="Character image"
        />
      </div>

      <p>
        Los cuatro luchadores se enfrentarán en una serie de batallas épicas, donde el
        talento para rimar será la clave para salir victorioso. ¡Solo uno se coronará como
        el verdadero rey del rap!
      </p>
    </div>

    <div class="menu-container">
      <router-link to="/menu">Volver al Menú</router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "LoreJuego",
  setup() {
    const characters = ref([]);

    const fetchCharacters = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/characters");
        characters.value = response.data;
      } catch (error) {
        console.error("Error al obtener los personajes:", error);
      }
    };

    onMounted(() => {
      fetchCharacters();
    });

    return {
      characters,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.lore-container {
  text-align: center;
  font-family: "Press Start 2P", cursive;
  padding: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
  background-image: url("../assets/portada2.jpg");
  background-size: cover;
  background-position: center;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.lore-text {
  font-size: 1em;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 15px;
}

h2 {
  font-size: 1.8em;
  margin-top: 20px;
  color: #fff;
}

.character-info {
  margin-bottom: 20px;
}

.character-info img {
  width: 100px;
  height: auto;
}

.menu-container {
  margin-top: 20px;
}

router-link {
  padding: 10px 20px;
  background-color: #333;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

router-link:hover {
  background-color: #555;
}
</style>
