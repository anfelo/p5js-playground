<script setup lang="ts">
import { onMounted, ref } from 'vue'
import p5 from 'p5'
import { Vehicle } from '@/entities/vehicle'
import { Path } from '@/entities/path'

const canvasWrapperElement = ref('div')
const p5ElementRef = ref<HTMLElement | null>(null)

const canvasWidth = 800
const canvasHeight = 400

const mySketch = function (p: p5) {
  let path: Path
  let vehicle: Vehicle

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)
    path = new Path(p)
    path.addPoint(0, p.height / 3)
    path.addPoint(p.width, (2 * p.height) / 3)

    vehicle = new Vehicle(p, 0, 0, 2, 0.2)
  }

  p.draw = function () {
    p.background('#09090b')

    path.show()

    vehicle.seek(path.points[path.points.length - 1])
    vehicle.followPath(path)
    vehicle.update()
    vehicle.show()
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
