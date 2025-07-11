import { createRouter, createWebHistory } from 'vue-router'
import WalkerView from '@/views/WalkerView.vue'
import BodyView from '@/views/BodyView.vue'
import LiquidView from '@/views/LiquidView.vue'
import OscillatorView from '@/views/OscillatorView.vue'
import WaveView from '@/views/WaveView.vue'
import SpringView from '@/views/SpringView.vue'
import PendulumView from '@/views/PendulumView.vue'

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
    {
      path: '/wave',
      name: 'wave',
      component: WaveView,
    },
    {
      path: '/spring',
      name: 'spring',
      component: SpringView,
    },
    {
      path: '/pendulum',
      name: 'pendulum',
      component: PendulumView,
    },
  ],
})

export default router
