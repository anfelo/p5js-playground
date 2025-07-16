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
  let particle: Particle

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)
    particle = new Particle(p, p.width / 2, 20)
  }

  p.draw = function () {
    p.background('#09090b')
    particle.update()
    particle.show()

    let gravity = createVector2(0, 0.1)
    particle.applyForce(gravity)
    if (particle.isDead()) {
      particle = new Particle(p, p.width / 2, 20)
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

<
