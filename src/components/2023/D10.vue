<template>
  <div>
    <V10
      v-if="subProps.finished"
      :enclosed="subProps.enclosed"
      :grid="subProps.grid"
      :path="subProps.path"
      :start="subProps.start"
    />
  </div>
</template>

<script lang="ts" setup>
  import { Position2d } from '@/plugins/types/Position2d'
  import V10 from '@/components/2023/V10.vue'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface Map {
    [key: string]: Function
  }

  const subProps = ref({
    finished: false,
    grid: [[]] as string[][],
    enclosed: [] as Position2d[],
    path: [] as Position2d[],
    start: { x: 0, y: 0 } as Position2d,
  })

  let grid: string[][]
  const dirs: number[][] = [[-1, 0], [1, 0], [0, -1], [0, 1]]
  const pipes: Map = {
    L: (from: Position2d, pipe: Position2d) => (from.x === pipe.x && from.y === (pipe.y - 1)) || (from.y === pipe.y && from.x === (pipe.x + 1)),
    J: (from: Position2d, pipe: Position2d) => (from.x === pipe.x && from.y === (pipe.y - 1)) || (from.y === pipe.y && from.x === (pipe.x - 1)),
    7: (from: Position2d, pipe: Position2d) => (from.x === pipe.x && from.y === (pipe.y + 1)) || (from.y === pipe.y && from.x === (pipe.x - 1)),
    F: (from: Position2d, pipe: Position2d) => (from.x === pipe.x && from.y === (pipe.y + 1)) || (from.y === pipe.y && from.x === (pipe.x + 1)),
    '|': (from: Position2d, pipe: Position2d) => (from.x === pipe.x && from.y === (pipe.y - 1)) || (from.x === pipe.x && from.y === (pipe.y + 1)),
    '-': (from: Position2d, pipe: Position2d) => (from.y === pipe.y && from.x === (pipe.x - 1)) || (from.y === pipe.y && from.x === (pipe.x + 1)),
    S: (from: Position2d, pipe: Position2d) => true,
  }

  const getNeighbors = (current: Position2d) => {
    return dirs.map(d => { return { x: current.x + d[0], y: current.y + d[1] } }).filter(d => d.x >= 0 && d.x < grid[0].length && d.y >= 0 && d.y < grid.length)
  }
  const fixStart = (circuit: Position2d[]) => {
    const start = circuit[0]
    const next = circuit[1]
    const prev = circuit[circuit.length - 1]

    if (prev.x === start.x && start.x === next.x) {
      grid[start.y][start.x] = '|'
    } else if (prev.y === start.y && start.y === next.y) {
      grid[start.y][start.x] = '-'
    } else if (((prev.x === start.x + 1) && (next.y === start.y + 1)) || ((next.x === start.x + 1) && (prev.y === start.y + 1))) {
      grid[start.y][start.x] = 'F'
    } else if (((prev.x === start.x - 1) && (next.y === start.y + 1)) || ((next.x === start.x - 1) && (prev.y === start.y + 1))) {
      grid[start.y][start.x] = '7'
    } else if (((prev.x === start.x + 1) && (next.y === start.y - 1)) || ((next.x === start.x + 1) && (prev.y === start.y - 1))) {
      grid[start.y][start.x] = 'L'
    } else if (((prev.x === start.x - 1) && (next.y === start.y - 1)) || ((next.x === start.x - 1) && (prev.y === start.y - 1))) {
      grid[start.y][start.x] = 'J'
    }
  }
  const findEnclosed = (circuit: Position2d[]) => {
    const mapped = new Map()
    circuit.forEach((p, i) => {
      mapped.set(`${p.x}|${p.y}`, i)
    })
    const result: Position2d[] = []
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (!mapped.has(`${col}|${row}`)) {
          let enclosed = false
          let x = col

          while (x >= 0) {
            const index = mapped.get(`${x}|${row}`)
            const pipe = grid[row][x]
            if (index !== undefined && (pipe === '|' || pipe === 'F' || pipe === '7')) {
              enclosed = !enclosed
            }

            x--
          }

          if (enclosed) {
            result.push({ x: col, y: row })
          }
        }
      }
    }
    return result
  }

  const run = () => {
    if (props.input) {
      grid = props.input.map((i: string) => i.split(''))

      let start: Position2d = { x: 0, y: 0 }

      props.input.forEach((r: string, ri: number) => {
        const sIndex = r.indexOf('S')

        if (sIndex !== -1) {
          start = { x: sIndex, y: ri }
        }
      })

      const circuit: Position2d[] = []
      const visited = new Set<string>()
      let current: Position2d = start

      while (true) {
        circuit.push(current)
        visited.add(`${current.x},${current.y}`)

        const currPipe = grid[current.y][current.x]
        const neighbors: Position2d[] = getNeighbors(current)

        const matches = neighbors.filter((n: Position2d) => {
          const pipe = grid[n.y][n.x]

          if (visited.has(`${n.x},${n.y}`)) {
            return false
          } else if (n.x === start.x && n.y === start.y) {
            return true
          } else if (pipe === '.') {
            return false
          } else {
            return pipes[pipe](current, n) && pipes[currPipe](n, current)
          }
        })

        if (matches.length > 0) {
          current = matches[0]
        } else {
          break
        }
      }

      fixStart(circuit)

      const pOne = Math.floor(circuit.length / 2)
      const enclosed: Position2d[] = findEnclosed(circuit)
      const pTwo = enclosed.length

      emit('onFinished', pOne, pTwo)

      subProps.value = {
        finished: true,
        grid,
        enclosed,
        path: circuit,
        start,
      }
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style scoped>
</style>
