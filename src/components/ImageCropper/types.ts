export interface imageCropperProps {
  dialogVisible: boolean
  autoCropWidth?: number // 默认生成截图框宽度 默认容器的 80%
  autoCropHeight?: number // 默认生成截图框高度 默认容器的 80%
  outputType?: 'png' | 'jpeg' | 'webp' // 裁剪生成图片的格式 jpeg, png, webp
  autoCrop?: boolean, // 是否默认生成截图框
  fixedBox?: boolean // 固定截图框大小
  centerBox?: boolean //截图框是否被限制在图片里面
  canScale?: boolean //图片是否允许滚轮缩放
}
export interface imageCropperEmits {
  (e: 'finish', value: any): void
  (e: 'update:dialogVisible', value: boolean): void
}