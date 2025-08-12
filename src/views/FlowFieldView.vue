<script setup lang="ts">
import { onMounted, ref } from 'vue'
import p5 from 'p5'
import { Vehicle } from '@/entities/vehicle'
import { FlowField } from '@/entities/flow-field'

const canvasWrapperElement = ref('div')
const p5ElementRef = ref<HTMLElement | null>(null)

const canvasWidth = 800
const canvasHeight = 400

const mySketch = function (p: p5) {
  let flowField: FlowField
  let vehicles: Vehicle[] = []

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)

    flowField = new FlowField(p, 20, p.width, p.height)

    for (let i = 0; i < 120; i++) {
      vehicles.push(
        new Vehicle(p, p.random(p.width), p.random(p.height), p.random(2, 5), p.random(0.1, 0.5)),
      )
    }
  }

  p.draw = function () {
    p.background('#09090b')

    flowField.show()

    for (let i = 0; i < vehicles.length; i++) {
      vehicles[i].follow(flowField)
      vehicles[i].run()
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
