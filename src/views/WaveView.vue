<script setup lang="ts">
import { onMounted, ref } from 'vue'
import p5 from 'p5'

const canvasWrapperElement = ref('div')
const p5ElementRef = ref<HTMLElement | null>(null)

const canvasWidth = 800
const canvasHeight = 400

const mySketch = function (p: p5) {
  let startAngle = 0
  let deltaAngle = 0.2

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)
  }

  p.draw = function () {
    p.background('#09090b')
    let angle = startAngle

    for (let x = 0; x <= p.width; x += 24) {
      let y = p.map(p.sin(angle), -1, 1, 0, p.height)
      p.stroke(0)
      p.fill(127, 127)
      p.circle(x, y, 48)
      angle += deltaAngle
    }
    startAngle += 0.02
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
