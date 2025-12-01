<template>
  <div id="holderOne" class="canvas-holder">
    <canvas id="partOne" class="canvas" height="500" width="500" />
  </div>
</template>

<script lang="ts" setup>

  const props = defineProps<{
    keys: number[][]
    locks: number[][]
  }>()

  const drawOne = () => {
    const canvas: HTMLCanvasElement = document.getElementById('partOne') as HTMLCanvasElement
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

    // Initialise the canvas
    const factor = 2
    const gap = 1
    const width = props.locks[0].length
    const height = 7
    canvas.width = props.locks.length * width * factor + (props.locks.length - 1) * gap
    canvas.height = props.keys.length * height * factor + (props.keys.length - 1) * gap
    // Offset for better drawing accuracy
    // ctx.translate(0.5, 0.5)
    ctx.lineWidth = 1

    ctx.fillStyle = '#222222'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let key = 0; key < props.keys.length; key++) {
      for (let lock = 0; lock < props.locks.length; lock++) {
        const ox = lock * width * factor + lock * gap
        const oy = key * height * factor + key * gap
        const k = props.keys[key]
        const l = props.locks[lock]

        ctx.fillStyle = '#2c3e50'
        ctx.fillRect(ox, oy, width * factor, height * factor)

        for (let x = 0; x < width; x++) {
          for (let y = 0; y < l[x] + 1; y++) {
            const collision = y + k[x] >= 6
            ctx.fillStyle = collision ? '#e74c3c' : '#7f8c8d'
            ctx.fillRect(ox + x * factor, oy + y * factor, factor, factor)
          }
        }

        for (let x = 0; x < width; x++) {
          for (let y = 0; y < k[x] + 1; y++) {
            const collision = y + l[x] >= 6
            ctx.fillStyle = collision ? '#e74c3c' : '#f1c40f'
            ctx.fillRect(ox + x * factor, oy + height * factor - (y + 1) * factor, factor, factor)
          }
        }
      }
    }
  }

  onMounted(() => drawOne())
</script>

<style scoped>
.canvas-holder {
  overflow: auto;
  height: auto;
  width: 100%;
}
</style>
