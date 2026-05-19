import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Button from '@shared/components/Button/Button'
import styles from './ConfirmModal.module.css'

function ConfirmModal({ isOpen, message = 'Are you sure?', confirmText = 'Delete', cancelText = 'Cancel', onConfirm, onCancel }) {
  useEffect(() => {
    if (!isOpen) return
    function onKey(e) {
      if (e.key === 'Escape') onCancel?.()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onCancel])

  if (!isOpen) return null

  return createPortal(
    <div className={styles['confirm-modal__overlay']} onClick={onCancel}>
      <div className={styles['confirm-modal']} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <p className={styles['confirm-modal__message']}>{message}</p>
        <div className={styles['confirm-modal__actions']}>
          <Button variant="secondary" onClick={onCancel}>{cancelText}</Button>
          <Button variant="danger" onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ConfirmModal
