<script setup lang="ts">
import { onMounted, ref } from 'vue'
import p5 from 'p5'
import { Emitter } from '@/entities/emitter'
import { type Vector2, vector2Mag, createVector2 } from '@/utils/lalg'

const canvasWrapperElement = ref('div')
const p5ElementRef = ref<HTMLElement | null>(null)

const canvasWidth = 800
const canvasHeight = 400

const mySketch = function (p: p5) {
  let emitter: Emitter
  let smokeImg: p5.Image

  p.preload = function () {
    smokeImg = p.loadImage('/img/smoke.png')
  }

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight)
    emitter = new Emitter(p, p.width / 2, p.height, smokeImg)
  }

  p.draw = function () {
    p.background('#09090b')

    let dx = p.map(p.mouseX, 0, p.width, -0.2, 0.2)
    let wind = createVector2(dx, 0)

    emitter.applyForce(wind)
    emitter.run()
    emitter.addParticle()

    // Draw an arrow representing the wind force
    // drawVector(wind, createVector2(p.width / 2, 50), 500)
  }

  // Renders a vector object 'v' as an arrow and a position 'loc'
  function drawVector(v: Vector2, pos: Vector2, scayl: number) {
    p.push()
    let arrowsize = 4
    // Translate to position to render vector
    p.translate(pos.x, pos.y)
    p.stroke(255)
    // Call vector heading function to get direction (note that pointing up is a heading of 0) and rotate
    // p.rotate(v.heading())
    // Calculate length of vector & scale it to be bigger or smaller if necessary
    let len = vector2Mag(v) * scayl
    // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
    p.line(0, 0, len, 0)
    p.line(len, 0, len - arrowsize, +arrowsize / 2)
    p.line(len, 0, len - arrowsize, -arrowsize / 2)
    p.pop()
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
