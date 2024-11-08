<template>
  <div class="lore-container">
    <h1>El Lore de las Épicas Batallas de Rap del Frikismo</h1>
    <div class="lore-text">
      <p>¡Bienvenidos al torneo más épico de todos! Las **Épicas Batallas de Rap del Frikismo** han llegado, y los luchadores más poderosos del mundo de la cultura pop están listos para enfrentarse en el escenario más grande de todos: ¡El Micrófono!</p>

      <p>La historia comenzó cuando un misterioso **youtuber** convocó a los mejores rapistas del multiverso a competir por el título de **"Rey del Rap del Frikismo"**. Los combates no son solo de fuerza, sino de ingenio, habilidad con las palabras y estilo en el escenario.</p>

      <h2>Los Peleadores</h2>

      <p><strong>Mordecai y Rigby</strong>: Estos dos amigos inseparables del parque están listos para demostrar que la amistad puede ser el arma más fuerte en una batalla de rap. Mordecai con su estilo relajado y Rigby con su actitud irreverente, ¡juntos harán temblar el escenario!</p>

      <p><strong>Jake</strong>: El perro mágico y compañero inseparable de Finn. Con su poder de estirarse y su amor por la diversión, Jake es un contendiente impredecible que usa sus habilidades sobrenaturales para dominar el rap como nunca antes. ¿Podrá su carisma y creatividad llevarlo a la victoria?</p>

      <p><strong>Finn</strong>: El intrépido héroe de Ooo, con su espada en mano y su corazón lleno de valentía, Finn no solo lucha por salvar el mundo, ¡sino también por convertirse en el campeón del rap! Su determinación y su pasión lo hacen un oponente feroz en cualquier batalla.</p>

      <p>Los cuatro luchadores se enfrentarán en una serie de batallas épicas, donde el talento para rimar será la clave para salir victorioso. ¡Solo uno se coronará como el verdadero rey del rap!</p>
    </div>

    <div class="menu-container">
      <router-link to="/menu">Volver al Menú</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoreJuego'
}
</script>

<style scoped>
.lore-container {
  text-align: center;
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background-color: #fff;
  color: #333;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
}

.lore-text {
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 40px;
}

h2 {
  font-size: 1.8em;
  margin-top: 20px;
  color: #444;
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
