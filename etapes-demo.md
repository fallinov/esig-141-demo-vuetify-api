# Étapes de la démo — Rick & Morty Explorer

Durée : ~1h30
Code de départ : branche `main`
Solution : branche `solution`

## Prérequis

- Node.js installé
- `npm install` effectué
- `npm run dev` lancé → http://localhost:3000

## Étape 1 — Appel API et affichage des personnages (~40 min)

### Théorie à présenter

- Qu'est-ce qu'une API REST : [devjs.ch/api/introduction](https://devjs.ch/api/introduction/)
- `async/await`, `try/catch`, `fetch()` : [devjs.ch/api/utilisation-en-projet](https://devjs.ch/api/utilisation-en-projet/)
- `ref()`, `onMounted` : [devjs.ch/vue/bases](https://devjs.ch/vue/bases/)

### Infos clés à donner

- URL de l'API : `https://rickandmortyapi.com/api/character`
- La réponse contient `{ info: {...}, results: [...] }` → on veut `data.results`
- Champs utiles d'un personnage : `id`, `name`, `status`, `species`, `image`
- 3 statuts possibles : `Alive`, `Dead`, `unknown`

### Ce que les élèves codent dans `HomePage.vue`

**1. Le fetch dans `onMounted`** :

```js
const response = await fetch('https://rickandmortyapi.com/api/character')

if (!response.ok) {
  throw new Error(`Erreur HTTP ${response.status}`)
}

const data = await response.json()
characters.value = data.results
```

**2. Les cards dans le `<v-row>`** (remplacer le TODO) :

```html
<v-col
  v-for="character in characters"
  :key="character.id"
  cols="12" sm="6" md="4" lg="3"
>
  <v-card class="h-100">
    <v-img :src="character.image" :alt="character.name" height="200" cover />
    <v-card-title>{{ character.name }}</v-card-title>
    <v-card-text>
      <v-chip
        :color="statusColor(character.status)"
        size="small"
        class="mr-2"
      >
        {{ character.status }}
      </v-chip>
      <v-chip size="small" variant="outlined">
        {{ character.species }}
      </v-chip>
    </v-card-text>
  </v-card>
</v-col>
```

**3. La fonction `statusColor`** :

```js
function statusColor(status) {
  const colors = { Alive: 'green', Dead: 'red', unknown: 'grey' }
  return colors[status] || 'grey'
}
```

### Points à souligner

- Le pattern `loading / error / data` avec `v-if / v-else-if / v-else`
- `v-for` avec `:key` obligatoire
- `v-img` avec `cover` pour uniformiser les tailles
- `v-chip` avec `:color` dynamique — binding d'attribut

## Étape 2 — Page À propos (~20 min)

### Théorie à présenter

- Composants Vuetify : [vuetifyjs.com/components/all](https://vuetifyjs.com/en/components/all/)
- SFC (Single File Component) : [devjs.ch/vue/anatomie](https://devjs.ch/vue/anatomie/)

### Ce que les élèves codent dans `AboutPage.vue`

Page 100% statique — pas de JS, juste du template Vuetify :

```html
<v-card class="mb-4">
  <v-card-title>
    <v-icon icon="mdi-alien" class="mr-2" />
    Rick & Morty Explorer
  </v-card-title>
  <v-card-text>
    Application de démonstration pour le cours
    <strong>C141 — Développer des applications web adaptatives</strong>.
  </v-card-text>
</v-card>

<v-card>
  <v-card-title>
    <v-icon icon="mdi-layers-triple" class="mr-2" />
    Stack technique
  </v-card-title>
  <v-card-text>
    <v-list density="compact">
      <v-list-item prepend-icon="mdi-vuejs" title="Vue.js 3" subtitle="Composition API" />
      <v-list-item prepend-icon="mdi-vuetify" title="Vuetify 3" subtitle="Composants Material Design" />
      <v-list-item prepend-icon="mdi-sign-direction" title="Vue Router 4" subtitle="Navigation entre pages" />
      <v-list-item prepend-icon="mdi-lightning-bolt" title="Vite" subtitle="Build tool" />
    </v-list>
  </v-card-text>
</v-card>
```

### Points à souligner

- Pas de `<script setup>` nécessaire pour une page statique
- `v-card` = conteneur principal Vuetify (title, subtitle, text, actions)
- `v-list-item` avec `prepend-icon`, `title`, `subtitle` — tout déclaratif
- Icônes MDI : catalogue sur [pictogrammers.com/library/mdi](https://pictogrammers.com/library/mdi/)

## Étape 3 — Menu de navigation (~20 min)

### Théorie à présenter

- Vue Router — introduction : [devjs.ch/vue-router/intro](https://devjs.ch/vue-router/intro/)
- `<RouterView>` affiche la page de la route courante
- La prop `to` de Vuetify fonctionne comme `<RouterLink>`

### Ce que les élèves codent dans `App.vue`

**1. Ajouter le drawer** (avant le `v-app-bar`) :

```html
<v-navigation-drawer v-model="drawer" temporary>
  <v-list nav>
    <v-list-item
      v-for="item in navItems"
      :key="item.to"
      :to="item.to"
      :prepend-icon="item.icon"
      :title="item.title"
    />
  </v-list>
</v-navigation-drawer>
```

**2. Ajouter le hamburger** (dans le `v-app-bar`, avant le titre) :

```html
<v-app-bar-nav-icon @click="drawer = !drawer" />
```

**3. Le script** :

```js
import { ref } from 'vue'

const drawer = ref(false)

const navItems = [
  { title: 'Personnages', to: '/', icon: 'mdi-account-group' },
  { title: 'À propos', to: '/about', icon: 'mdi-information' },
]
```

### Points à souligner

- `v-model="drawer"` = binding bidirectionnel (ouvre/ferme le drawer)
- `temporary` = le drawer se superpose au contenu (mode mobile)
- `v-list nav` = style arrondi automatique pour la navigation
- Le router est déjà câblé dans `router/index.js` — montrer le fichier
- `@click="drawer = !drawer"` = expression JS inline dans le template

## Étape 4 — Déploiement sur Vercel (~10 min)

### Théorie à présenter

- Vercel = plateforme de déploiement gratuite pour les projets frontend
- Connexion avec GitHub → déploiement automatique à chaque push
- `npm run build` génère le dossier `dist/` → c'est ça que Vercel sert

### Procédure

1. Aller sur [vercel.com](https://vercel.com) et se connecter avec GitHub
2. Cliquer **Add New → Project**
3. Importer le dépôt `esig-141-demo-vuetify-api`
4. Vercel détecte Vite automatiquement — ne rien changer
5. Cliquer **Deploy**
6. Attendre ~1 min → l'URL de production s'affiche

### Points à souligner

- Chaque `git push` déclenche un nouveau déploiement automatique
- L'URL est publique et accessible depuis un téléphone → tester le responsive
- Vercel gère le HTTPS automatiquement
- C'est gratuit pour les projets personnels (Hobby plan)

## Vérification finale

- [ ] Page `/` : grille de 20 personnages avec images et chips colorés
- [ ] Page `/about` : 2 cards avec infos et liste stack technique
- [ ] Hamburger → ouvre le drawer → clic sur un lien → navigue + ferme le drawer
- [ ] Zéro erreur dans la console du navigateur (F12)

## Liens utiles

| Ressource | URL |
|-----------|-----|
| API Rick and Morty | https://rickandmortyapi.com |
| Vuetify — tous les composants | https://vuetifyjs.com/en/components/all/ |
| Icônes MDI | https://pictogrammers.com/library/mdi/ |
| Vue.js — bases | https://devjs.ch/vue/bases/ |
| API — introduction | https://devjs.ch/api/introduction/ |
| API — utilisation | https://devjs.ch/api/utilisation-en-projet/ |
| Vue Router — intro | https://devjs.ch/vue-router/intro/ |
