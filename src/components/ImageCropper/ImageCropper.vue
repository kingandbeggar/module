<script lang="ts" setup>
import Cropper from 'cropperjs';
import { onMounted, ref } from 'vue';
const imageRef = ref()
onMounted(() => {
  if (imageRef.value) {
    const cropper = new Cropper(imageRef.value, {
      aspectRatio: 4 / 3, // 裁剪比例
      viewMode: 0, // 裁剪模式
      cropBoxMovable: true, // 允许移动裁剪框
      cropBoxResizable: true, // 允许调整裁剪框大小
      // zoomable: true, // 允许缩放
      // zoomOnTouch: true, // 不允许触摸缩放
      // zoomOnWheel: true, // 不允许鼠标滚轮缩放
      // zoomOnDoubleClick: true, // 不允许双击缩放
      // toggleDragModeOnDblclick: false, // 不允许双击切换拖拽模式
      // responsive: true, // 响应窗口大小变化
      autoCropArea: 0.5, // 自动裁剪区域的比例(裁剪框的默认宽高比)
      // modal: true, // 取消遮罩层
      background: false, // 取消背景
      // guides: true, // 显示裁剪框内部的网格线
      // dragMode: 'corp', // 拖动模式
      rotatable: true, // 允许旋转
    });
  }
});
</script>

<template>
<div class="imagecrapper">
  <img  ref="imageRef" src="./3a47d64a0a3a48a28d22d8e4763b94b5.jpeg" alt="Picture">
</div>
</template>

<style scoped>
  .imagecropper {
  max-width: 400px;
  max-height: 400px;
}
</style>