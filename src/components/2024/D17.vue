<template>
  <span />
</template>

<script lang="ts" setup>
  import { mod } from '@/plugins/math'

  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface Registers {
    a: number
    b: number
    c: number
  }

  class Machine {
    instructions: number[]
    registers: Registers

    constructor (instructions: number[], registers: Registers) {
      this.instructions = instructions
      this.registers = registers
    }

    getOperand (op: number): number {
      switch (op) {
        case 0:
        case 1:
        case 2:
        case 3:
          return op
        case 4:
          return this.registers.a
        case 5:
          return this.registers.b
        case 6:
          return this.registers.c
        case 7:
        default:
          // Should not happen
          return 1
      }
    }

    run (regA: number): number[] {
      // Set registers to specific starting point
      this.registers = {
        a: regA,
        b: 0,
        c: 0,
      }
      // Then execute the machine
      return this.execute()
    }

    execute (): number[] {
      let pointer = 0
      const output = []

      while (pointer < this.instructions.length - 1) {
        const [opcode, literal] = this.instructions.slice(pointer, pointer + 2)

        const combo = this.getOperand(literal)

        pointer += 2
        switch (opcode) {
          case 0:
            // adv
            this.registers.a = Math.floor(this.registers.a / Math.pow(2, combo))
            break
          case 1:
            // bxl
            this.registers.b = this.registers.b ^ literal
            break
          case 2:
            // bst
            this.registers.b = combo % 8
            break
          case 3:
            // jnz
            if (this.registers.a !== 0) {
              pointer = literal
            }
            break
          case 4:
            // bxc
            this.registers.b = this.registers.b ^ this.registers.c
            break
          case 5:
            // out
            output.push(mod(combo, 8))
            break
          case 6:
            // bdv
            this.registers.b = Math.floor(this.registers.a / Math.pow(2, combo))
            break
          case 7:
            // cdv
            this.registers.c = Math.floor(this.registers.a / Math.pow(2, combo))
            break
        }
      }

      return output
    }
  }

  const init = (input: string[]): Machine => {
    const reg: Registers = {
      a: +input[0].split(': ')[1],
      b: +input[1].split(': ')[1],
      c: +input[2].split(': ')[1],
    }
    const instructions = input[4].split(' ')[1].split(',').map(Number)

    return new Machine(instructions, reg)
  }

  const solve = (device: Machine, regA: number, required: number[]): number[] => {
    regA *= 8

    const result = []
    for (let n = 0; n < 8; n++) {
      const output = device.run(regA + n)

      if (output.join(',') === required.join(',')) {
        result.push(regA + n)
      }
    }

    return result
  }

  const run = () => {
    if (props.input) {
      // Part 1
      let device: Machine = init(props.input)
      const output = device.execute()

      // Part 2
      device = init(props.input)

      const required: number[] = []
      let regOptions: Set<number> = new Set()
      regOptions.add(0)

      for (let i = device.instructions.length - 1; i >= 0; i--) {
        required.unshift(device.instructions[i])

        const temp: Set<number> = new Set()
        regOptions.forEach((a: number) => {
          const v = solve(device, a, required)

          v.forEach(vc => temp.add(vc))
        })

        regOptions = temp
      }

      const pTwo = Math.min.apply(null, [...regOptions])

      emit('onFinished', output.join(','), pTwo)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
