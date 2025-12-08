import { Position2d } from '@/plugins/types/Position2d'

const mod = (a: number, b: number) => {
  return ((a % b) + b) % b
}

const transpose = (matrix: any[][]) => {
  const rows = matrix.length
  const cols = matrix[0].length
  const grid = []
  for (let j = 0; j < cols; j++) {
    grid[j] = Array(rows)
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[j][i] = matrix[i][j]
    }
  }
  return grid
}

const rotateRight = (grid: any[][]) => {
  const result: any[] = []
  grid.forEach((a, i, aa) => {
    a.forEach((b, j) => {
      result[j] = result[j] || []
      result[j][aa.length - i - 1] = b
    })
  })
  return result
}

const permutate = (inputArr: any[]) => {
  const result: any[] = []

  const permute = (arr: any[], m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice()
        const next = curr.splice(i, 1)
        // @ts-ignore
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result
}

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b)
const lcmInternal = (a: number, b: number) => a / gcd(a, b) * b
const lcmAll = (ns: number[]) => ns.reduce(lcmInternal, 1)

const lcm = (values: number[]) => lcmAll(values)

const manhattan = (a: Position2d, b: Position2d) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

const euclidean = (a: Position2d, b: Position2d) => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}

const minkowski = (a: number[], b: number[], p: number) => {
  return Math.pow(a.map((aa, ai) => Math.pow(Math.abs(aa - b[ai]), 2)).reduce((aa, bb) => aa + bb), 1 / p)
}

const enumerateBase = (number: number, base: number) => {
  const states = []

  // Convert to decimal
  const maxDecimal = parseInt(`${base - 1}`.repeat(number), base)

  // For every number between 0->decimal
  for (let i = 0; i <= maxDecimal; i++) {
    // Convert to binary, pad with 0, and add to final results
    states.push(i.toString(base).padStart(number, '0').split('').map(Number))
  }

  return states
}

export {
  mod,
  transpose,
  rotateRight,
  permutate,
  lcm,
  manhattan,
  euclidean,
  enumerateBase,
  minkowski,
}
