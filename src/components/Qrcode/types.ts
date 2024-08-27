import type { QRCodeRenderersOptions } from "qrcode";
export interface QrcodeProps {
  type?: 'canvas' | 'img';
  size?: number; // 二维码大小 ==> 默认200
  content: string;
  logo?: string; // 二维码logo ==> 默认无
  iconSize?: number; // 二维码图标大小 ==> 默认40
  options?: QRCodeRenderersOptions; // 二维码配置 ==> 默认无
  errorLevel?: "L" | "M" | "Q" | "H"; // 二维码容错级别 ==> 默认H
}

export interface QrcodeDoneEventParams {
  url: string;  // 二维码DataURL数据
  ctx?: CanvasRenderingContext2D;  // 该对象为画布的2D渲染上下文，仅在tag为canvas时有效，可用于自定义绘制
}
export interface QrcodeEmits {
  (e: 'done', value: QrcodeDoneEventParams): void
  (e: 'error', value: any): void
}