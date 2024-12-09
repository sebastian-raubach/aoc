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
  import { Block } from '@/components/2024/D9.vue'
  import { createMultiColorGradient, VIRIDIS } from '@/plugins/color'

  const props = defineProps<{
    pOne: Block[]
    pTwo: Block[]
  }>()

  const draw = (canvasId: string, blocks: Block[]) => {
    let max = 0
    blocks.forEach(b => {
      if (b.id !== undefined) {
        max = Math.max(max, b.id)
      }
    })
    const fgGradient = createMultiColorGradient(VIRIDIS, max)

    // Initialise the canvas
    const factor = 3
    const canvas: HTMLCanvasElement = document.getElementById(canvasId) as HTMLCanvasElement
    canvas.width = 500 * factor
    canvas.height = (blocks[blocks.length - 1].index + blocks[blocks.length - 1].length) / 500 * factor
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
    // Offset for better drawing accuracy
    ctx.lineWidth = 1

    // Set the canvas size
    ctx.fillStyle = '#222222'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    blocks.forEach(b => {
      ctx.fillStyle = fgGradient[b.id || 0]
      for (let i = 0; i < b.length; i++) {
        const index = b.index + i
        const x = index % 500
        const y = Math.floor(index / 500)
        ctx.fillRect(x * factor, y * factor, factor, factor)
      }
    })
  }

  onMounted(() => {
    draw('partOne', props.pOne)
    draw('partTwo', props.pTwo)
  })
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: 100%;
  width: 100%;
}
</style>
