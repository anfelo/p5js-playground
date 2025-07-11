<script setup lang="ts">
import { onMounted, ref } from 'vue'
import p5 from 'p5'
import { Body } from '@/entities/body'
import { WalkableAttractor } from '@/entities/attractor'

const canvasWrapperElement = ref('div')
const p5ElementRef = ref<HTMLElement | null>(null)

const canvasWidth = 800
const canvasHeight = 400

const mySketch = function (p: p5) {
  let attractor: WalkableAttractor
  let butterflies: Body[] = []

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)
    attractor = new WalkableAttractor(p)

    for (let i = 0; i < 1; i++) {
      butterflies[i] = new Body(p, 320, 40, 1)
    }
  }

  p.draw = function () {
    p.background('#181818')

    attractor.step()

    for (let i = 0; i < butterflies.length; i++) {
      const force = attractor.attract(butterflies[i])

      butterflies[i].applyForce(force)
      butterflies[i].update()
      butterflies[i].show()
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
