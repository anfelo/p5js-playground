import { createRouter, createWebHistory } from 'vue-router'
import WalkerView from '@/views/WalkerView.vue'
import BodyView from '@/views/BodyView.vue'
import LiquidView from '@/views/LiquidView.vue'
import OscillatorView from '@/views/OscillatorView.vue'
import WaveView from '@/views/WaveView.vue'
import SpringView from '@/views/SpringView.vue'
import PendulumView from '@/views/PendulumView.vue'
import ButterflyView from '@/views/ButterflyView.vue'
import FollowerView from '@/views/FollowerView.vue'
import SingleParticleView from '@/views/SingleParticleView.vue'
import MultipleParticlesView from '@/views/MultipleParticlesView.vue'
import EmittersView from '@/views/EmittersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/walker',
      name: 'walker',
      component: WalkerView,
    },
    {
      path: '/follower',
      name: 'follower',
      component: FollowerView,
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
    {
      path: '/butterfly',
      name: 'butterfly',
      component: ButterflyView,
    },
    {
      path: '/single-particle',
      name: 'single-particle',
      component: SingleParticleView,
    },
    {
      path: '/multiple-particles',
      name: 'multiple-particles',
      component: MultipleParticlesView,
    },
    {
      path: '/emitters',
      name: 'emitters',
      component: EmittersView,
    },
  ],
})

export default router
