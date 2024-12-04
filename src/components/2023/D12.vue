<template>
  <span />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface Instruction {
    conditions: string
    runLengths: number[]
    possibleCount: number
  }

  const countArrangments = (conditions: string, pos: number, runs: number[], minLength: number, memo: number[][]): number => {
    // memo is indexed by pos, then by runs.length
    function memoize (result: number): number {
      if (!memo[pos]) {
        memo[pos] = []
      }
      memo[pos][runs.length] = result
      return result
    }

    if (memo[pos] && typeof memo[pos][runs.length] === 'number') {
      return memo[pos][runs.length]
    }
    if (runs.length === 0) {
      return conditions.indexOf('#', pos) >= 0 ? 0 : 1
    } else if (pos + minLength > conditions.length) {
      return memoize(0)
    } else if (conditions[pos] === '.') {
      let nextPos = pos
      while (conditions[nextPos] === '.') {
        nextPos++
      }
      return memoize(countArrangments(conditions, nextPos, runs, minLength, memo))
    } else if (pos >= conditions.length) {
      return memoize(runs.length === 0 ? 1 : 0)
    } else if (conditions[pos] === '#') {
      // check for run starting at pos followed by an undamaged spring
      if (conditions.length - pos < runs[0]) {
        return memoize(0)
      }
      for (let i = 0; i < runs[0]; i++) {
        if (conditions[pos + i] === '.') {
          return memoize(0)
        }
      }
      if (conditions[pos + runs[0]] === '#') {
        return memoize(0)
      }
      return memoize(countArrangments(conditions, pos + runs[0] + 1, runs.slice(1), minLength - runs[0] - 1, memo))
    } else if (conditions[pos] === '?') {
      // without a run starting at pos
      let result = countArrangments(conditions, pos + 1, runs, minLength, memo)

      if (conditions.length - pos < runs[0]) {
        return memoize(result)
      }

      for (let i = 0; i < runs[0]; i++) {
        if (conditions[pos + i] === '.') {
          return memoize(result)
        }
      }
      if (conditions[pos + runs[0]] === '#') {
        return memoize(result)
      }

      // also with a run starting at pos
      result += countArrangments(conditions, pos + runs[0] + 1, runs.slice(1), minLength - runs[0] - 1, memo)

      return memoize(result)
    }

    return 0
  }

  const run = () => {
    if (props.input) {
      const parsed: Instruction[] = props.input.map(i => {
        const [conditions, runLengths] = i.split(' ').map((p, j) => j === 0 ? p : p.split(',').map(Number)) as [string, number[]]

        return {
          conditions,
          runLengths,
          possibleCount: 0,
        }
      })

      const pOne = parsed.map(p => {
        const minLength = p.runLengths.reduce((a, b) => a + b + 1)
        p.possibleCount = countArrangments(p.conditions, 0, p.runLengths, minLength, [])
        return p.possibleCount
      }).reduce((a, b) => a + b)

      const pTwo = parsed.map(p => {
        // Concatenate the same condition and run lengths 5 times
        p.conditions = [0, 1, 2, 3, 4].map(() => p.conditions).join('?')
        p.runLengths = [0, 1, 2, 3, 4].map(() => p.runLengths).flat()
        // Then run the same as part 1
        const minLength = p.runLengths.reduce((a, b) => a + b + 1)
        p.possibleCount = countArrangments(p.conditions, 0, p.runLengths, minLength, [])
        return p.possibleCount
      }).reduce((a, b) => a + b)

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
