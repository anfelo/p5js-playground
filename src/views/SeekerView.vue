<script setup lang="ts">
import { onMounted, ref } from 'vue'
import p5 from 'p5'
import { Vehicle } from '@/entities/vehicle'
import { type Vector2, createVector2 } from '@/utils/lalg'

const canvasWrapperElement = ref('div')
const p5ElementRef = ref<HTMLElement | null>(null)

const canvasWidth = 800
const canvasHeight = 400

const mySketch = function (p: p5) {
  let seeker: Vehicle
  let target: Vector2

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)
    seeker = new Vehicle(p, p.width, p.height, 8, 0.2)
    target = createVector2(p.width / 2, p.height / 2)
  }

  p.draw = function () {
    p.background('#09090b')

    p.stroke(245)
    p.strokeWeight(2)
    p.fill(127)
    p.circle(target.x, target.y, 48)

    seeker.seek(target)
    seeker.update()
    seeker.show()
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
