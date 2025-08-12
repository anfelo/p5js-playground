import type { Boid } from "./boid"

export class Flock {
  boids: Boid[]

  constructor() {
    this.boids = []
  }

  run() {
    for (const boid of this.boids) {
      boid.run(this.boids)
    }
  }

  addBoid(boid: Boid) {
    this.boids.push(boid)
  }
}
