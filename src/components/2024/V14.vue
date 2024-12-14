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
    robotsOne: Position2d[]
    robotsTwo: Set<String>
    treeTip: Position2d
  }>()

  const dirs = [[-1, 0], [0, -1], [1, 0], [0, 1]]
  const width = 101
  const height = 103
  const factor = 8

  const drawOne = () => {
    // Initialise the canvas
    const canvas: HTMLCanvasElement = document.getElementById('partOne') as HTMLCanvasElement
    canvas.width = width * factor + 1
    canvas.height = height * factor + 1
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
    // Offset for better drawing accuracy
    ctx.translate(0.5, 0.5)
    ctx.lineWidth = 0.5

    ctx.fillStyle = '#222222'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const counts: Map<String, number> = new Map()
    let maxCount = 0

    props.robotsOne.forEach(r => {
      const key = `${r.x}|${r.y}`
      counts.set(key, (counts.get(key) || 0) + 1)
      maxCount = Math.max(maxCount, counts.get(key) || 0)
    })

    ctx.fillStyle = '#2f3542'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        ctx.fillRect(x * factor, y * factor, factor, factor)
      }
    }

    const fgGradient = createMultiColorGradient(VIRIDIS, maxCount * 100 + 1)

    console.log(maxCount)

    counts.forEach((value: number, key: String) => {
      const [x, y] = key.split('|').map(Number)

      ctx.fillStyle = fgGradient[value * 100]
      ctx.fillRect(x * factor, y * factor, factor, factor)
    })
  }

  const drawTwo = () => {
    // Initialise the canvas
    const canvas: HTMLCanvasElement = document.getElementById('partTwo') as HTMLCanvasElement
    canvas.width = width * factor + 1
    canvas.height = height * factor + 1
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
    // Offset for better drawing accuracy
    ctx.translate(0.5, 0.5)
    ctx.lineWidth = 0.5

    const darkGradient = createColorGradient('#57606f', '#2f3542', 10)
    const whiteGradient = createColorGradient('#f5f6fa', '#dcdde1', 10)
    const fgGradient = createColorGradient('#009432', '#C4E538', 10)

    ctx.fillStyle = '#222222'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        ctx.fillStyle = darkGradient[Math.floor(Math.random() * 10)]
        ctx.fillRect(x * factor, y * factor, factor, factor)
      }
    }

    const tree: Set<String> = new Set()

    const queue: Position2d[] = [props.treeTip]

    while (queue.length > 0) {
      const curr = queue.pop()

      if (curr) {
        dirs.forEach(d => {
          const next = { x: curr.x + d[0], y: curr.y + d[1] }
          if (props.robotsTwo.has(`${next.x}|${next.y}`) && !tree.has(`${next.x}|${next.y}`)) {
            tree.add(`${next.x}|${next.y}`)
            queue.push(next)
          }
        })
      }
    }

    tree.forEach(t => {
      const [x, y] = t.split('|').map(Number)

      ctx.fillStyle = fgGradient[Math.floor(Math.random() * 10)]
      ctx.fillRect(x * factor, y * factor, factor, factor)
    })

    props.robotsTwo.forEach(r => {
      if (!tree.has(r)) {
        const [x, y] = r.split('|').map(Number)
        ctx.fillStyle = whiteGradient[Math.floor(Math.random() * 10)]
        ctx.fillRect(x * factor, y * factor, factor, factor)
      }
    })
  }

  onMounted(() => {
    drawOne()
    drawTwo()
  })
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: auto;
  width: 100%;
}
</style>
