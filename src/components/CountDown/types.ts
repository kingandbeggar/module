export interface countdownProps {
  time?: number | string
  end?: number | string
  autoStart?: boolean
}
export interface countdownEmits {
  (e: 'change', value: object): void
  (e: 'finish', value: any): void
}