<script setup lang="ts">
import { onMounted, ref } from 'vue'
import p5 from 'p5'
import { Boid } from '@/entities/boid'
import { Flock } from '@/entities/flock'

const canvasWrapperElement = ref('div')
const p5ElementRef = ref<HTMLElement | null>(null)

const canvasWidth = 800
const canvasHeight = 400

const mySketch = function (p: p5) {
  let flock: Flock

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)
    flock = new Flock()

    for (let i = 0; i < 120; i++) {
      const boid = new Boid(p, p.width / 2, p.height / 2, 3, 0.05)
      flock.addBoid(boid)
    }
  }

  p.draw = function () {
    p.background('#09090b')
    flock.run()
  }

  // Add a new boid into the System
  p.mouseDragged = function () {
    flock.addBoid(new Boid(p, p.mouseX, p.mouseY, 3, 0.05))
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
