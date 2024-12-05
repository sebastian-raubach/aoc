<template>
  <v-container v-if="actualDay">
    <v-btn class="mb-3" :to="`../${year}`" variant="tonal"><v-icon><IBiChevronDoubleLeft /></v-icon> Back</v-btn>

    <div class="d-flex justify-space-between">
      <h1 class="text-h4">Year {{ year }} - Day {{ day }}</h1>
      <v-btn v-if="githubUrl" :href="githubUrl" target="_blank"><v-icon><IBiGithub /></v-icon> Code on GitHub</v-btn>
    </div>
    <h2 class="text-secondary">{{ actualDay.title }}</h2>
    <v-divider class="my-4" />

    <p>The original task description can be found on the official Advent of Code page: <a :href="aocUrl">{{ aocUrl }}</a></p>

    <v-row v-if="markdownSource && markdownSource.length === 2" class="mb-5">
      <v-col cols="12" md="6">
        <v-card subtitle="Description of task part one." title="Part 1">
          <v-card-actions>
            <v-btn
              :text="showPartOne ? 'Hide' : 'Show'"
              @click="showPartOne = !showPartOne"
            />
          </v-card-actions>

          <v-expand-transition>
            <div v-show="showPartOne">
              <v-divider />

              <v-card-text>
                <div class="markdown" v-html="markdownRenderer.render(markdownSource[0])" />
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card subtitle="Description of task part two." title="Part 2">
          <v-card-actions>
            <v-btn
              :text="showPartTwo ? 'Hide' : 'Show'"
              @click="showPartTwo = !showPartTwo"
            />
          </v-card-actions>

          <v-expand-transition>
            <div v-show="showPartTwo">
              <v-divider />

              <v-card-text>
                <div v-html="markdownRenderer.render(markdownSource[1])" />
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>

    <v-form class="mb-5" @submit.prevent="handleInput">
      <v-textarea v-model="input" class="task-input" label="Task input" />

      <v-btn color="primary" :disabled="!componentExists" type="submit"><v-icon><IBiPlayFill /></v-icon> Run</v-btn>
    </v-form>

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-if="partOne"
          label="Solution part 1"
          :model-value="partOne"
          readonly
          @focus="$event.target.select()"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-if="partTwo"
          label="Solution part 2"
          :model-value="partTwo"
          readonly
          @focus="$event.target.select()"
        />
      </v-col>
    </v-row>

    <template v-if="componentExists">
      <component
        :is="currentDay"
        v-if="parsedInput && shouldRun"
        :input="parsedInput"
        @on-finished="handleResult"
      />
    </template>
    <MissingSolutionComponent v-else :day="day" :year="year" />
  </v-container>
</template>

<script lang="ts" setup>
  import { coreStore } from '@/stores/app'
  import { useRoute } from 'vue-router'
  import { Day, solvedDays } from '@/plugins/days'
  // @ts-ignore
  import MarkdownIt from 'markdown-it'
  import MissingSolutionComponent from '@/components/MissingSolutionComponent.vue'

  const store = coreStore()

  const markdownRenderer = new MarkdownIt({
    html: true,
    breaks: true,
  })

  const route = useRoute()
  // @ts-ignore
  const year = ref<string>(route.params.year || '')
  // @ts-ignore
  const day = ref<string>(route.params.day || '')
  const input = ref<string>('')
  const markdownSource = ref<string[]>()
  const parsedInput = ref<string[] | undefined>()
  const partOne = ref<string | undefined>()
  const partTwo = ref<string | undefined>()
  const showPartOne = ref<boolean>(false)
  const showPartTwo = ref<boolean>(false)
  const componentExists = ref<boolean>(true)
  const shouldRun = ref<boolean>(false)

  const actualDay: ComputedRef<Day | undefined> = computed(() => {
    if (year.value && day.value) {
      const days = solvedDays.get(+year.value)
      if (days) {
        return days[(+day.value) - 1]
      } else {
        return undefined
      }
    } else {
      return undefined
    }
  })

  const handleInput = () => {
    shouldRun.value = false
    nextTick(() => {
      if (input.value) {
        // Split by newline
        parsedInput.value = input.value.split(/\r?\n/)
      } else {
        parsedInput.value = undefined
      }
      shouldRun.value = true
    })
  }

  const handleResult = (pOne: string, pTwo: string) => {
    // This is the response from the component
    partOne.value = pOne
    partTwo.value = pTwo
  }

  const checkComponentExists = () => {
    import(`@/components/${year.value}/D${day.value}.vue`)
      .catch(() => {
        componentExists.value = false
      })
  }

  const currentDay = computed(() => {
    // Load the component asynchronously based on year and day
    return defineAsyncComponent({
      loader: () => import(`@/components/${year.value}/D${day.value}.vue`),
      errorComponent: MissingSolutionComponent,
    })
  })

  const githubUrl = computed(() => {
    if (componentExists.value) {
      return `${store.githubRepo}blob/main/src/components/${year.value}/D${day.value}.vue`
    } else {
      return undefined
    }
  })

  const aocUrl = computed(() => `https://adventofcode.com/${year.value}/day/${day.value}`)

  const getDataFile = async () => {
    // Load the file asynchronously
    input.value = (await import(`@/assets/data/${year.value}/${day.value}.txt?raw`)).default
  }

  const getMarkdownFile = async () => {
    // Load the file asynchronously
    const parts = (await import(`@/assets/markdown/${year.value}/${day.value}.md?raw`)).default
    markdownSource.value = parts.split('[comment]: <> (PART 2)')
  }

  // When mounted, load the input file
  onMounted(() => {
    checkComponentExists()
    getDataFile()
    getMarkdownFile()
  })
</script>

<style>
.task-input textarea {
  font-family: monospace;
  white-space: pre;
  overflow: auto;
}
</style>
