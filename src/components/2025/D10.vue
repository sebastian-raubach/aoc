<template>
  <V10
    v-if="machines && solutionPartOne"
    :machines="machines"
    :solutions="solutionPartOne"
  />
</template>

<script lang="ts" setup>
  import { ICompare, PriorityQueue } from '@datastructures-js/priority-queue'
  import V10 from './V10.vue'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  export interface Machine {
    indicators: boolean[]
    buttons: number[][]
    joltage: number[]
  }

  interface SearchState {
    currentIndicators: boolean[]
    targetIndicators: boolean[]
    currentJoltage: number[]
    targetJoltage: number[]
    cost: number
    pressedButtons: number[]
  }

  export interface SearchResult {
    cost: number
    pressedButtons: number[]
  }

  const machines = ref<Machine[]>()
  const solutionPartOne = ref<SearchResult[]>()

  const run = () => {
    if (props.input) {
      let pOne = 0
      let pTwo = 0

      machines.value = props.input.map((s: string) => {
        const machine = {
          indicators: [] as boolean[],
          buttons: [] as number[][],
          joltage: [] as number[],
        }
        const parts = s.split(' ')

        parts.forEach(p => {
          if (p.startsWith('[')) {
            machine.indicators = p.replace(/(\[|\])/g, '').split('').map(c => c === '#')
          } else if (p.startsWith('{')) {
            machine.joltage = p.replace(/(\{|\})/g, '').split(',').map(Number)
          } else {
            machine.buttons.push(p.replace(/(\(|\))/g, '').split(',').map(Number))
          }
        })

        return machine
      })

      solutionPartOne.value = machines.value.map(m => solvePartOne(m))
      pOne = solutionPartOne.value.map(s => s.cost).reduce((a, b) => a + b)

      emit('onFinished', pOne, pTwo)
    }
  }

  function solvePartOne (machine: Machine): SearchResult {
    // Use a priority queue to keep track of the node with lowest distance
    const compare: ICompare<SearchState> = (a: SearchState, b: SearchState) => {
      return a.cost - b.cost
    }
    const queue = new PriorityQueue<SearchState>(compare)
    queue.enqueue({
      targetIndicators: machine.indicators,
      currentIndicators: machine.indicators.map(() => false),
      targetJoltage: machine.joltage,
      currentJoltage: machine.joltage.map(() => 0),
      cost: 0,
      pressedButtons: [],
    })

    while (queue.size() > 0) {
      const current = queue.dequeue()
      if (current) {
        if (JSON.stringify(current.currentIndicators) === JSON.stringify(current.targetIndicators)) {
          return {
            cost: current.cost,
            pressedButtons: current.pressedButtons,
          }
        }

        for (let i = 0; i < machine.buttons.length; i++) {
          const indicators = current.currentIndicators.concat()
          const pressedButtons: number[] = []

          machine.buttons[i].forEach(b => {
            indicators[b] = !indicators[b]
          })

          pressedButtons.push(i)

          queue.enqueue({
            targetIndicators: current.targetIndicators,
            currentIndicators: indicators,
            currentJoltage: current.currentJoltage,
            targetJoltage: current.targetJoltage,
            cost: current.cost + 1,
            pressedButtons: current.pressedButtons.concat(pressedButtons),
          })
        }
      }
    }

    return {
      cost: Number.POSITIVE_INFINITY,
      pressedButtons: [],
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
