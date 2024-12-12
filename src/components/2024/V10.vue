<template>
  <v-row>
    <v-col cols="12" md="6">
      <div class="canvas-holder">
        <canvas id="partOne" class="canvas" height="500" width="500" />
      </div>
    </v-col>
    <v-col cols="12" md="6">
      <div class="canvas-holder">
        <canvas id="partTwo" class="canvas" height="500" width="500" />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import { createColorGradient, createMultiColorGradient, VIRIDIS } from '@/plugins/color'
  import { Position2d } from '@/plugins/types/Position2d'

  const props = defineProps<{
    grid: number[][]
    paths: Map<string, Set<string>>
  }>()

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  interface DrawProps {
    bgGradient: string[]
    fgGradient: string[]
    factor: number
    startIndex: number
    pathIndex: number
    pathPosition: number
    keys: string[]
    paths: Map<string, Position2d[][]>
  }

  const drawProps: DrawProps = {
    bgGradient: [],
    fgGradient: [],
    factor: 15,
    startIndex: 0,
    pathIndex: 0,
    pathPosition: 0,
    keys: [],
    paths: new Map(),
  }

  const reset = () => {
    // Set the canvas size
    ctx.fillStyle = '#222222'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const width = props.grid[0].length
    const height = props.grid.length

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        ctx.fillStyle = drawProps.bgGradient[props.grid[y][x]]
        ctx.fillRect(x * drawProps.factor, y * drawProps.factor, drawProps.factor, drawProps.factor)
      }
    }
  }

  const drawPath = () => {
    const blah = drawProps.paths.get(drawProps.keys[drawProps.startIndex])
    if (blah && drawProps.pathPosition === blah[drawProps.pathIndex].length) {
      drawProps.pathPosition = 0
      drawProps.pathIndex++
      reset()
    }

    if (drawProps.pathIndex === drawProps.paths.get(drawProps.keys[drawProps.startIndex])?.length) {
      drawProps.pathIndex = 0
      drawProps.startIndex++
      reset()
    }

    if (drawProps.startIndex < drawProps.keys.length) {
      const paths = drawProps.paths.get(drawProps.keys[drawProps.startIndex])
      if (paths) {
        const path = paths[drawProps.pathIndex]

        for (let i = 0; i < path.length; i++) {
          const position = path[i]
          ctx.fillStyle = drawProps.fgGradient[props.grid[position.y][position.x]]
          ctx.fillRect(position.x * drawProps.factor, position.y * drawProps.factor, drawProps.factor, drawProps.factor)
        }

        drawProps.pathPosition = path.length
        window.requestAnimationFrame(() => drawPath())
      }
    }
  }

  const drawPartOne = () => {
    drawProps.startIndex = 0
    drawProps.pathIndex = 0
    drawProps.pathPosition = 0
    drawProps.bgGradient = createColorGradient('#2f3542', '#57606f', 10)

    const width = props.grid[0].length
    const height = props.grid.length

    // Initialise the canvas
    canvas = document.getElementById('partOne') as HTMLCanvasElement
    canvas.width = width * drawProps.factor + 1
    canvas.height = height * drawProps.factor + 1
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    // Offset for better drawing accuracy
    ctx.translate(0.5, 0.5)
    ctx.lineWidth = 1

    reset()

    const starts: Position2d[] = []
    const counts: Map<String, number> = new Map()
    let maxValue = 0
    props.paths.forEach((value: Set<String>, key: string) => {
      const [x, y] = key.split('|').map(Number)
      starts.push({ x, y })

      value.forEach(p => {
        const coords: string[] = p.split('_')
        // Remove artifacts
        coords.pop()

        // Get last one
        const end = coords.pop()
        if (end) {
          const v = (counts.get(end) || 0) + 1
          counts.set(end, v)
          maxValue = Math.max(maxValue, v)
        }
      })
    })

    const fg = createMultiColorGradient(VIRIDIS, maxValue)

    ctx.strokeStyle = 'white'
    starts.forEach(s => {
      ctx.strokeRect(s.x * drawProps.factor, s.y * drawProps.factor, drawProps.factor, drawProps.factor)
    })

    counts.forEach((value: number, key: String) => {
      const [x, y] = key.split('|').map(Number)

      ctx.fillStyle = fg[value]
      ctx.fillRect(x * drawProps.factor, y * drawProps.factor, drawProps.factor, drawProps.factor)
    })
  }

  const drawPartTwo = () => {
    drawProps.startIndex = 0
    drawProps.pathIndex = 0
    drawProps.pathPosition = 0
    drawProps.bgGradient = createColorGradient('#2f3542', '#57606f', 10)
    drawProps.fgGradient = createMultiColorGradient(VIRIDIS, 10)

    props.paths.forEach((value: Set<String>, key: string) => {
      drawProps.keys.push(key)
      const paths: Position2d[][] = []

      value.forEach(p => {
        const coords: Position2d[] = p.split('_').map(c => {
          const [x, y] = c.split('|').map(Number)
          return { x, y }
        })
        // Remove artifacts
        coords.pop()
        paths.push(coords)
      })

      drawProps.paths.set(key, paths)
    })

    const width = props.grid[0].length
    const height = props.grid.length

    // Initialise the canvas
    canvas = document.getElementById('partTwo') as HTMLCanvasElement
    canvas.width = width * drawProps.factor + 1
    canvas.height = height * drawProps.factor + 1
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    // Offset for better drawing accuracy
    ctx.translate(0.5, 0.5)
    ctx.lineWidth = 1

    reset()

    window.requestAnimationFrame(() => drawPath())
  }

  onMounted(() => {
    drawPartOne()
    drawPartTwo()
  })
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: auto;
  width: 100%;
}
</style>
