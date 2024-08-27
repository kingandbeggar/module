<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Qrcode from './components/Qrcode/Qrcode.vue';
import type { QRCodeRenderersOptions } from "qrcode";

const qrcodeRef = ref();
const formData = reactive({
  content: '666',
  size: 200,
  iconSize: 40,
  errorLevel: "L",
  type: 'canvas',
  options: {
    margin: 1,
    scale: 4,
    color: {
      dark: '#0000FF',
      light: '#FF0000'
    }
  },
  logo: 'https://www.4huadian.com/uppic/xianhua/20233141.jpg'
});

const handleDownload = () => {
  if (qrcodeRef.value && typeof qrcodeRef.value.downLoadQRCode === 'function') {
    qrcodeRef.value.downLoadQRCode('myQRCode', 'png');
  }
};
const generateQrcode = () => {
  qrcodeRef.value.initQrcode();
}
const qrcodeDone = (value: QRCodeRenderersOptions) => {
  console.log("生成成功！！！",value)
  // const ctx = value.ctx
  // // 额外绘制
  // // const {url, ctx} = value
  //   ctx.fillStyle = 'black';
  //   ctx.font = '16px "微软雅黑"';
  //   ctx.textBaseline = 'bottom';
  //   ctx.textAlign = 'center';
  //   ctx.fillText('你帅你先扫', 100, 195, 500);
}
const error = (error: any) => {
  console.log('出错了！！！！！', error )
}
</script>

<template>
  <div class="app">
    <div class="container">
      <div class="form-container">
        <form @submit.prevent="generateQrcode">
          <!-- 输入类型 -->
          <div class="form-group">
            <div class="form-group-left">
              <label for="type">类型：</label>
            </div>
            <div class="form-group-right">
              <select name="type" id="type" v-model="formData.type">
                <option value="img">img</option>
                <option value="canvas">canvas</option>
              </select>
            </div>

          </div>
          <!-- 内容 -->
          <div class="form-group">
            <div class="form-group-left">
              <label for="content">内容：</label>
            </div>
            <div class="form-group-right">
              <input 
                id="content"
                type="text"
                placeholder="请输入你要生成二维码的内容"
                v-model="formData.content"
              >
            </div>
          </div>
          <!-- 二维码尺寸 -->
          <div class="form-group">
            <div class="form-group-left">
              <label for="size">二维码尺寸：</label>
            </div>
            <div class="form-group-right">
              <input 
                id="size"
                type="number"
                min="100"
                max="300"
                placeholder="请输入你要生成二维码的二维码尺寸"
                v-model="formData.size"
              >
            </div>
          </div>
          <!-- 输入图标大小 -->
          <div class="form-group">
            <div class="form-group-left">
              <label for="iconSize">小图标尺寸：</label>
            </div>
            <div class="form-group-right">
              <input 
                id="iconSize"
                type="number"
                min="10"
                max="300"
                placeholder="输入图标大小"
                v-model="formData.iconSize"
              >
            </div>
          </div>
          <!-- 选择错误级别 -->
          <div class="form-group">
            <div class="form-group-left">
              <label for="errorLevel">错误级别:</label>
            </div>
            <div class="form-group-right">
              <select name="errorLevel" id="errorLevel" v-model="formData.errorLevel">
                <option value="L">L (7%)</option>
                <option value="M">M (15%)</option>
                <option value="Q">Q (25%)</option>
                <option value="H">H (30%)</option>
              </select>
            </div>
          </div>
          <!-- 输入边距 -->
          <div class="form-group">
            <div class="form-group-left">
              <label for="margin">输入边距：</label>
            </div>
            <div class="form-group-right">
              <input 
                id="margin"
                v-model.number="formData.options.margin"
                type="number"
                min="0"
                placeholder="输入边距"
              >
            </div>
          </div>
          <!-- 缩放 -->
          <div class="form-group">
            <div class="form-group-left">
              <label for="scale">缩放:</label>
            </div>
            <div class="form-group-right">
              <input
                id="scale"
                v-model.number="formData.options.scale"
                type="number"
                min="1"
                placeholder="输入缩放比例"
              />
            </div>
          </div>
          <!-- 前景色 -->
          <div class="form-group">
            <div class="form-group-left">
              <label for="darkColor">前景色:</label>
            </div>
            <div class="form-group-right">
              <input
                id="darkColor"
                v-model.number="formData.options.color.dark"
                type="color"
              />
            </div>
          </div>
          <!-- 背景色 -->
          <div class="form-group">
            <div class="form-group-left">
              <label for="lightColor">背景色:</label>
            </div>
            <div class="form-group-right">
              <input
                id="lightColor"
                v-model="formData.options.color.light"
                type="color"
              />
            </div>
          </div>
          <!-- logo -->
          <div class="form-group">
            <div class="form-group-left">
              <label for="logo">Logo URL:</label>
            </div>
            <div class="form-group-right">
              <input
                id="logo"
                v-model="formData.logo"
                type="text"
                placeholder="输入 Logo 的 URL"
              />
            </div>
          </div>
          <!-- 生成 -->
           <button type="submit" class="generate-btn">生成二维码</button>
           <button class="download-btn" @click="handleDownload">下载二维码</button>
        </form>
      </div>
      <!-- Qrcode 组件部分 -->
      <div class="qrcode-display">
        <Qrcode
          ref="qrcodeRef"
          :content="formData.content"
          :logo="formData.logo"
          :type="formData.type"
          :size="formData.size"
          :icon-size="formData.iconSize"
          :error-level="formData.errorLevel"
          :options="formData.options"
          @done="qrcodeDone"
          @error="error"
        ></Qrcode>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  /* min-width: 769px; */
  .form-container {
    width: 50%;
    padding-right: 10px;
    text-align: center;
    button[type="submit"] {
      padding: 10px 15px;
      font-size: 16px;
      cursor: pointer;
      background-color: #007BFF;
      color: white;
      border: none;
      border-radius: 4px;
      width: 60%; 
    }
    .form-group {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      gap: 10px;
      .form-group-left {
        display: flex;
        flex: 1;
        justify-content: end;
      }
      .form-group-right {
        display: flex;
        flex: 1;
        input {
          width: 50%;
        }
      }
    }
  }

  .download-btn {
    margin-top: 20px;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    background-color: #28A745;
    color: white;
    border: none;
    border-radius: 4px;
    width: 60%; 
  }
  .qrcode-display {
    width: 50%;
  }
}
@media (max-width: 769px) {
  .container {
    flex-direction: column;
    .form-container {
      width: 100%;
      min-width: 300px;
    }
    .qrcode-display {
      text-align: center;
      margin-top: 20px;
      width: 100%;
      min-width: 300px;
    }
  }
}
</style>
