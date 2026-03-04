<template>
  <v-app>
    <!-- Barre de navigation -->
    <v-app-bar color="primary" prominent>
      <v-app-bar-title>
        <v-icon icon="mdi-alien" class="mr-2" />
        Rick & Morty Explorer
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>

    <v-footer class="text-center">
      <v-col>
        Démo C141 — ESIG {{ new Date().getFullYear() }} —
        API
        <a href="https://rickandmortyapi.com" target="_blank" class="text-primary">
          rickandmortyapi.com
        </a>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
  //
</script>
