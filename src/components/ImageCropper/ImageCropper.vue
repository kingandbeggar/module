<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { DeleteFilled, Plus, Minus, RefreshLeft, RefreshRight } from '@element-plus/icons-vue'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import type { imageCropperProps, imageCropperEmits } from './types'

const props = withDefaults(defineProps<imageCropperProps>(), {
  autoCropWidth: 200,
  autoCropHeight: 200,
  outputType: 'png' as const, 
  autoCrop: true,
  fixedBox: false,
  centerBox: true,
  canScale: true,
})
const emit = defineEmits<imageCropperEmits>()

const cropper = ref()
const dialogVisible = ref(props.dialogVisible)
watch(() => props.dialogVisible, (newvalue) => {
  dialogVisible.value = newvalue
})
const options = reactive({
  img: null, // 裁剪图片的地址
  ...props
})
const previews = ref({
  url: ''
})
// 实时预览事件
const realTime = (data) => {
  previews.value = data
  console.log(data, 'data')
}

// 修改图片大小 正数为变大 负数变小
const changeScale = (num) => {
  num = num || 1
  cropper.value.changeScale(num)
}
// 向左边旋转90度
const rotateLeft = () => {
  cropper.value.rotateLeft()
}
// 向右边旋转90度
const rotateRight = () => {
  cropper.value.rotateRight()
}
// 上传图片处理
const beforeUpload = (rawFile) => {
  if (rawFile.type.indexOf('image/') == -1) {
    ElMessage.error('请上传图片类型文件!')
    return false
  }
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('文件大小不能超过2MB!')
    return false
  }
  const reader = new FileReader()
  reader.readAsDataURL(rawFile)
  reader.onload = () => {
    // 图片在这里
    console.log(reader.result)
    options.img = reader.result
  }
}
const reset = () => {
    options.img = ''
    previews.value.url = ''
    // dialogVisible.value = false
  }
const finish = () => {
  cropper.value.startCrop()
  cropper.value.getCropData(data => {
    console.log('data', data)
    emit('update:dialogVisible', false)
    emit('finish', data)
    reset()
  })
}
// 打开裁剪弹窗
const openDialog = () => {
  // showCropper.value = true
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确认关闭?')
    .then(() => {
      emit('update:dialogVisible', false)
      done()
    })
    .catch(() => {
      emit('update:dialogVisible', false)
      // catch error
    })
}

</script>

<template>
<div class="imagecropper">
  <el-dialog
    v-model="dialogVisible"
    title="图片裁剪"
    width="800"
    :before-close="handleClose"
    @opened="openDialog"
  >
    <el-row>
      <el-col :span="12" style="height: 300px;">
        <vue-cropper
          ref="cropper"
          :img="options.img"
          :info="true"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          :outputType="options.outputType"
          :centerBox="options.centerBox"
          @realTime="realTime"
        />
      </el-col>
      <el-col :span="12" style="height: 300px;">
        <div class="privew-box">
          <img v-if="previews.url" :src="previews.url" :style="previews.img" />
          <span v-else></span>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 12px">
      <el-col :span="12" >
        <el-row>
          <el-col :span="4" >
            <el-upload
              action="#"
              :http-request="() => {}"
              :before-upload="beforeUpload"
              :show-file-list="false"
            >
              <el-button>选择</el-button>
            </el-upload>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <el-button :icon="DeleteFilled" @click="reset" :disabled="!options.img"></el-button>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <el-button :icon="Plus" @click="changeScale(1)" :disabled="!options.img"></el-button>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <el-button :icon="Minus" @click="changeScale(-1)" :disabled="!options.img"></el-button>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <el-button :icon="RefreshLeft" @click="rotateLeft()" :disabled="!options.img"></el-button>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <el-button :icon="RefreshRight" @click="rotateRight()" :disabled="!options.img"></el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" style="text-align: center">
        <el-button type="primary" @click="finish" :disabled="!options.img">确认</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</div>
</template>

<style scoped>
.privew-box {
  position: absolute;
  left: 75%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  /* background: black; */
  overflow: hidden;
}
</style>