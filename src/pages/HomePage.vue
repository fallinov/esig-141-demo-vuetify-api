<template>
  <v-container>
    <h1 class="text-h4 my-4">Personnages Rick & Morty</h1>

    <!-- Chargement -->
    <div v-if="loading" class="d-flex justify-center my-8">
      <v-progress-circular indeterminate color="primary" size="64" />
    </div>

    <!-- Erreur -->
    <v-alert v-else-if="error" type="error" class="my-4">
      {{ error }}
    </v-alert>

    <!-- TODO : Liste des personnages -->
    <v-row v-else>
      <v-col cols="12">
        <p>{{ characters.length }} personnage(s) chargé(s)</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// État réactif
const characters = ref([])
const loading = ref(true)
const error = ref(null)

// TODO : Charger les personnages depuis l'API Rick and Morty
// URL : https://rickandmortyapi.com/api/character
// La réponse contient { info: {...}, results: [...] }
onMounted(async () => {
  try {
    // TODO : fetch + vérification response.ok + extraction des résultats

  } catch (err) {
    error.value = `Impossible de charger les personnages : ${err.message}`
  } finally {
    loading.value = false
  }
})
</script>
