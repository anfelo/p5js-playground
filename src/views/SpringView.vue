<script setup lang="ts">
import { onMounted, ref } from 'vue'
import p5 from 'p5'
import { Body } from '@/entities/body'
import { createVector2 } from '@/utils/lalg'
import { Spring } from '@/entities/spring'

const canvasWrapperElement = ref('div')
const p5ElementRef = ref<HTMLElement | null>(null)

const canvasWidth = 800
const canvasHeight = 400

const mySketch = function (p: p5) {
  let body: Body
  let spring: Spring

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)
    body = new Body(p, p.width / 2, p.height / 2 + 5, 3)
    spring = new Spring(p, p.width / 2, p.height / 2, 60)
  }

  p.draw = function () {
    p.background('#09090b')
    let gravity = createVector2(0, 1)
    body.applyForce(gravity)

    spring.connect(body)

    body.update()
    body.show()
    spring.show()
    spring.showLine(body)
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
