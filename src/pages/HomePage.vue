<template>
  <v-container>
    <h1 class="text-h4 my-4">Utilisateurs — JSONPlaceholder API</h1>

    <!-- Chargement -->
    <div v-if="loading" class="d-flex justify-center my-8">
      <v-progress-circular indeterminate color="primary" size="64" />
    </div>

    <!-- Erreur -->
    <v-alert v-else-if="error" type="error" class="my-4">
      {{ error }}
    </v-alert>

    <!-- Liste des utilisateurs -->
    <v-row v-else>
      <v-col
        v-for="user in users"
        :key="user.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="h-100">
          <v-card-title>{{ user.name }}</v-card-title>
          <v-card-subtitle>{{ user.company.name }}</v-card-subtitle>
          <v-card-text>
            <div class="d-flex align-center mb-1">
              <v-icon icon="mdi-email" size="small" class="mr-2" />
              {{ user.email }}
            </div>
            <div class="d-flex align-center mb-1">
              <v-icon icon="mdi-phone" size="small" class="mr-2" />
              {{ user.phone }}
            </div>
            <div class="d-flex align-center">
              <v-icon icon="mdi-map-marker" size="small" class="mr-2" />
              {{ user.address.city }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// État réactif
const users = ref([])
const loading = ref(true)
const error = ref(null)

// Chargement des données au montage du composant
onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')

    // Vérifier que la réponse est OK (status 200-299)
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`)
    }

    users.value = await response.json()
  } catch (err) {
    error.value = `Impossible de charger les utilisateurs : ${err.message}`
  } finally {
    loading.value = false
  }
})
</script>
