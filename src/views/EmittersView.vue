<script setup lang="ts">
import { onMounted, ref } from 'vue'
import p5 from 'p5'
import { Emitter } from '@/entities/emitter'

const canvasWrapperElement = ref('div')
const p5ElementRef = ref<HTMLElement | null>(null)

const canvasWidth = 800
const canvasHeight = 400

const mySketch = function (p: p5) {
  let emitters: Emitter[] = []

  p.mousePressed = function () {
    emitters.push(new Emitter(p, p.mouseX, p.mouseY))
  }

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)
    emitters.push(new Emitter(p, p.width / 2, p.height / 2))
  }

  p.draw = function () {
    p.background('#09090b')
    for (let emitter of emitters) {
      emitter.run()
      emitter.addParticle()
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
