<script setup lang="ts">
import { onMounted, ref } from 'vue'
import p5 from 'p5'
import { Vehicle } from '@/entities/vehicle'

const canvasWrapperElement = ref('div')
const p5ElementRef = ref<HTMLElement | null>(null)

const canvasWidth = 800
const canvasHeight = 400

const mySketch = function (p: p5) {
  let vehicles: Vehicle[]

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)
    vehicles = []
    for (let i = 0; i < 100; i++) {
      vehicles.push(new Vehicle(p, p.random(p.width), p.random(p.height), 2, 0.2))
    }
  }

  p.draw = function () {
    p.background('#09090b')

    for (let vehicle of vehicles) {
      vehicle.applyBehaviors(vehicles)
      vehicle.update()
      vehicle.show()
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
