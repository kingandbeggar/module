<script lang="ts" setup>
import imageCropper from './components/ImageCropper/ImageCropper.vue';
import { ref } from 'vue'
const dialogVisible = ref(false)
const res = ref('')
const finish = (data) => {
  res.value = data
  console.log(data, 'result')
}
const btnClick = () => {
  dialogVisible.value = true
  console.log(dialogVisible.value)
}
</script>

<template>
  <div class="app">
    <el-button plain @click="btnClick">
      打开裁剪工具
    </el-button>
    <imageCropper v-model:dialogVisible="dialogVisible" @finish="finish" :autoCropWidth="300"></imageCropper>
    <img :src="res" >
  </div>
</template>

<style scoped>
  
</style>