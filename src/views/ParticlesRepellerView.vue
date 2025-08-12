<script setup lang="ts">
import { onMounted, ref } from 'vue'
import p5 from 'p5'
import { Emitter } from '@/entities/emitter'
import { Repeller } from '@/entities/repeller'
import { createVector2 } from '@/utils/lalg'

const canvasWrapperElement = ref('div')
const p5ElementRef = ref<HTMLElement | null>(null)

const canvasWidth = 800
const canvasHeight = 400

const mySketch = function (p: p5) {
  let emitter: Emitter
  let repeller: Repeller

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)
    emitter = new Emitter(p, p.width / 2, 20)
    repeller = new Repeller(p, p.width / 2 - 21, p.height / 2)
  }

  p.draw = function () {
    p.background('#09090b')
    const gravity = createVector2(0, 0.1)

    emitter.applyForce(gravity)
    emitter.applyRepeller(repeller)

    emitter.run()
    emitter.addParticle()
    repeller.show()
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
