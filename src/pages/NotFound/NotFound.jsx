import { useNavigate } from 'react-router-dom'
import useTitle from '@hooks/useTitle'
import Button from '@shared/components/Button/Button'
import styles from './NotFound.module.css'

function NotFound() {
  useTitle('404 — Not Found')
  const navigate = useNavigate()

  return (
    <div className={styles.nf}>
      <div className={`${styles.nf__blob} ${styles['nf__blob--1']}`} aria-hidden="true" />
      <div className={`${styles.nf__blob} ${styles['nf__blob--2']}`} aria-hidden="true" />
      <div className={`${styles.nf__blob} ${styles['nf__blob--3']}`} aria-hidden="true" />
      <div className={styles.nf__grid} aria-hidden="true" />

      <div className={styles.nf__card}>
        <span className={styles.nf__badge}>404 Error</span>
        <div className={styles.nf__number} aria-hidden="true">404</div>
        <h1 className={styles.nf__title}>Səhifə tapılmadı</h1>
        <p className={styles.nf__sub}>
          Axtardığınız səhifə mövcud deyil, silinib və ya köçürülüb.
        </p>
        <div className={styles.nf__actions}>
          <Button className={`${styles.nf__btn} ${styles['nf__btn--primary']}`} onClick={() => navigate('/')}>
            Ana Səhifə
          </Button>
          <Button variant="ghost" className={`${styles.nf__btn} ${styles['nf__btn--ghost']}`} onClick={() => navigate(-1)}>
            ← Geri
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
