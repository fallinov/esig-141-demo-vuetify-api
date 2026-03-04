import { createWebHistory, createRouter } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import CharacterPage from '@/pages/CharacterPage.vue'
import AboutPage from '@/pages/AboutPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/character/:id',
    name: 'character',
    component: CharacterPage,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
