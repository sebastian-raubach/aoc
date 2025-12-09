<template>
  <V9
    v-if="drawPoints && partOne && partTwo"
    :max="max"
    :min="min"
    :part-one="partOne"
    :part-two="partTwo"
    :points="drawPoints"
  />
</template>

<script lang="ts" setup>
  import { Position2d } from '@/plugins/types/Position2d'
  import V9, { DrawRectangle } from './V9.vue'

  const props = defineProps<{
    input?: string[],
  }>()

  const drawPoints = ref<Position2d[]>()
  const partOne = ref<DrawRectangle | undefined>()
  const partTwo = ref<DrawRectangle | undefined>()
  const min = ref<Position2d>({ x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER })
  const max = ref<Position2d>({ x: -Number.MAX_SAFE_INTEGER, y: -Number.MAX_SAFE_INTEGER })

  class Rectangle {
    min: Position2d
    max: Position2d

    constructor (from: Position2d, to: Position2d) {
      // We reorganize the points to lower-left and upper-right corner
      this.min = { x: Math.min(from.x, to.x), y: Math.min(from.y, to.y) }
      this.max = { x: Math.max(from.x, to.x), y: Math.max(from.y, to.y) }
    }

    area () {
      // Calculate area as dimension-deltas multiplied (+1 cause we're dealing with whole blocks)
      return (this.max.x - this.min.x + 1) * (this.max.y - this.min.y + 1)
    }

    overlaps (other: Rectangle) {
      // Check if they overlap in any dimension
      return this.min.x < other.max.x && this.max.x > other.min.x && this.min.y < other.max.y && this.max.y > other.min.y
    }
  }

  const emit = defineEmits(['onFinished'])

  const run = () => {
    if (props.input) {
      let pOne = 0
      let pTwo = 0

      // Parse the points
      const points: Position2d[] = props.input.map((s: string) => {
        const [x, y] = s.split(',').map(Number)

        min.value.x = Math.min(min.value.x, x)
        min.value.y = Math.min(min.value.y, y)
        max.value.x = Math.max(max.value.x, x)
        max.value.y = Math.max(max.value.y, y)

        return { x, y }
      })

      // Convert to all the lines/edges around the outside of the polygon
      const lines = points.map((p, i) => new Rectangle(p, points[(i + 1) % points.length]))

      // Convert to all possible rectangles
      const rectangles: Rectangle[] = []
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          rectangles.push(new Rectangle(points[i], points[j]))
        }
      }

      const areaRectangles = rectangles.map(r => {
        return { from: r.min, to: r.max, area: r.area() }
      })

      // Part one is the area of the maximum-sized rectangle
      pOne = Math.max(...areaRectangles.map(r => r.area))
      partOne.value = areaRectangles.find(r => r.area === pOne)

      // Part two is the area of the maximum-sized rectangle that doesn't overlap with any of the outer lines of the big polygon
      const contained = rectangles.filter(r => !lines.some(l => r.overlaps(l))).map(r => {
        return { from: r.min, to: r.max, area: r.area() }
      })
      pTwo = Math.max(...contained.map(r => r.area))
      partTwo.value = contained.find(r => r.area === pTwo)

      drawPoints.value = points
      emit('onFinished', pOne, pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
