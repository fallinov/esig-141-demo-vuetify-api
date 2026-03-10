# Rick & Morty Explorer

Application Vue.js 3 + Vuetify 3 — code de départ pour le cours C141.

## Objectif

Compléter l'application en suivant les étapes du cours :

0. **Config** — Palette de couleurs Rick & Morty + favicon
1. **Découvrir l'API** — Requête GET dans Bruno, explorer le JSON
2. **API + affichage** — Charger et afficher les personnages avec `fetch()`
3. **Page statique** — Remplir la page À propos avec des composants Vuetify
4. **Navigation** — Ajouter un menu de navigation latéral
5. **Déploiement** — Déployer sur Vercel
6. **Fiche détail** (bonus) — Route dynamique, page détail d'un personnage

La branche [`solution`](https://github.com/fallinov/esig-141-demo-vuetify-api/tree/solution) contient le résultat final. Voir [`etapes-demo.md`](etapes-demo.md) pour le guide complet.

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
public/
├── favicon.ico          # Favicon multi-tailles (16, 32, 48px)
└── favicon.png          # Favicon PNG (silhouettes Rick & Morty)
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

- **URL** : [`https://rickandmortyapi.com/api/character`](https://rickandmortyapi.com/api/character)
- **Documentation** : [rickandmortyapi.com/documentation](https://rickandmortyapi.com/documentation)
- **Réponse** : `{ info: {...}, results: [...] }`
- **Champs utiles** : `id`, `name`, `status`, `species`, `image`

## Stack

- [Vue.js 3](https://vuejs.org/) — Composition API
- [Vuetify 3](https://vuetifyjs.com/) — Composants Material Design
- [Vue Router 4](https://router.vuejs.org/)
- [Vite](https://vitejs.dev/) — Build tool
