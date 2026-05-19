import { toast } from 'react-toastify'

export function notifySuccess(message) {
  toast.success(message, { position: 'top-right', autoClose: 2000 })
}

export function notifyError(message) {
  toast.error(message, { position: 'top-right', autoClose: 3000 })
}

export function notifyInfo(message) {
  toast.info(message, { position: 'top-right', autoClose: 2000 })
}
