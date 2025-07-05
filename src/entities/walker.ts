import p5 from 'p5'

export class Walker {
  x: number
  y: number
  p: p5
  tx: number
  ty: number

  constructor(p: p5) {
    this.x = p.width / 2
    this.y = p.height / 2
    this.p = p

    this.tx = 0
    this.ty = 10000
  }

  show() {
    this.p.stroke(245)
    this.p.point(this.x, this.y)
  }

  step() {
    // const xstep = this.p.floor(this.p.random(3)) - 1;
    // const ystep = this.p.floor(this.p.random(3)) - 1;

    // With Perlin Noise
    const xstep = this.p.map(this.p.noise(this.tx), 0, 1, 0, this.p.width)
    const ystep = this.p.map(this.p.noise(this.ty), 0, 1, 0, this.p.height)

    this.x = xstep
    this.y = ystep

    this.tx += 0.01
    this.ty += 0.01
  }
}
