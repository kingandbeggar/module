<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, onMounted, ref, computed } from 'vue';
import type { lazyLoadImgProps, lazyLoadImgEmits } from './types';

const props = withDefaults(defineProps<lazyLoadImgProps>(), {
  url: '',
  placeholder: '',
  backgroundColor: 'red',
  width: 200,
  height: 100,
  radius: 5,
  triggerDistance: '0px',
  useLazy: true,
});
const emit = defineEmits<lazyLoadImgEmits>()

const isIntersecting = ref(false);  
const displayUrl = ref('')
const imgRef = ref()
const containerRef = ref()
const isLoaded = ref(false)
let observer: IntersectionObserver | null = null
const errorLoad = ref(false)

const containerStyles = computed(() => ({
  borderRadius: `${props.radius}px`,
  overflow: 'hidden',
  width: `${props.width}px`,
  height: `${props.height}px`
}))
const imageStyles = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
  opacity: isLoaded.value ? 1 : 0
}))
const placeholderStyles = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
}))
const errorStyles = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
}))

const setupObserver = () => {
  console.log('设置观察器');
  if(observer) {
    observer.disconnect()
  }
  observer = new IntersectionObserver((entries) => {
    isIntersecting.value = entries[0].isIntersecting
    if (isIntersecting.value && !isLoaded.value) {
      isLoaded.value = true
      displayUrl.value = props.url;
      observer?.unobserve(entries[0].target);
    }
  }, {
    rootMargin: props.triggerDistance
  })

  if(containerRef.value) {
    observer.observe(containerRef.value)
  }
}
const handleLoad = () => {
  console.log('触发onload')
  isLoaded.value = true;
  emit('load', props.index);
};
const handleError = () => {
  console.log('触发error')
  isLoaded.value = false;
  errorLoad.value = true;
  emit('load', props.index);
};
const handleClick = () => {
  console.log('触发click')
  emit('click', props.index);
};
onMounted(() => {
  if (!props.useLazy) {
    displayUrl.value = props.url;
  } else {
    setupObserver();
  }
})

</script>

<template>
<div class="lazyloading" :style="containerStyles" ref="containerRef">
  <img class="image" ref="imgRef" :src="displayUrl" :style="imageStyles" @load="handleLoad" @error="handleError" @click="handleClick" v-if="isLoaded">
  <div class="placeholder" :style="placeholderStyles" v-if="!isLoaded && !errorLoad">
    <slot name="placeholder">
      <img src="https://p0.meituan.net/csc/daa314155c8b435eebd257a5f823080e16495.png" alt="">
    </slot>
  </div>
  <div class="error" :style="errorStyles" v-if="errorLoad">
    <slot name="error">
      <img src="https://p1.meituan.net/csc/7411aa7afaa95dbd888b5dbecedf8d58308361.png" alt="">
    </slot>
  </div>
</div>
</template>

<style scoped>
.error {
  img {
    width: 100%;
  }
}
</style>