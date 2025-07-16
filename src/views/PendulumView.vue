<script setup lang="ts">
import { onMounted, ref } from 'vue'
import p5 from 'p5'
import { Pendulum } from '@/entities/pendulum'

const canvasWrapperElement = ref('div')
const p5ElementRef = ref<HTMLElement | null>(null)

const canvasWidth = 800
const canvasHeight = 400

const mySketch = function (p: p5) {
  let pendulum: Pendulum

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)
    pendulum = new Pendulum(p, canvasWidth / 2, 10, 175)
  }

  p.draw = function () {
    p.background('#09090b')
    pendulum.update()
    pendulum.show()
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
