export interface getCodeProps {
  getCode: Function
  interval?: number
  disabled?: boolean
}
export interface getCodeEmits {
  (e: 'startCountDown', value: object): void
  (e: 'changeCountDown', value: object): void
  (e: 'endCountDown', value: object): void
  (e: 'errCountDown', value: any): void
}