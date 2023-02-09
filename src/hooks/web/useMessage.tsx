import type { NotificationArgsProps, ConfigProps } from 'ant-design-vue/lib/notification'
import type { ModalFunc, ModalFuncProps } from 'ant-design-vue/lib/modal/Modal'
import { InfoCircleFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue'
import { Modal, message as Message, notification } from 'ant-design-vue'
import { isString } from '@/utils/is'
import { useI18n } from './useI18n'
export interface NotifyApi {
  info(config: NotificationArgsProps): void
  success(config: NotificationArgsProps): void
  error(config: NotificationArgsProps): void
  warn(config: NotificationArgsProps): void
  warning(config: NotificationArgsProps): void
  open(args: NotificationArgsProps): void
  close(key: String): void
  config(options: ConfigProps): void
  destroy(): void
}
export declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
export declare type IconType = 'success' | 'warning' | 'error' | 'info'
export interface ModalOptionsEx extends Omit<ModalFuncProps, 'IconTYpe'> {
  IconType: 'success' | 'warning' | 'error' | 'info'
}
export type ModalOptionsPartial = Partial<ModalOptionsEx> & Pick<ModalOptionsEx, 'content'>
interface ConfirmOptions {
  info: ModalFunc
  success: ModalFunc
  error: ModalFunc
  warn: ModalFunc
  warning: ModalFunc
}
function getIcon(iconType: string): JSX.Element {
  const map = {
    success: () => <CheckCircleFilled class="modal-icon-success" />,
    warning: () => <InfoCircleFilled class="modal-icon-warning" />,
    error: () => <CloseCircleFilled class="modal-icon-error" />,
    info: () => <InfoCircleFilled class="modal-icon-inco" />
  }
  return map[iconType]
}
function renderContent({ content }: Pick<ModalOptionsEx, 'content'>) {
  if (isString(content)) {
    return <div innerHTML={`<div>${content as string}</div>`}></div>
  } else {
    return content
  }
}
function createConfirm(options: ModalOptionsEx): ConfirmOptions {
  const iconType = options.iconType || 'warning'
  Reflect.deleteProperty(options, 'iconType')
  const opt: ModalFuncProps = {
    centered: true,
    icon: getIcon(iconType),
    ...options,
    content: renderContent(options)
  }
  return Modal.confirm(opt) as unknown as ConfirmOptions
}
function getBaseOptions() {
  const { t } = useI18n()
  return {
    okText: t('common.okText'),
    centered: true
  }
}
function createModalOptions(options: ModalOptionsPartial, icon: string): ModalOptionsPartial {
  return {
    ...getBaseOptions(),
    ...options,
    icon: getIcon(icon),
    content: renderContent(options)
  }
}
function createSuccessModal(options: ModalOptionsPartial) {
  return Modal.success(createModalOptions(options, 'success'))
}
function createErrorModal(options: ModalOptionsPartial) {
  return Modal.error(createModalOptions(options, 'error'))
}
function createInfoModal(options: ModalOptionsPartial) {
  return Modal.info(createModalOptions(options, 'info'))
}
function createWarningModal(options: ModalOptionsPartial) {
  return Modal.warning(createModalOptions(options, 'warning'))
}
notification.config({
  placement: 'topRight',
  duration: 3
})
export function useMessage() {
  return {
    createMessage: Message,
    notification: notification as NotifyApi,
    createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal
  }
}
