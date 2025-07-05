export type Vector2 = {
  x: number
  y: number
}

export function createVector2(x: number, y: number): Vector2 {
  return { x, y }
}

export function vector2Limit(v: Vector2, limit: number): Vector2 {
  const mag = vector2Mag(v)

  if (mag < limit) {
    return v
  }

  const scale = limit / mag
  return vector2ScalarMul(v, scale)
}

export function vector2Normalize(v: Vector2): Vector2 {
  const mag = vector2Mag(v)

  return vector2ScalarMul(v, 1 / mag)
}

export function vector2Mag(v: Vector2): number {
  return Math.sqrt(v.x * v.x + v.y * v.y)
}

export function vector2Add(v1: Vector2, v2: Vector2): Vector2 {
  return { x: v1.x + v2.x, y: v1.y + v2.y }
}

export function vector2Subtract(v1: Vector2, v2: Vector2): Vector2 {
  return { x: v1.x - v2.x, y: v1.y - v2.y }
}

export function vector2ScalarMul(v: Vector2, scalar: number): Vector2 {
  return { x: v.x * scalar, y: v.y * scalar }
}

export function vector2Copy(v: Vector2): Vector2 {
  return { x: v.x, y: v.y }
}

export function vector2SetMag(v: Vector2, mag: number): Vector2 {
  const normalized = vector2Normalize(v)
  return vector2ScalarMul(normalized, mag)
}
