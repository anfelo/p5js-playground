<script setup lang="ts">
import { onMounted, ref } from 'vue'
import p5 from 'p5'
import { Particle } from '@/entities/particle'
import { createVector2 } from '@/utils/lalg'

const canvasWrapperElement = ref('div')
const p5ElementRef = ref<HTMLElement | null>(null)

const canvasWidth = 800
const canvasHeight = 400

const mySketch = function (p: p5) {
  let totalParticles = 10
  let particles: Particle[] = []

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)
    for (let i = 0; i < totalParticles; i++) {
      particles[i] = new Particle(p, p.width / 2, 20)
    }
  }

  p.draw = function () {
    p.background('#09090b')
    particles.push(new Particle(p, p.width / 2, 20))

    const gravity = createVector2(0, 0.1)
    for (let i = particles.length - 1; i >= 0; i--) {
      let particle = particles[i]
      particle.applyForce(gravity)
      particle.run()
      if (particle.isDead()) {
        particles.splice(i, 1)
      }
    }
  }
}

onMounted(() => {
  if (!p5ElementRef.value) {
    return
  }

  new p5(mySketch, p5ElementRef.value)
})
</script>

<template>
  <component :is="canvasWrapperElement" ref="p5ElementRef" />
</template>

<style scoped></style>
