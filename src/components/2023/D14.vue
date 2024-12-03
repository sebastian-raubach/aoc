<template>
  <span />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface Map {
    [key: string]: number
  }

  const tilt = (grid: string[][]) => {
    // We achieve the tilt by splitting each row on "#"s, then sorting each section which will sort "O"s before "."s, then join back together with "#"s.
    return grid.map(row => {
      const parts = row.join('').split('#')
      return parts.map(p => p.split('').sort((a, b) => b.localeCompare(a)).join('')).join('#').split('')
    })
  }

  const rotateLeft = (grid: string[][]) => {
    const result: string[][] = []
    grid.forEach((a, i) => {
      a.forEach((b, j, bb) => {
        result[bb.length - j - 1] = result[bb.length - j - 1] || []
        result[bb.length - j - 1][i] = b
      })
    })
    return result
  }

  const rotateRight = (grid: string[][]) => {
    const result: string[][] = []
    grid.forEach((a, i, aa) => {
      a.forEach((b, j) => {
        result[j] = result[j] || []
        result[j][aa.length - i - 1] = b
      })
    })
    return result
  }

  const run = () => {
    if (props.input) {
      // Parse grid
      let grid: string[][] = props.input.map(i => i.split(''))
      // Rotate to the left
      let northLeft = rotateLeft(grid)
      // Tilt by splitting, sorting and joining
      northLeft = tilt(northLeft)
      // Rotate back
      grid = rotateRight(northLeft)
      // Calculate result
      const height = grid.length
      const pOne = grid.map((row, y) => row.map((c, x) => c === 'O' ? height - y : 0).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)

      // Read grid again
      grid = props.input.map(i => i.split(''))
      let cache: Map = {}
      const spinCycles = 1_000_000_000
      let cycle = 0
      // Rotate it left twice, so that North is pointing down
      grid = rotateLeft(grid)
      grid = rotateLeft(grid)

      while (cycle < spinCycles) {
        // Take a copy
        let temp = grid.map(row => row.concat())
        // Rotate if four times (first rotation will make North face left so we can tilt it)
        for (let r = 0; r < 4; r++) {
          temp = rotateRight(temp)
          // Then tilt
          temp = tilt(temp)
        }
        grid = temp
        // Stringify for cache comparison
        const stringified = JSON.stringify(temp)
        cycle++

        if (cache[stringified]) {
          // If we've seen this configuration before
          const cycleLength = cycle - cache[stringified]
          // Advance the cycle by as many times as it fits into the cycleLength
          cycle += Math.floor((spinCycles - cycle) / cycleLength) * cycleLength
          // Then clear the cache
          cache = {}
        } else {
          // Else add to the cache
          cache[stringified] = cycle
        }
      }

      // Rotate back so that North is up again
      grid = rotateRight(grid)
      grid = rotateRight(grid)
      // Calculate result
      const pTwo = grid.map((row, y) => row.map((c, x) => c === 'O' ? height - y : 0).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
