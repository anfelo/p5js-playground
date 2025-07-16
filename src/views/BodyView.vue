<script setup lang="ts">
import { onMounted, ref } from 'vue'
import p5 from 'p5'
import { Body } from '@/entities/body'

const canvasWrapperElement = ref('div')
const p5ElementRef = ref<HTMLElement | null>(null)

const canvasWidth = 800
const canvasHeight = 400

const mySketch = function (p: p5) {
  let bodies: Body[] = []

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)

    for (let i = 0; i < 10; i++) {
      bodies[i] = new Body(p, p.random(p.width), p.random(p.height), p.random(0.5, 3))
    }
  }

  p.draw = function () {
    p.background('#09090b')
    for (let i = 0; i < bodies.length; i++) {
      for (let j = 0; j < bodies.length; j++) {
        if (i !== j) {
          let force = bodies[j].attract(bodies[i])
          bodies[i].applyForce(force)
        }
      }
      bodies[i].update()
      bodies[i].show()
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
