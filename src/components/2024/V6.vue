<template>
  <div class="canvas-holder">
    <canvas id="partOne" class="canvas" height="910" width="910" />
  </div>
</template>

<script lang="ts" setup>
  import { createColorGradient, createMultiColorGradient, VIRIDIS } from '@/plugins/color'
  import { manhattan } from '@/plugins/math'
  import { Position2d } from '@/plugins/types/Position2d'

  const props = defineProps<{
    grid: Set<string>
    height: number
    width: number
    start: Position2d
    obstacles: Position2d[]
    path: Position2d[]
  }>()

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  interface DrawProps {
    bgGradient: string[]
    fgGradient: string[]
    factor: number
    pathIndex: number
    obstacleIndex: number
  }

  const drawProps: DrawProps = {
    bgGradient: [],
    fgGradient: [],
    factor: 8,
    pathIndex: 0,
    obstacleIndex: 0,
  }

  const drawPath = () => {
    const i = drawProps.pathIndex

    ctx.fillStyle = drawProps.fgGradient[i]
    ctx.fillRect(props.path[i].x * drawProps.factor, props.path[i].y * drawProps.factor, drawProps.factor, drawProps.factor)

    if (i < props.path.length - 1) {
      drawProps.pathIndex++
      window.requestAnimationFrame(() => drawPath())
    } else {
      const sorted: Map<number, Position2d[]> = new Map()
      const keys: Set<number> = new Set()

      props.obstacles.forEach(o => {
        const distance = manhattan(o, { x: Math.floor(props.width / 2), y: Math.floor(props.height / 2) })
        keys.add(distance)

        let atDistance = sorted.get(distance)

        if (!atDistance) {
          atDistance = [o]
        } else {
          atDistance.push(o)
        }

        sorted.set(distance, atDistance)
      })

      // const sorted = props.obstacles.concat().sort((a: Position2d, b: Position2d) => Math.sign((a.x + a.y) - (b.x + b.y)))
      window.requestAnimationFrame(() => drawObstacles(sorted, [...keys].sort((a, b) => a - b)))
    }
  }

  const drawObstacles = (obstacles: Map<number, Position2d[]>, keys: number[]) => {
    ctx.fillStyle = '#f1f2f6'

    const os = obstacles.get(keys[drawProps.obstacleIndex++])
    os?.forEach(e => {
      ctx.beginPath()
      ctx.arc(e.x * drawProps.factor + drawProps.factor / 2, e.y * drawProps.factor + drawProps.factor / 2, drawProps.factor / 4, 0, 2 * Math.PI)
      ctx.fill()
    })

    if (drawProps.obstacleIndex < keys.length - 1) {
      drawProps.obstacleIndex++
      window.requestAnimationFrame(() => drawObstacles(obstacles, keys))
    }
  }

  const draw = () => {
    const maxDistance = Math.max(Math.abs(props.start.x - props.width), Math.abs(props.start.x)) + Math.max(Math.abs(props.start.y - props.height), Math.abs(props.start.y))

    drawProps.pathIndex = 0
    drawProps.obstacleIndex = 0
    drawProps.bgGradient = createColorGradient('#57606f', '#2f3542', maxDistance)
    drawProps.fgGradient = createMultiColorGradient(VIRIDIS, props.path.length)

    // Initialise the canvas
    canvas = document.getElementById('partOne') as HTMLCanvasElement
    canvas.width = props.width * drawProps.factor
    canvas.height = props.height * drawProps.factor
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    // Offset for better drawing accuracy
    ctx.translate(0.5, 0.5)
    ctx.lineWidth = 1

    // Set the canvas size
    ctx.fillStyle = '#222222'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let y = 0; y < props.height; y++) {
      for (let x = 0; x < props.width; x++) {
        const distance = manhattan({ x, y }, props.start)
        ctx.fillStyle = drawProps.bgGradient[distance]
        ctx.fillRect(x * drawProps.factor, y * drawProps.factor, drawProps.factor, drawProps.factor)
      }
    }

    ctx.fillStyle = '#a4b0be'
    props.grid.forEach(o => {
      const [x, y] = o.split('|').map(Number)
      ctx.fillRect(x * drawProps.factor, y * drawProps.factor, drawProps.factor, drawProps.factor)
    })

    window.requestAnimationFrame(() => drawPath())
  }

  onMounted(() => draw())
</script>
