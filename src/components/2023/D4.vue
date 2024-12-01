<template>
  <span />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  interface Map {
    [key: string]: number
  }
  interface Card {
    overlap: number
    value: number
  }

  const emit = defineEmits(['onFinished'])

  const run = () => {
    if (props.input) {
      const pattern = /Card\s+(?<card>\d+): (?<winning>.+) \| (?<having>.+)/

      const parsed: Card[] = props.input.map((i: string) => {
        const res = i.match(pattern)?.groups

        if (res) {
          const winning: number[] = res.winning.trim().split(/\s+/).map(Number)
          const having: number[] = res.having.trim().split(/\s+/).map(Number)

          const overlap: number = having.filter(h => winning.includes(h)).length

          return {
            overlap,
            value: overlap > 0 ? Math.pow(2, overlap - 1) : 0,
          }
        } else {
          return {
            overlap: 0,
            value: 0,
          }
        }
      })

      const pOne = parsed.map((p: Card) => p.value).reduce((a: number, b: number) => a + b, 0)

      const mapping: Map = {}

      parsed.forEach((_, i) => { mapping[i] = 1 })

      for (let i = 0; i < parsed.length; i++) {
        const count = mapping[i]

        if (parsed[i].overlap > 0) {
          const bound = Math.min(parsed.length, i + 1 + parsed[i].overlap)
          for (let j = i + 1; j < bound; j++) {
            mapping[j] += count
          }
        }
      }

      const pTwo = Object.values(mapping).reduce((a: number, b: number) => a + b, 0)

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
