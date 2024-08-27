<script lang="ts" setup>
import QRCode from 'qrcode';
import { onMounted, ref, watch } from 'vue';
import type { QrcodeEmits, QrcodeProps } from './types';
import { generateUUID } from "@/utils/generateUUID";

const props = withDefaults(defineProps<QrcodeProps>(), {
	type: 'img',
	size: 200,
	iconSize: 40
})
const emits = defineEmits<QrcodeEmits>()
const canvasId = ref("canvas" + generateUUID());
const qrcodeUrl = ref<string>('')
const innerContent = ref(props.content)
watch(() => props.content, (newvalue) => {
	innerContent.value = newvalue
})

const initQrcode = async () => {
	try {
		if(props.type === 'canvas') {
			const canvasRef: any = await QRCode.toCanvas(document.getElementById(canvasId.value), innerContent.value, {
				width: props.size,
				margin: 2,
				errorCorrectionLevel: props.errorLevel,
				...props.options
			})
			if(props.logo) {
				const ctx = canvasRef.getContext('2d')
				const iconBgW = props.iconSize + 5
				const iconBgH = props.iconSize + 5
				const iconBgX = (canvasRef.width - iconBgW) / 2
				const iconBgY = (canvasRef.width - iconBgH) / 2
				ctx.fillStyle = "#fff"
				ctx.fillRect(iconBgX, iconBgY, iconBgW, iconBgH);

				//logo
				const iconX = (canvasRef.width - props.iconSize) / 2
				const iconY = (canvasRef.width - props.iconSize) / 2
				const image = new Image()
				image.src = props.logo
				//onload会在图像成功加载后（浏览器已从指定路径（无论是本地文件系统还是通过网络）完整下载并解析了图像文件。这意味着图像的所有数据都已获取，浏览器已经准备好使用该图像）被调用
				image.crossOrigin = "Anonymous"; // 设置图片的跨域属性
				image.onload = () => {
					ctx.drawImage(image, iconX, iconY, props.iconSize, props.iconSize)
					qrcodeUrl.value = canvasRef.toDataURL();
					emits('done', {
						url: qrcodeUrl.value,
						ctx
					})			
				}
			} else {
				qrcodeUrl.value = canvasRef.toDataURL();
				emits('done', {
					url: qrcodeUrl.value
				})			
			}
		} else {
			qrcodeUrl.value = await QRCode.toDataURL(innerContent.value, {
				width: props.size,
				margin: 2,
				errorCorrectionLevel: props.errorLevel,
				...props.options
			})
			emits('done', {
				url: qrcodeUrl.value
			})			
		}
	} catch (error) {
		emits('error', error)
	}

}
onMounted(() => {
	// initQrcode()
})
const downLoadQRCode = (fileName: string = generateUUID(), fileType: string = 'png') => {
	const exportFile = document.createElement('a')
	exportFile.style.display = 'none'
	exportFile.download = `${fileName}.${fileType}`
	exportFile.href = qrcodeUrl.value
	document.body.appendChild(exportFile)
	exportFile.click()
	document.body.removeChild(exportFile)
}
defineExpose({
	downLoadQRCode,
	initQrcode
})
</script>

<template>
	<div class="jsd-qrcode">
		<canvas :id="canvasId" v-if="props.type === 'canvas'"></canvas>
		<img :src="qrcodeUrl" v-else>
	</div>
</template>

<style scoped>
	
</style>