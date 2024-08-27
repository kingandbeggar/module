<script lang="ts" setup>
import imageCropper from './components/ImageCropper/ImageCropper.vue';
import { ref } from 'vue'
const dialogVisible = ref(false)
const res = ref('')
const finish = (data) => {
  res.value = data
  console.log(data, 'result')
}

</script>

<template>
  <div class="app">
    <el-button plain @click="dialogVisible = true">
      打开裁剪工具
    </el-button>
    <imageCropper v-model:dialogVisible="dialogVisible" @finish="finish" :autoCropWidth="300"></imageCropper>
    <img :src="res" >
  </div>
</template>

<style scoped>
  
</style>