<script lang="ts" setup>
import { computed, reactive, ref, toRaw, watch } from 'vue';
import type { getCodeProps, getCodeEmits } from './types';

const props = withDefaults(defineProps<getCodeProps>(), {
  interval: 60,
  disabled: false
})
const emits = defineEmits<getCodeEmits>()

const innerDisabled = ref(props.disabled)
watch(() => props.disabled, (newValue) => {
  innerDisabled.value = newValue
})

const states = reactive({
  seconds: 0,
  count: 0,
  enableCountDown: false
})
let timer:any 
const lastSeconds = computed(() => {
  return props.interval - states.seconds
})
const getcode = async () => {
  try {
    if(innerDisabled.value) return
    if(states.enableCountDown) return
    innerDisabled.value = true
    await props.getCode()
    states.count++
    states.enableCountDown = true
    innerDisabled.value = true
    timer = setInterval(() => {
      states.seconds++
      emits('changeCountDown', {...toRaw(states), interval: props.interval})
      if(props.interval === states.seconds - 1) {
        emits('endCountDown', {...toRaw(states), interval: props.interval})
        reset()
        clearInterval(timer)
      }      
    }, 1000);
  } catch (error) {
    emits('errCountDown', error)
    reset()
  }
}

const reset = () => {
  states.enableCountDown = false
  states.seconds = 0
  innerDisabled.value = false
  clearInterval(timer)
}
</script>

<template>
  <div 
    class="getcode"
    @click="getcode"
    :class="{
      'is-disabled': innerDisabled
    }"
  >
    <slot v-if="!states.enableCountDown" :count="states.count">获取验证码</slot>
    <slot name="countDown" v-else :interval="interval" :seconds="states.seconds">重新获取{{ lastSeconds }}s</slot>
  </div>
</template>

<style scoped>
  .getcode {
    display: inline-block;
    cursor: pointer;
    user-select: none;
    &.is-disabled {
      cursor: not-allowed;
      color: #ccc;
    }
  }
</style>