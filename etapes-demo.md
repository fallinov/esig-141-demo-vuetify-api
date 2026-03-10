# Étapes de la démo — Rick & Morty Explorer

Code de départ : branche [`main`](https://github.com/fallinov/esig-141-demo-vuetify-api/tree/main) | Solution : branche [`solution`](https://github.com/fallinov/esig-141-demo-vuetify-api/tree/solution)

| Étape | Durée | Contenu |
|-------|-------|---------|
| 0. Config Vuetify | ~5 min | Palette de couleurs Rick & Morty + favicon |
| 1. Découvrir l'API | ~15 min | Requête GET dans Bruno, explorer le JSON |
| 2. Appel API + affichage | ~30 min | `fetch()`, `v-card`, `v-img`, `v-chip` |
| 3. Page À propos | ~15 min | Page statique avec composants Vuetify |
| 4. Menu de navigation | ~20 min | `v-navigation-drawer`, hamburger, routage |
| 5. Déploiement Vercel | ~10 min | Import GitHub, deploy, test mobile |
| 6. Fiche de détail (bonus) | ~15 min | Route dynamique, `useRoute()`, 2ème fetch |
| **Total** | **~1h35** | **+15 min si bonus** |

## Prérequis

- Node.js installé
- Projet cloné et ouvert dans WebStorm
- `npm install` effectué
- `npm run dev` lancé → [http://localhost:3000](http://localhost:3000)

## Configuration initiale — Palette de couleurs Rick & Morty

Dans [`src/plugins/vuetify.js`](src/plugins/vuetify.js), **remplacer tout le contenu du fichier** par :

```js
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#00B5CC',    // Bleu turquoise (portail, logo R&M)
          secondary: '#97CE4C',  // Vert portail/slime
          accent: '#F2E94E',     // Jaune (cheveux Morty)
          error: '#E63946',      // Rouge (lasers, danger)
          info: '#44CFCB',       // Cyan clair
          success: '#97CE4C',    // Vert (même que secondary)
          warning: '#FFA724',    // Orange
        },
      },
    },
  },
})
```

Cette palette personnalisée s'applique automatiquement à tous les composants Vuetify (`v-btn`, `v-card`, `v-chip`, etc.).

### Favicon du projet

Le fichier [`public/favicon.png`](public/favicon.png) contient les silhouettes de Rick & Morty (icône officielle de l'API).

Dans [`index.html`](index.html), remplacer la balise `<link rel="icon">` existante par :

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" href="/favicon.png">
```

### Points à souligner

- Le favicon est l'icône affichée dans l'onglet du navigateur — un détail de finition important
- Deux formats : `.ico` (compatibilité anciens navigateurs) et `.png` (navigateurs modernes)
- Les fichiers dans `public/` sont servis tels quels à la racine du site par Vite

## Étape 1 — Découvrir l'API avec Bruno (~15 min)

### Théorie à présenter

- Qu'est-ce qu'une API REST : [devjs.ch/api/introduction](https://devjs.ch/api/introduction)
- Tester une API avant de coder : [devjs.ch/api/tester-son-api](https://devjs.ch/api/tester-son-api)

### Démo avec Bruno (ou Postman)

1. Ouvrir Bruno → **New Request**
2. Méthode **GET**, URL : `https://rickandmortyapi.com/api/character`
3. Cliquer **Send** → observer le code **200 OK** et la réponse JSON
4. Explorer la structure de la réponse :
   - `info` : métadonnées (count, pages, next, prev)
   - `results` : tableau de 20 personnages
5. Déplier un objet dans `results` → identifier les champs utiles :
   - `id`, `name`, `status`, `species`, `image` (URL d'une image)
6. Tester un personnage seul : `https://rickandmortyapi.com/api/character/1`
   - Montrer que c'est le même objet qu'un élément de `results`
7. Tester une URL invalide : `https://rickandmortyapi.com/api/character/99999`
   - Montrer le code **404** et le message d'erreur

### Points à souligner

- **Toujours tester l'API avant de coder** — on vérifie la structure du JSON
- Méthode GET = récupérer des données (lecture seule)
- Code HTTP **200** = succès, **404** = non trouvé
- La réponse est du **JSON** — JavaScript sait le lire nativement avec `response.json()`
- Pas besoin de clé d'API ici — l'API Rick and Morty est ouverte

## Étape 2 — Appel API et affichage des personnages (~30 min)

### Théorie à présenter

- `async/await`, `try/catch`, `fetch()` : [devjs.ch/api/utilisation-en-projet](https://devjs.ch/api/utilisation-en-projet)
- `ref()`, `onMounted` : [devjs.ch/vue/bases](https://devjs.ch/vue/bases)

### Rappel de la structure JSON (vue dans Bruno)

```
{ info: { count: 826, pages: 42 }, results: [ { id, name, status, species, image, ... }, ... ] }
```

On veut `data.results` — le tableau de personnages.

### Ce que les élèves codent dans [`HomePage.vue`](src/pages/HomePage.vue)

**1. Le fetch** — dans le bloc `try` existant du `onMounted` (remplacer le commentaire TODO) :

```js
const response = await fetch('https://rickandmortyapi.com/api/character')

if (!response.ok) {
  throw new Error(`Erreur HTTP ${response.status}`)
}

const data = await response.json()
characters.value = data.results
```

> **Vérification** : recharger la page → le texte doit afficher « 20 personnage(s) chargé(s) ». Si ça affiche 0, vérifier que `characters.value` a bien le `.value`.

**2. La fonction `statusColor`** — avant le `onMounted` :

```js
function statusColor(status) {
  const colors = { Alive: 'green', Dead: 'red', unknown: 'grey' }
  return colors[status] || 'grey'
}
```

**3. Les cards** — dans le `<v-row>`, remplacer le `<v-col>` existant (celui avec le TODO) :

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

> **Vérification** : recharger la page → les 20 personnages s'affichent en grille avec leurs images et chips colorés.

### Erreurs fréquentes

| Symptôme | Cause probable | Solution |
|----------|---------------|----------|
| « 0 personnage(s) chargé(s) » | Oubli de `.value` | Écrire `characters.value = data.results` (pas `characters = data.results`) |
| Chip toujours grise | Oubli des `:` devant `color` | Écrire `:color="..."` (avec les deux-points), pas `color="..."` |
| Erreur « key is required » | Oubli de `:key` | Ajouter `:key="character.id"` sur le `<v-col>` du `v-for` |
| Image ne s'affiche pas | Oubli des `:` devant `src` | Écrire `:src="character.image"` (binding), pas `src="character.image"` (texte) |

### Points à souligner

- Le pattern **loading / error / data** avec `v-if / v-else-if / v-else` — déjà en place dans le template ([`v-progress-circular`](https://vuetifyjs.com/en/components/progress-circular/), [`v-alert`](https://vuetifyjs.com/en/components/alerts/))
- `fetch()` retourne une **promesse** → on utilise `await` pour attendre la réponse
- `response.ok` vérifie que le code HTTP est 200-299 (pas une erreur)
- `response.json()` transforme le texte JSON en objet JavaScript
- `v-for` avec `:key` obligatoire — Vue a besoin d'identifier chaque élément
- [`v-card`](https://vuetifyjs.com/en/components/cards/) = conteneur avec title, text, actions
- [`v-img`](https://vuetifyjs.com/en/components/images/) avec `cover` pour uniformiser les tailles d'images
- [`v-chip`](https://vuetifyjs.com/en/components/chips/) avec `:color` dynamique — le `:` indique un binding JavaScript

## Étape 3 — Page À propos (~15 min)

### Théorie à présenter

- Composants Vuetify : [vuetifyjs.com/components/all](https://vuetifyjs.com/en/components/all/)
- SFC (Single File Component) : [devjs.ch/vue/anatomie](https://devjs.ch/vue/anatomie)

### Ce que les élèves codent dans [`AboutPage.vue`](src/pages/AboutPage.vue)

Page 100% statique — le `<script setup>` reste vide, on ne travaille que dans le `<template>`.

Ajouter dans le `<v-container>`, après le `<h1>` :

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

- Pas de JavaScript nécessaire pour une page statique — le `<script setup>` reste vide
- [`v-card`](https://vuetifyjs.com/en/components/cards/) = conteneur principal Vuetify (title, subtitle, text, actions)
- [`v-icon`](https://vuetifyjs.com/en/components/icons/) pour afficher des icônes MDI
- [`v-list`](https://vuetifyjs.com/en/components/lists/) / `v-list-item` avec `prepend-icon`, `title`, `subtitle` — tout déclaratif, zéro JS
- Icônes MDI : catalogue sur [pictogrammers.com/library/mdi](https://pictogrammers.com/library/mdi/)
- Tester la navigation : taper `/about` dans la barre d'adresse → la page s'affiche

## Étape 4 — Menu de navigation (~20 min)

### Théorie à présenter

- Vue Router — introduction : [devjs.ch/vue-router/intro](https://devjs.ch/vue-router/intro)
- `<RouterView>` dans [`App.vue`](src/App.vue) affiche le composant de la route courante
- Montrer [`router/index.js`](src/router/index.js) — les 2 routes sont déjà câblées

### Ce que les élèves codent dans [`App.vue`](src/App.vue)

**1. Ajouter le drawer** — dans le `<template>`, juste avant le `<v-app-bar>` :

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

**2. Ajouter le hamburger** — dans le `<v-app-bar>`, juste avant `<v-app-bar-title>` :

```html
<v-app-bar-nav-icon @click="drawer = !drawer" />
```

**3. Rendre le titre cliquable** — remplacer le contenu de `<v-app-bar-title>` :

```html
<v-app-bar-title>
  <RouterLink to="/" class="text-decoration-none d-flex align-center" style="color: inherit">
    <v-icon icon="mdi-alien" class="mr-2" />
    Rick & Morty Explorer
  </RouterLink>
</v-app-bar-title>
```

**4. Le script** — remplacer le contenu de `<script setup>` :

```js
import { ref } from 'vue'

const drawer = ref(false)
const currentYear = new Date().getFullYear()

const navItems = [
  { title: 'Personnages', to: '/', icon: 'mdi-account-group' },
  { title: 'À propos', to: '/about', icon: 'mdi-information' },
]
```

> **Vérification** : recharger la page → cliquer sur le hamburger ☰ → le menu s'ouvre → cliquer sur « À propos » → la page change et le drawer se ferme.

### Erreurs fréquentes

| Symptôme | Cause probable | Solution |
|----------|---------------|----------|
| Le drawer ne s'ouvre pas | `drawer` pas déclaré dans le script | Vérifier que `const drawer = ref(false)` est bien dans `<script setup>` |
| Le hamburger n'apparaît pas | Mauvais emplacement | Le `<v-app-bar-nav-icon>` doit être **dans** le `<v-app-bar>`, avant le `<v-app-bar-title>` |
| Erreur sur `navItems` | Oubli de la déclaration | Vérifier que le tableau `navItems` est dans le `<script setup>` |

### Points à souligner

- [`v-navigation-drawer`](https://vuetifyjs.com/en/components/navigation-drawers/) avec `v-model="drawer"` = binding bidirectionnel (ouvre/ferme le drawer)
- `temporary` = le drawer se superpose au contenu (comportement mobile)
- [`v-app-bar`](https://vuetifyjs.com/en/components/app-bars/) contient le hamburger et le titre
- La prop `to` de Vuetify fonctionne comme `<RouterLink>` — pas besoin d'importer le composant
- `@click="drawer = !drawer"` = expression JS inline, inverse le booléen à chaque clic
- `<RouterLink to="/">` sur le titre = clic sur le logo ramène à l'accueil (convention UX courante)
- L'item actif est automatiquement mis en surbrillance par Vue Router

### Résultat final — `App.vue` complet

Pour vérifier son code, l'élève peut comparer avec le fichier complet :

```vue
<template>
  <v-app>
    <!-- Menu de navigation latéral -->
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

    <!-- Barre de navigation -->
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-app-bar-title>
        <RouterLink to="/" class="text-decoration-none d-flex align-center" style="color: inherit">
          <v-icon icon="mdi-alien" class="mr-2" />
          Rick & Morty Explorer
        </RouterLink>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>

    <v-footer class="text-center">
      <v-col>
        Démo C141 — ESIG {{ currentYear }} —
        API
        <a href="https://rickandmortyapi.com" target="_blank" rel="noopener noreferrer" class="text-primary">
          rickandmortyapi.com
        </a>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
const currentYear = new Date().getFullYear()

const navItems = [
  { title: 'Personnages', to: '/', icon: 'mdi-account-group' },
  { title: 'À propos', to: '/about', icon: 'mdi-information' },
]
</script>
```

## Étape 5 — Déploiement sur Vercel (~10 min)

### Théorie à présenter

- Vercel = plateforme de déploiement gratuite pour les projets frontend
- Connexion avec GitHub → déploiement automatique à chaque `git push`
- `npm run build` génère le dossier `dist/` → c'est ce que Vercel sert en production

### Procédure

1. Aller sur [vercel.com](https://vercel.com) et se connecter avec GitHub
2. Cliquer **Add New → Project**
3. Importer le dépôt `esig-141-demo-vuetify-api`
4. Vercel détecte Vite automatiquement — ne rien changer
5. Cliquer **Deploy**
6. Attendre ~1 min → l'URL de production s'affiche
7. Ouvrir l'URL sur son téléphone → vérifier le responsive

### Points à souligner

- Chaque `git push` déclenche un nouveau déploiement automatique
- L'URL est publique et accessible depuis n'importe quel appareil
- Vercel gère le HTTPS automatiquement
- C'est gratuit pour les projets personnels (Hobby plan)

## Étape 6 — Fiche de détail d'un personnage (bonus, si le temps le permet)

### Concepts introduits

- **Route dynamique** : `/character/:id` avec un paramètre dans l'URL
- `useRoute()` pour récupérer les paramètres de la route
- 2ème appel API : `fetch()` avec un `id` dynamique

### 1. Créer le fichier [`src/pages/CharacterPage.vue`](src/pages/CharacterPage.vue)

```vue
<template>
  <v-container>
    <!-- Chargement -->
    <div v-if="loading" class="d-flex justify-center my-8">
      <v-progress-circular indeterminate color="primary" size="64" />
    </div>

    <!-- Erreur -->
    <v-alert v-else-if="error" type="error" class="my-4">
      {{ error }}
    </v-alert>

    <!-- Détail du personnage -->
    <template v-else>
      <v-btn to="/" variant="text" class="mb-4">
        <v-icon icon="mdi-arrow-left" class="mr-1" />
        Retour à la liste
      </v-btn>

      <v-row>
        <v-col cols="12" md="4">
          <v-img :src="character.image" :alt="character.name" rounded="lg" />
        </v-col>

        <v-col cols="12" md="8">
          <h1 class="text-h3 mb-4">{{ character.name }}</h1>

          <v-chip :color="statusColor(character.status)" class="mr-2 mb-4">
            {{ character.status }}
          </v-chip>
          <v-chip class="mb-4" variant="outlined">
            {{ character.species }}
          </v-chip>

          <v-list lines="two">
            <v-list-item prepend-icon="mdi-gender-male-female">
              <v-list-item-title>Genre</v-list-item-title>
              <v-list-item-subtitle>{{ character.gender }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item prepend-icon="mdi-earth">
              <v-list-item-title>Origine</v-list-item-title>
              <v-list-item-subtitle>{{ character.origin?.name }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item prepend-icon="mdi-map-marker">
              <v-list-item-title>Localisation</v-list-item-title>
              <v-list-item-subtitle>{{ character.location?.name }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item prepend-icon="mdi-television">
              <v-list-item-title>Épisodes</v-list-item-title>
              <v-list-item-subtitle>Apparaît dans {{ character.episode?.length }} épisode(s)</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const character = ref(null)
const loading = ref(true)
const error = ref(null)

function statusColor(status) {
  const colors = { Alive: 'green', Dead: 'red', unknown: 'grey' }
  return colors[status] || 'grey'
}

onMounted(async () => {
  try {
    const id = route.params.id
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`)
    }

    character.value = await response.json()
  } catch (err) {
    error.value = `Impossible de charger le personnage : ${err.message}`
  } finally {
    loading.value = false
  }
})
</script>
```

### 2. Ajouter la route dans [`router/index.js`](src/router/index.js)

```js
import CharacterPage from '@/pages/CharacterPage.vue'

// Ajouter dans le tableau routes :
{
  path: '/character/:id',
  name: 'character',
  component: CharacterPage,
}
```

> **Vérification** : taper `http://localhost:3000/character/1` dans la barre d'adresse → la fiche de Rick Sanchez s'affiche avec son image, son statut et ses infos. Si ça ne marche pas, vérifier que la route et l'import sont bien ajoutés dans `router/index.js`.

### 3. Rendre les cards cliquables dans [`HomePage.vue`](src/pages/HomePage.vue)

Ajouter la prop `to` et `hover` sur chaque `<v-card>` :

```html
<!-- Avant -->
<v-card class="h-100">

<!-- Après -->
<v-card :to="`/character/${character.id}`" class="h-100" hover>
```

> **Vérification** : retourner sur la page d'accueil → cliquer sur une card → la fiche du personnage s'affiche → cliquer « Retour à la liste » → on revient à la grille.

### Points à souligner

- `:id` dans la route = **paramètre dynamique** — la valeur change selon l'URL
- `useRoute().params.id` récupère la valeur du paramètre (ex : `1` pour `/character/1`)
- Template literals `` `...${id}` `` pour construire l'URL dynamiquement
- `?.` (optional chaining) pour éviter les erreurs si `origin` ou `location` est `null`
- La prop `to` sur [`v-card`](https://vuetifyjs.com/en/components/cards/) la rend cliquable comme un lien — pas besoin de `@click`
- `hover` ajoute un effet visuel au survol pour indiquer que la card est cliquable
- [`v-btn`](https://vuetifyjs.com/en/components/buttons/) avec `to="/"` pour le bouton retour

## Vérification finale

- [ ] Page `/` : grille de 20 personnages avec images et chips colorés
- [ ] Page `/about` : 2 cards avec infos et liste de la stack technique
- [ ] Hamburger → ouvre le drawer → clic sur un lien → navigue et ferme le drawer
- [ ] Zéro erreur dans la console du navigateur (F12)
- [ ] App déployée sur Vercel et accessible depuis un téléphone
- [ ] (Bonus) Clic sur une card → fiche détaillée du personnage
- [ ] (Bonus) Bouton retour → revient à la liste

## Liens utiles

| Ressource | URL |
|-----------|-----|
| API Rick and Morty | [rickandmortyapi.com](https://rickandmortyapi.com) |
| API — documentation | [rickandmortyapi.com/documentation](https://rickandmortyapi.com/documentation) |
| Vuetify — tous les composants | [vuetifyjs.com/components/all](https://vuetifyjs.com/en/components/all/) |
| Icônes MDI | [pictogrammers.com/library/mdi](https://pictogrammers.com/library/mdi/) |
| Vue.js — bases | [devjs.ch/vue/bases](https://devjs.ch/vue/bases) |
| API — introduction | [devjs.ch/api/introduction](https://devjs.ch/api/introduction) |
| API — tester son API | [devjs.ch/api/tester-son-api](https://devjs.ch/api/tester-son-api) |
| API — utilisation en projet | [devjs.ch/api/utilisation-en-projet](https://devjs.ch/api/utilisation-en-projet) |
| Vue Router — introduction | [devjs.ch/vue-router/intro](https://devjs.ch/vue-router/intro) |
