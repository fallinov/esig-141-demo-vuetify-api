# Démo Vuetify + API

Application Vue.js 3 + Vuetify 3 qui consomme une API REST avec `fetch()`.

La démo charge la liste des utilisateurs depuis [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) et les affiche dans des `v-card`.

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/fallinov/esig-141-demo-vuetify-api.git
cd esig-141-demo-vuetify-api

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application s'ouvre sur [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
├── App.vue              # Layout (v-app-bar + v-main)
├── main.js              # Point d'entrée
├── pages/
│   └── HomePage.vue     # Démo API : fetch + v-card
├── components/          # Composants réutilisables
├── plugins/
│   ├── index.js         # Enregistrement des plugins
│   └── vuetify.js       # Configuration Vuetify (dark theme)
├── router/
│   └── index.js         # Route unique (/)
└── stores/
    └── index.js         # Pinia store
```

## Concepts clés

### Appel API avec `fetch()`

```js
const users = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`)
    users.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
```

**3 états à gérer** : `loading` (chargement en cours), `error` (erreur réseau/serveur), `users` (données).

### Affichage conditionnel

```html
<div v-if="loading">...</div>
<v-alert v-else-if="error">...</v-alert>
<v-row v-else>...</v-row>
```

## Adapter à votre API

1. Remplacez l'URL dans `fetch()` par celle de votre API
2. Adaptez les propriétés affichées dans les `v-card` (nom, email, etc.)
3. Modifiez le titre dans `App.vue` et `index.html`

## Stack

- [Vue.js 3](https://vuejs.org/) — Composition API
- [Vuetify 3](https://vuetifyjs.com/) — Composants Material Design
- [Vue Router 4](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/) — State management
- [Vite](https://vitejs.dev/) — Build tool
