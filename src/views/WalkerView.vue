<script setup lang="ts">
import { onMounted, ref } from 'vue'
import p5 from 'p5'
import { Walker } from '@/entities/walker'

const canvasWrapperElement = ref('div')
const p5ElementRef = ref<HTMLElement | null>(null)

const canvasWidth = 800
const canvasHeight = 400

const mySketch = function (p: p5) {
  let walker: Walker

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)
    walker = new Walker(p)
  }

  p.draw = function () {
    walker.step()
    walker.show()
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
