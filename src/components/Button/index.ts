import { withInstall } from '@/utils'
import type { ExtractPropTypes } from 'vue'
import type { buttonProps } from './src/props'
import button from './src/BasicButton.vue'
import popConfirmButton from './src/PopConfirmButton.vue'

export const Button = withInstall(button)
export const PopConfirmButton = withInstall(popConfirmButton)
export declare type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>
