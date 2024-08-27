export interface lazyLoadImgProps {
  url?: string;
  index?: number;
  placeholder?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
  radius?: number;
  triggerDistance?: string;
  useLazy?: boolean;
}
export interface lazyLoadImgEmits {
  (e: 'click', value: any): void
  (e: 'load', value: any): void
  (e: 'error', value: any): void
}