<script lang="ts" setup>
import { ref } from 'vue';
import CountDown from './components/CountDown/CountDown.vue';
const countdownRef = ref()
const pause = () => {
  countdownRef.value.pause()
}
const start = () => {
  countdownRef.value.start()
}
const reset = () => {
  countdownRef.value.reset()
}
const change = (obj) => {
  // console.log(obj)
}
const changeend = () => {
  end.value = 1724421861
}
const end = ref(1724411061)
</script>

<template>
<div class="app">
  <CountDown 
    #default="{DD, HH, MM, SS, MS}"
    ref="countdownRef"
    @change="change"
    :end="end"
  >
    <h1>{{ DD }}-{{ HH }}:{{ MM }}:{{ SS }}</h1>
    <div class="btns">
      <button @click="start">start</button>
      <button @click="pause">pause</button>
      <button @click="reset">reset</button>
      <button @click="changeend">changeend</button>
    </div>
  </CountDown>
</div>
</template>

<style scoped>
  
</style>