<script setup>
import { computed } from "vue"

const props = defineProps({
  modelValue: String,
  start: String,
  end: String,
  duration: Number
})

const emit = defineEmits(["update:modelValue"])

function toMinutes(t) {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}

function toTime(m) {
  const h = String(Math.floor(m / 60)).padStart(2, "0")
  const mm = String(m % 60).padStart(2, "0")
  return `${h}:${mm}`
}

const times = computed(() => {
  const list = []
  const start = toMinutes(props.start)
  const end = toMinutes(props.end)
  const dur = Math.round(props.duration * 60)

  for (let t = start; t + dur <= end; t += 30) {
    list.push(toTime(t))
  }

  return list
})
</script>

<template>
  <select
    :value="modelValue"
    @change="emit('update:modelValue', $event.target.value)"
    class="rounded border p-2"
  >
    <option v-for="t in times" :key="t" :value="t">
      {{ t }}
    </option>
  </select>
</template>