<template>
  <span />
</template>

<script lang="ts" setup>
  import { enumerateBase } from '@/plugins/math'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface Equation {
    result: number
    values: number[]
  }

  const solve = (e: Equation, bin: number[][]) => {
    // Check each enumeration
    for (let i = 0; i < bin.length; i++) {
      let total = e.values[0]

      for (let j = 0; j < bin[i].length; j++) {
        switch (bin[i][j]) {
          case 0:
            total *= e.values[j + 1]
            break
          case 1:
            total += e.values[j + 1]
            break
          case 2:
            total = +`${total}${e.values[j + 1]}`
            break
        }
      }

      if (total === e.result) {
        return true
      }
    }

    return false
  }

  const run = () => {
    if (props.input) {
      const eq: Equation[] = props.input.map(e => {
        const [result, values] = e.split(': ').map((v, i) => i === 0 ? +v : v.split(' ').map(Number)) as [number, number[]]

        return { result, values }
      })

      // Cache the binary and ternary base enumerations for better performance
      const binCache: Map<number, number[][]> = new Map()
      const terCache: Map<number, number[][]> = new Map()

      let pOne = 0
      let pTwo = 0
      eq.forEach(e => {
        // Generate binary base enumeration
        const bin = binCache.get(e.values.length - 1) || enumerateBase(e.values.length - 1, 2)
        binCache.set(e.values.length - 1, bin)

        if (solve(e, bin)) {
          // Solvable with only + and * (but also add for part 2)
          pOne += e.result
          pTwo += e.result
        } else {
          // Generate ternary base enumeration, but exclude those that don't contain the new operator as they've already been checked
          const ter = terCache.get(e.values.length - 1) || enumerateBase(e.values.length - 1, 3).filter(t => t.some(v => v === 2))
          terCache.set(e.values.length - 1, ter)

          if (solve(e, ter)) {
            pTwo += e.result
          }
        }
      })

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
