<template>
  <V25 v-if="finished" :keys="keys" :locks="locks" />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])
  const finished = ref<boolean>(false)

  const locks: number[][] = []
  const keys: number[][] = []
  let cache: string[][] = []

  const parse = () => {
    const isKey = cache[0][0] === '.'
    const code: number[] = []
    for (let x = 0; x < cache[0].length; x++) {
      let count = 0
      for (let y = 0; y < cache.length; y++) {
        if (cache[y][x] === '#') {
          count++
        }
      }
      code.push(count - 1)
    }

    if (isKey) {
      keys.push(code)
    } else {
      locks.push(code)
    }
  }

  const run = () => {
    if (props.input) {
      props.input.forEach(s => {
        if (s.length === 0) {
          parse()
          cache = []
        } else {
          cache.push(s.split(''))
        }
      })

      parse()

      let pOne = 0

      locks.forEach((lock: number[]) => {
        keys.forEach((key: number[]) => {
          for (let x = 0; x < lock.length; x++) {
            if (lock[x] + key[x] >= 6) {
              return
            }
          }

          pOne++
        })
      })

      emit('onFinished', pOne, null)

      nextTick(() => {
        finished.value = true
      })
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
