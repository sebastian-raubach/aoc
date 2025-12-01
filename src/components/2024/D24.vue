<template>
  <span />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    input?: string[],
  }>()

  const emit = defineEmits(['onFinished'])

  interface GateMap {
    [key: string]: number
  }

  interface Connection {
    a: string
    b: string
    res: string
    op: string
  }

  const run = () => {
    if (props.input) {
      const gateStates: GateMap = {}
      const gates: Set<string> = new Set()
      const conns: Connection[] = []

      const pattern = /(?<one>[a-z0-9]{3})\s(?<op>(AND|XOR|OR))\s(?<two>[a-z0-9]{3})\s->\s(?<res>[a-z0-9]{3})/

      let helium = 'Line\tParent'
      let isConns = false
      props.input.forEach((s: string) => {
        if (s.length < 1) {
          isConns = true
        } else if (isConns) {
          const res = s.match(pattern)?.groups

          if (res) {
            gates.add(res.one)
            gates.add(res.two)
            gates.add(res.res)
            conns.push({
              a: res.one,
              b: res.two,
              res: res.res,
              op: res.op,
            })
            helium += `\n${res.res}\t${res.one}`
            helium += `\n${res.res}\t${res.two}`
          }
        } else {
          const [gate, bit] = s.split(': ').map((c, i) => i === 1 ? +c : c) as [string, number]
          gates.add(gate)
          gateStates[gate] = bit
        }
      })

      console.log(helium)

      console.log(gates, conns)

      const zCount = [...gates].filter(g => g.startsWith('z')).length

      while (Object.keys(gateStates).filter(g => g.startsWith('z')).length !== zCount) {
        gates.forEach(g => {
          if (gateStates[g] === undefined) {
            const rule = conns.find(c => c.res === g)
            if (rule) {
              const a = gateStates[rule.a]
              const b = gateStates[rule.b]

              if (a !== undefined && b !== undefined) {
                switch (rule.op) {
                  case 'AND':
                    gateStates[g] = a & b
                    break
                  case 'OR':
                    gateStates[g] = a | b
                    break
                  case 'XOR':
                    gateStates[g] = a ^ b
                    break
                }
              }
            }
          }
        })
      }

      const zs = [...gates].filter(g => g.startsWith('z'))
      zs.sort((a, b) => b.localeCompare(a))

      const pOne = parseInt(zs.map(z => gateStates[z]).join(''), 2)

      emit('onFinished', pOne, null)
    }
  }

  watch(() => props.input, () => run(), { immediate: true })
</script>

<style>

</style>
