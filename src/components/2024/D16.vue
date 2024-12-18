<template>
  <V16 v-if="finished" :grid="grid" :on-path="onPath" :path="bestPath" />
</template>

<script lang="ts" setup>
  import { Position2d } from '@/plugins/types/Position2d'
  import { ICompare, PriorityQueue } from '@datastructures-js/priority-queue'
  import V16 from '@/components/2024/V16.vue'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  const finished = ref<boolean>(false)

  export interface State {
    position: Position2d
    facing?: string
    cost: number
    path?: State[]
  }
  interface CostMap {
    [key: string]: number
  }
  interface DirMap {
    [key: string]: number[]
  }
  interface RotMap {
    [key: string]: string[]
  }

  // Valid rotations based on current facing
  const rots: RotMap = {
    '>': ['^', 'v'],
    '<': ['^', 'v'],
    '^': ['<', '>'],
    v: ['<', '>'],
  }

  // Directional change based on current facing
  const dirs: DirMap = {
    '>': [1, 0],
    '<': [-1, 0],
    '^': [0, -1],
    v: [0, 1],
  }
  // Start and end positions
  const start: Position2d = { x: 0, y: 0 }
  const end: Position2d = { x: 0, y: 0 }
  // Overall grid
  let grid: string[][]
  // Best path for drawing purposes
  let bestPath: State[]
  // Points on path for drawing purposes
  const onPath: Set<string> = new Set()

  const dijkstra = (): number => {
    // Use a priority queue to keep track of the node with lowest cost
    const compare: ICompare<State> = (a: State, b: State) => {
      return a.cost - b.cost
    }
    const queue = new PriorityQueue(compare)
    const minCost: CostMap = {}
    let totalMinCost = 0

    // Initialize
    queue.enqueue({ position: { x: start.x, y: start.y }, cost: 0, path: [{ position: { x: start.x, y: start.y }, cost: 0, facing: '>' }], facing: '>' })
    minCost[`${start.x}|${start.y}|>`] = 0

    let current: State
    // Dijkstra AWAY!
    while (queue.size() > 0) {
      current = queue.dequeue()

      if (current.position.x === end.x && current.position.y === end.y) {
        if (totalMinCost === 0) {
          // First time reaching the goal, remember costs
          totalMinCost = current.cost
          // Add all positions on the path to the set
          current.path?.forEach(p => onPath.add(`${p.position.x}|${p.position.y}`))
          // Remember the best path
          bestPath = current.path || []
        } else if (current.cost === totalMinCost) {
          // Another time reaching the goal with same costs, add positions on the path to set
          current.path?.forEach(p => onPath.add(`${p.position.x}|${p.position.y}`))
        }

        continue
      }

      const nextDir = dirs[current.facing || '>']
      const next = { x: current.position.x + nextDir[0], y: current.position.y + nextDir[1] }

      if (next.x < 0 || next.y < 0 || next.x >= grid[0].length || next.y >= grid.length) {
        // If next is out of bounds, ignore
        continue
      }

      const options: State[] = []
      if (grid[next.y][next.x] === '.') {
        // Go straight
        const path = current.path?.concat() || []
        path.push({ position: next, cost: current.cost + 1, facing: current.facing })
        options.push({ position: next, facing: current.facing, cost: current.cost + 1, path })
      }

      // Check possible rotations
      const rotations = rots[current.facing || '>']
      rotations.forEach(r => {
        const path = current.path?.concat() || []
        path.push({ position: current.position, cost: current.cost + 1000, facing: r })
        options.push({ position: current.position, facing: r, cost: current.cost + 1000, path })
      })

      options.forEach(n => {
        // Check previous costs
        const prevCost = minCost[`${n.position.x}|${n.position.y}|${n.facing}`]

        // Keep going as long as we're cheaper than any possibly already found solution (for part 2)
        if (totalMinCost === 0 || n.cost <= totalMinCost) {
          if (prevCost === undefined || prevCost === null) {
            // Remember newly discovered locations
            queue.enqueue(n)
            minCost[`${n.position.x}|${n.position.y}|${n.facing}`] = n.cost
          } else {
            if (n.cost <= prevCost) {
              // Enqueue if not more expensive
              queue.enqueue(n)
              minCost[`${n.position.x}|${n.position.y}|${n.facing}`] = n.cost
            }
          }
        }
      })
    }

    return totalMinCost
  }

  const run = () => {
    if (props.input) {
      // Parse the grid
      grid = props.input.map((s, y) => {
        const split = s.split('')
        split.forEach((c, x) => {
          if (c === 'S') {
            split[x] = '.'
            start.x = x
            start.y = y
          } else if (c === 'E') {
            split[x] = '.'
            end.x = x
            end.y = y
          }
        })
        return split
      })

      const pOne = dijkstra()
      emit('onFinished', pOne, onPath.size)

      nextTick(() => {
        finished.value = true
      })
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
