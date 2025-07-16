<script setup lang="ts">
import { onMounted, ref } from 'vue'
import p5 from 'p5'
import { Liquid } from '@/entities/liquid'
import { Body } from '@/entities/body'
import { createVector2 } from '@/utils/lalg'

const canvasWrapperElement = ref('div')
const p5ElementRef = ref<HTMLElement | null>(null)

const canvasWidth = 800
const canvasHeight = 400

const mySketch = function (p: p5) {
  let movers: Body[] = []
  let liquid: Liquid

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)
    for (let i = 0; i < 9; i++) {
      let mass = p.random(0.1, 5)
      movers[i] = new Body(p, 40 + i * 70, 0, mass)
    }
    liquid = new Liquid(p, 0, p.height / 2, p.width, p.height / 2, 0.1)
  }

  p.draw = function () {
    p.background('#09090b')

    liquid.show()

    for (let i = 0; i < movers.length; i++) {
      if (liquid.contains(movers[i])) {
        let dragForce = liquid.calculateDrag(movers[i])
        movers[i].applyForce(dragForce)
      }

      const gravity = createVector2(0, 0.1 * movers[i].mass)

      movers[i].applyForce(gravity)

      movers[i].update()
      movers[i].show()
      movers[i].checkEdges()
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
