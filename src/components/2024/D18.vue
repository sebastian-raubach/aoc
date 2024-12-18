<template>
  <V18
    :height="height"
    :p-two="pTwoStates"
    :path="pOnePath"
    :walls="pOneWalls"
    :width="width"
  />
</template>

<script lang="ts" setup>
  import V18, { DrawState } from '@/components/2024/V18.vue'
  import { Position2d } from '@/plugins/types/Position2d'
  import { ICompare, PriorityQueue } from '@datastructures-js/priority-queue'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface State {
    position: Position2d
    path: string[]
    distance: number
  }

  // Stuff for drawing
  let pOnePath: string[]
  let pOneWalls: string[]
  const pTwoStates: DrawState[] = []

  const width = 71
  const height = 71
  const limit = 1024
  const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]]
  const walls: Set<string> = new Set()
  const start: Position2d = { x: 0, y: 0 }
  const end: Position2d = { x: width - 1, y: height - 1 }

  const dijkstra = (): State | undefined => {
    const visited: Set<string> = new Set()

    // Use a priority queue to keep track of the node with lowest distance
    const compare: ICompare<State> = (a: State, b: State) => {
      return a.distance - b.distance
    }
    const queue = new PriorityQueue(compare)
    queue.enqueue({ position: start, path: ['0|0'], distance: 0 })
    visited.add('0|0')

    while (queue.size() > 0) {
      const current = queue.dequeue()
      if (current) {
        if (current.position.x === end.x && current.position.y === end.y) {
          // End reached
          return current
        }

        dirs.map(d => {
          // Go in all valid directions
          return { x: current.position.x + d[0], y: current.position.y + d[1] }
        })
          // Filter out-of-bounds, visited and walls
          .filter(d => d.x >= 0 && d.x < width && d.y >= 0 && d.y < height &&
            !visited.has(`${d.x}|${d.y}`) &&
            !walls.has(`${d.x}|${d.y}`))
          .forEach(d => {
            // Remember new path, add to queue, mark visited
            const path = current.path.concat()
            path.push(`${d.x}|${d.y}`)
            queue.enqueue({ position: d, path, distance: current.distance + 1 })
            visited.add(`${d.x}|${d.y}`)
          })
      }
    }

    return undefined
  }

  const run = () => {
    if (props.input) {
      const parsed: Position2d[] = props.input.map(s => {
        const [x, y] = s.split(',').map(Number)
        return { x, y }
      })

      // Add initial walls
      parsed.slice(0, limit).forEach(w => walls.add(`${w.x}|${w.y}`))

      // Run dijkstra
      let pOne
      let currentValid = dijkstra()
      if (currentValid) {
        pOne = currentValid.distance
        pOnePath = currentValid.path.concat()
        pOneWalls = [...walls]
        pTwoStates.push({
          pathChanged: true,
          lastOne: false,
          path: currentValid.path.concat(),
          walls: [...walls],
        })
      }

      // Part 2
      let pTwo
      let currentPath = new Set()
      currentValid?.path.forEach(p => currentPath.add(p))

      for (let i = limit; i < parsed.length; i++) {
        const key = `${parsed[i].x}|${parsed[i].y}`
        // Add new wall
        walls.add(key)
        // Only re-run dijkstra if the new wall is on the current valid path
        if (currentPath.has(key)) {
          // Now get the shortest new path
          currentValid = dijkstra()

          if (currentValid) {
            pTwoStates.push({
              pathChanged: true,
              lastOne: false,
              path: currentValid.path.concat(),
              walls: [...walls],
            })
            // If it found the target, keep going
            currentPath = new Set()
            currentValid.path.forEach(p => currentPath.add(p))
          } else {
            pTwoStates.push({
              pathChanged: true,
              lastOne: true,
              path: pTwoStates[pTwoStates.length - 1].path.concat(),
              walls: [...walls],
            })
            // Else, we're done
            pTwo = `${parsed[i].x},${parsed[i].y}`
            break
          }
        } else {
          if (currentValid) {
            pTwoStates.push({
              pathChanged: false,
              lastOne: false,
              path: currentValid.path.concat(),
              walls: [...walls],
            })
          }
        }
      }

      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
