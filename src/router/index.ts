import { createRouter, createWebHistory } from 'vue-router'
import WalkerView from '@/views/WalkerView.vue'
import BodyView from '@/views/BodyView.vue'
import LiquidView from '@/views/LiquidView.vue'
import OscillatorView from '@/views/OscillatorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/walker',
      name: 'walker',
      component: WalkerView,
    },
    {
      path: '/body',
      name: 'body',
      component: BodyView,
    },
    {
      path: '/liquid',
      name: 'liquid',
      component: LiquidView,
    },
    {
      path: '/oscillator',
      name: 'oscillator',
      component: OscillatorView,
    },
  ],
})

export default router
