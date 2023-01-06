import type { PropType } from 'vue'

const validColors = ['error', 'warning', 'success', ''] as const
type ButtonColorType = typeof validColors[number]

export const buttonProps = {
  color: {
    type: String as PropType<ButtonColorType>,
    validator: (v: any) => validColors.includes(v),
    default: ''
  },
  loading: { type: Boolean },
  disabled: { type: Boolean },
  preIcon: { type: String },
  postIcon: { type: String },
  iconSize: {
    type: Number,
    default: 14
  },
  onClick: {
    type: Function as PropType<(...args: any) => any>,
    default: null
  }
}
