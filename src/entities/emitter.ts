import type p5 from 'p5'
import { Particle } from './particle'
import { createVector2, type Vector2 } from '@/utils/lalg'
import type { Repeller } from './repeller'

export class Emitter {
  particles: Particle[]
  origin: Vector2

  private p: p5

  constructor(p: p5, x: number, y: number) {
    this.particles = []
    this.origin = createVector2(x, y)
    this.p = p
  }

  addParticle() {
    this.particles.push(new Particle(this.p, this.origin.x, this.origin.y))
  }

  applyForce(force: Vector2) {
    for (const particle of this.particles) {
      particle.applyForce(force)
    }
  }

  applyRepeller(repeller: Repeller) {
    for (const particle of this.particles) {
      const force = repeller.repel(particle)
      particle.applyForce(force)
    }
  }

  run() {
    const length = this.particles.length - 1
    for (let i = length; i >= 0; i--) {
      const particle = this.particles[i]
      particle.run()
      if (particle.isDead()) {
        this.particles.splice(i, 1)
      }
    }
  }
}
