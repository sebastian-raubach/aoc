const mod = (a, b) => {
  return ((a % b) + b) % b
}

const transpose = matrix => {
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

const rotateRight = grid => {
  const result = []
  grid.forEach((a, i, aa) => {
    a.forEach((b, j) => {
      result[j] = result[j] || []
      result[j][aa.length - i - 1] = b
    })
  })
  return result
}

const permutate = inputArr => {
  const result = []

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice()
        const next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result
}

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b)
const lcmInternal = (a, b) => a / gcd(a, b) * b
const lcmAll = ns => ns.reduce(lcmInternal, 1)

const lcm = values => lcmAll(values)

const manhattan = (a, b) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

export {
  mod,
  transpose,
  rotateRight,
  permutate,
  lcm,
  manhattan,
}
