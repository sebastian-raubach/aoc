<template>
  <span />
</template>

<script lang="ts" setup>
  import { minkowski } from '@/plugins/math'
  import { Position3d } from '@/plugins/types/Position3d'
  import { ICompare, PriorityQueue } from '@datastructures-js/priority-queue'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface Edge {
    from: number
    to: number
    distance: number
  }

  const run = () => {
    if (props.input) {
      // Use a priority queue to keep track of the node with lowest cost
      const compare: ICompare<Edge> = (a: Edge, b: Edge) => {
        return a.distance - b.distance
      }
      const queue = new PriorityQueue(compare)

      let pOne = 0
      let pTwo = 0

      // Parse the input
      const points: Position3d[] = props.input.map((s: string, index: number) => {
        const [x, y, z] = s.split(',').map(Number)
        return { x, y, z }
      })

      // Remember which node (by index) is in which group
      let groups: (number | undefined)[] = points.map(() => undefined)

      // Calculate the pairwise distance and add an edge representing it
      for (let from = 0; from < points.length; from++) {
        for (let to = from + 1; to < points.length; to++) {
          const f = points[from]
          const t = points[to]
          const distance = minkowski([f.x, f.y, f.z], [t.x, t.y, t.z], 2)

          queue.enqueue({ from, to, distance })
        }
      }

      let groupCounter = 0
      const iterate = (edge: Edge) => {
        const from = groups[edge.from]
        const to = groups[edge.to]
        if (from === undefined || to === undefined) {
          // New point added to group
          const g = from || to || ++groupCounter
          groups[edge.from] = g
          groups[edge.to] = g
        } else if (from !== to) {
          // Two groups need to join
          groups = groups.map(g => g === to ? from : g)
        }
      }

      let round = 0
      while (round < 1000) {
        const edge = queue.dequeue()
        iterate(edge)

        // Crucially, we increment the counter in ANY case, even when connecting inside a component
        round++
      }

      // Start counting stuff
      const mapping = new Map<number, number>()
      groups.forEach(g => {
        if (g !== undefined) {
          mapping.set(g, (mapping.get(g) || 0) + 1)
        }
      })
      const arr = [...mapping.values()].sort((a, b) => b - a)
      pOne = arr.slice(0, 3).reduce((a, b) => a * b, 1)

      // Part 2
      while (true) {
        const edge = queue.dequeue()
        iterate(edge)

        if (new Set(groups).size === 1) {
          // Once only one compound is left, calculate the result
          pTwo = points[edge.from].x * points[edge.to].x
          break
        }
      }

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
