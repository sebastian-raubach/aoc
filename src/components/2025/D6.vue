<template>
  <span />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  type Operator = '*' | '+'

  const run = () => {
    if (props.input) {
      let pOne = 0
      let pTwo = 0
      const input = props.input

      // Store the operators separate from the data
      let ops: Operator[] = []
      const data = input.map((s: string, i: number) => {
        // Check if this is the operator line
        const isLast = i === input.length - 1
        // Trim (important!), then split the row by removing any number of spaces between elements
        const split = s.trim().split(/\s+/)

        if (isLast) {
          // Store operators
          ops = split as Operator[]
        }

        // Else map all individual values to numbers
        return split.map(Number)
      })

      // Remove operators from data grid
      data.pop()

      // Part one is simply going through the grid column by column and reducing using the operator
      pOne = ops.map((o, i) => {
        const isMult = o === '*'
        return data.map(d => d[i]).reduce((a, b) => isMult ? (a * b) : (a + b))
      }).reduce((a, b) => a + b)

      // For part two, we parse the input differently. Just split into individual characters as the position is important
      const grid = input.map((s: string) => s.split(''))
      // Again remove operators
      grid.pop()

      // Remember the start position of a "chunk" of numbers
      let start = 0
      // Remember the current index to look up the operator for the chunk
      let index = 0

      for (let i = 1; i < grid[0].length; i++) {
        // If we reach a separator column (all spaces)
        if (grid.every(g => g[i] === ' ')) {
          // Handle this range in a function
          pTwo += handleRange(start, i, ops[index], grid)

          // Move on to the next operator chunk
          index++
          // Initialize the start position of the next chunk
          start = i + 1
        }
      }

      // Remember to handle the last chunk as it won't be processed in the loop
      pTwo += handleRange(start, grid[0].length, ops[ops.length - 1], grid)

      emit('onFinished', pOne, pTwo)
    }
  }

  function handleRange (start: number, end: number, op: Operator, grid: string[][]) {
    // Array to hold the vertical numbers of this chunk
    const numbers: number[] = []

    // Iterate through the chunk boundaries
    for (let j = start; j < end; j++) {
      // Get the digit from each row (top to bottom), then join together, trim and parse to a number
      numbers.push(+(grid.map(g => g[j]).join('').trim()))
    }

    // Then reduce them using the operator
    const isMult = op === '*'
    return numbers.reduce((a, b) => isMult ? (a * b) : (a + b))
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
