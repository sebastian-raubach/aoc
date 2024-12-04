<template>
  <v-row>
    <v-col cols="12" md="6">
      <pre class="day-2024-4-code border">
<code v-html="gridOne" />
      </pre>
    </v-col>
    <v-col cols="12" md="6">
      <pre class="day-2024-4-code border">
<code v-html="gridTwo" />
      </pre>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import { createMultiColorGradient, VIRIDIS } from '@/plugins/color';
  import { rotateRight } from '@/plugins/math'
  import { Position2d } from '@/plugins/types/Position2d'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  const gridOne = ref<string>('')
  const gridTwo = ref<string>('')

  const dirs: number[][] = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
  const letters: string[] = ['X', 'M', 'A', 'S']

  // Get all rotations of X-MAS
  let mas: (string | undefined)[][] = [['M', undefined, 'M'], [undefined, 'A', undefined], ['S', undefined, 'S']]
  const mass: (string | undefined)[][][] = [mas]
  for (let i = 0; i < 3; i++) {
    mas = rotateRight(mas)
    mass.push(mas)
  }

  let grid: string[][]
  let pOneGrid: number[][]
  let pTwoGrid: number[][]

  const checkMas = (current: Position2d) => {
    return mass.some(m => {
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          if (m[y][x] !== undefined) {
            if (m[y][x] !== grid[current.y + y][current.x + x]) {
              return false
            }
          }
        }
      }

      return true
    })
  }

  const checkDir = (current: Position2d, dir: number[], letterIndex: number) => {
    if (letterIndex >= letters.length) {
      // Full word found
      return true
    }

    const next = { x: current.x + dir[0], y: current.y + dir[1] }

    if (next.x < 0 || next.x >= grid[0].length || next.y < 0 || next.y >= grid.length) {
      // Out of bounds
      return false
    }

    if (grid[next.y][next.x] === letters[letterIndex]) {
      // Check next letter
      return checkDir(next, dir, letterIndex + 1)
    }

    return false
  }

  const run = () => {
    if (props.input) {
      grid = props.input.map(s => s.split(''))
      pOneGrid = grid.map(r => r.map(() => 0))
      pTwoGrid = grid.map(r => r.map(() => 0))

      let pOne = 0
      let pTwo = 0
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          if (grid[y][x] === letters[0]) {
            dirs.forEach(d => {
              if (checkDir({ x, y }, d, 1)) {
                // Remember for plotting
                for (let c = 0; c < letters.length; c++) {
                  pOneGrid[y + c * d[1]][x + c * d[0]]++
                }
                pOne++
              }
            })
          }

          if (y < grid.length - 2 && x < grid.length - 2) {
            if (checkMas({ x, y })) {
              pTwoGrid[y][x]++
              pTwoGrid[y][x + 2]++
              pTwoGrid[y + 2][x]++
              pTwoGrid[y + 1][x + 1]++
              pTwoGrid[y + 2][x + 2]++
              pTwo++
            }
          }
        }
      }
      emit('onFinished', pOne, pTwo)

      nextTick(() => {
        let maxValue = 0
        pOneGrid.forEach(r => r.forEach(c => { maxValue = Math.max(maxValue, c) }))
        pTwoGrid.forEach(r => r.forEach(c => { maxValue = Math.max(maxValue, c) }))

        const gradient = createMultiColorGradient(VIRIDIS, maxValue * 10)

        gridOne.value = pOneGrid.map((r, y) => r.map((c, x) => `<span class="day-2024-4-match" style="background-color: ${gradient[c ? (c * 10) : 0]}">${c ? grid[y][x] : '.'}</span>`).join('')).join('<br>')
        gridTwo.value = pTwoGrid.map((r, y) => r.map((c, x) => `<span class="day-2024-4-match" style="background-color: ${gradient[c ? (c * 10) : 0]}">${c ? grid[y][x] : '.'}</span>`).join('')).join('<br>')
      })
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>
.day-2024-4-code {
  background-color: #2c3e50;
  color: #7f8c8d;
  max-height: 100vh;
  line-height: 1.18em;
}
.day-2024-4-match {
  background-color: #2980b9;
  color: rgb(211, 193, 175);
}
</style>
