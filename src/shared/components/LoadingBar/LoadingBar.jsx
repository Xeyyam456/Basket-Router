import styles from './LoadingBar.module.css'

function LoadingBar() {
  return (
    <>
      <div className={styles['loading-bar']}>
        <div className={styles['loading-bar__track']}>
          <div className={styles['loading-bar__fill']} />
          <div className={styles['loading-bar__comet']} />
        </div>
      </div>

      <div className={styles['loading-center']}>
        <div className={styles['loading-ring']}>
          <div /><div /><div /><div />
        </div>
        <p className={styles['loading-center__text']}>Loading...</p>
      </div>
    </>
  )
}

export default LoadingBar
