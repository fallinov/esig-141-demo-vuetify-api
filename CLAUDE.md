# esig-141-demo-vuetify-api

## Description
Application de démonstration pour le cours C141 (ESIG).
Consomme l'API [Rick and Morty](https://rickandmortyapi.com/) avec `fetch()`.

## Branches
- **`main`** : code de départ (squelette avec TODOs) pour les élèves
- **`solution`** : code complet (solution finale)

## Stack
- Vue.js 3 (Composition API, `<script setup>`)
- Vuetify 3 (Material Design)
- Vue Router 4
- Vite 5
- Pinia (installé, pas utilisé dans cette démo)

## Structure (code de départ)
```
public/
├── favicon.ico          # Favicon multi-tailles (16, 32, 48px)
└── favicon.png          # Favicon PNG (silhouettes Rick & Morty)
src/
├── App.vue              # Layout (app-bar + footer, pas de drawer)
├── pages/
│   ├── HomePage.vue     # TODO : fetch API + affichage personnages
│   └── AboutPage.vue    # TODO : page statique Vuetify
├── router/index.js      # 2 routes (/ et /about)
├── plugins/vuetify.js   # Config Vuetify (dark theme)
└── stores/index.js      # Pinia (vide)
```

## API
- Liste : `GET https://rickandmortyapi.com/api/character` → `data.results`
- Détail : `GET https://rickandmortyapi.com/api/character/:id`
- Champs : `id`, `name`, `status`, `species`, `gender`, `image`, `origin.name`, `location.name`, `episode.length`

## Commandes
```bash
npm install    # Installer les dépendances
npm run dev    # Serveur de développement (port 3000)
npm run build  # Build production
```

## Conventions
- Pattern fetch : `loading` / `error` / `data` avec try/catch/finally
- Composants Vuetify : prop `to` pour navigation (équivalent RouterLink)
- Pas d'Axios dans cette démo (fetch natif uniquement)

## Dépôt
- GitHub : https://github.com/fallinov/esig-141-demo-vuetify-api
- Cours : C141 — Développer des applications web adaptatives
