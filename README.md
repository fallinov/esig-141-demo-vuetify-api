# Rick & Morty Explorer

Application Vue.js 3 + Vuetify 3 — code de départ pour le cours C141.

## Objectif

Compléter l'application en 3 étapes :

1. **API** — Charger et afficher les personnages depuis l'API Rick and Morty
2. **Page statique** — Remplir la page À propos avec des composants Vuetify
3. **Navigation** — Ajouter un menu de navigation latéral

La branche `solution` contient le résultat final.

## Installation

```bash
git clone https://github.com/fallinov/esig-141-demo-vuetify-api.git
cd esig-141-demo-vuetify-api
npm install
npm run dev
```

L'application s'ouvre sur [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
├── App.vue              # Layout (v-app-bar + v-main + v-footer)
├── main.js              # Point d'entrée
├── pages/
│   ├── HomePage.vue     # TODO : Liste des personnages (API)
│   └── AboutPage.vue    # TODO : Page statique
├── plugins/
│   ├── index.js         # Enregistrement des plugins
│   └── vuetify.js       # Configuration Vuetify (dark theme)
├── router/
│   └── index.js         # 2 routes (/ et /about)
└── stores/
    └── index.js         # Pinia store
```

## API Rick and Morty

- **URL** : `https://rickandmortyapi.com/api/character`
- **Réponse** : `{ info: {...}, results: [...] }`
- **Champs utiles** : `id`, `name`, `status`, `species`, `image`

## Stack

- [Vue.js 3](https://vuejs.org/) — Composition API
- [Vuetify 3](https://vuetifyjs.com/) — Composants Material Design
- [Vue Router 4](https://router.vuejs.org/)
- [Vite](https://vitejs.dev/) — Build tool
