<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import type { countdownProps, countdownEmits } from './types';


const props = withDefaults(defineProps<countdownProps>(), {
  autoStart: true
})
const emits = defineEmits<countdownEmits>()

let requestAnimationFrameId = ref(0)
const remainTime = ref(0) //剩余时间
let endTime = ref(0) //结束时间
const counting = ref(false) // 是否正在计时

const handleEndTime = () => {
  if(props.end && props.time) {
    endTime.value = Date.now() + +props.time
  } else if (props.end) {
    endTime.value = String(props.end).length >= 13 ? +props.end  : +props.end * 1000
  } else {
    endTime.value = Date.now() + +props.time!
  }
}
function durationFormatter(time:any) {
  if (time <= 0) return {dd: 0, hh: 0, mm: 0, ss: 0, ms: 0}
  const ss = Math.floor((time / 1000) % 60); // 计算剩余秒数
  const mm = Math.floor((time / 1000 / 60) % 60); // 计算剩余分钟数
  const hh = Math.floor((time / (1000 * 60 * 60)) % 24); // 计算剩余小时数
  const dd = Math.floor(time / (1000 * 60 * 60 * 24)); // 计算剩余天数
  const ms = (time % 1000); // 计算剩余的毫秒数
  return {dd, hh, mm, ss, ms}
}

const formatTime = computed(() => {
  return durationFormatter(remainTime.value)
})
const countDown = () => {
  remainTime.value = Math.max(0, endTime.value - Date.now())
  emits('change', formatTime.value)
  if(remainTime.value <= 0) {
    cancelAnimationFrame(requestAnimationFrameId.value)
    emits('finish', formatTime.value)
    return
  }
  requestAnimationFrameId.value = requestAnimationFrame(countDown)
}

const start = () => {
  if(counting.value) return
  counting.value = true
  handleEndTime()
  countDown()
}
const pause = () => {
  if(!counting.value) return
  counting.value = false
  cancelAnimationFrame(requestAnimationFrameId.value)
}
const reset = () => {
  pause()
  handleEndTime()
  if(props.autoStart) {
    countDown()
    counting.value = true
  }
}
watch([() => props.time, () => props.end], (newtime, newend) => {
  handleEndTime()
  if(props.autoStart) {
    countDown()
    counting.value = true
  }
},{immediate: true})
defineExpose({
  start,
  pause,
  reset
})
</script>

<template>
  <div class="countdown">
    <slot v-bind="{
      'DD':`00${formatTime.dd}`.slice(-2),
      'HH':`00${formatTime.hh}`.slice(-2),
      'MM':`00${formatTime.mm}`.slice(-2),
      'SS':`00${formatTime.ss}`.slice(-2),
      'MS':formatTime.ms
    }">
      <h1>{{ formatTime }}</h1>
    </slot>
  </div>
</template>

<style scoped>
  
</style>