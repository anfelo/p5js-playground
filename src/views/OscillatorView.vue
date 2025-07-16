<script setup lang="ts">
import { onMounted, ref } from 'vue'
import p5 from 'p5'
import { Oscillator } from '@/entities/oscillator'
import { Attractor } from '@/entities/attractor'

const canvasWrapperElement = ref('div')
const p5ElementRef = ref<HTMLElement | null>(null)

const canvasWidth = 800
const canvasHeight = 400

const mySketch = function (p: p5) {
  let attractor: Attractor
  let oscillators: Oscillator[] = []

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)
    attractor = new Attractor(p)

    for (let i = 0; i < 10; i++) {
      oscillators[i] = new Oscillator(p)
    }
  }

  p.draw = function () {
    p.background('#09090b')
    for (let i = 0; i < oscillators.length; i++) {
      oscillators[i].update()
      oscillators[i].show()
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
