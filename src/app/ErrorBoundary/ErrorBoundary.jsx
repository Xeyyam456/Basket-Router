import { Component } from 'react'
import styles from './ErrorBoundary.module.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrap}>
          <h1 className={styles.title}>Xəta baş verdi</h1>
          <p className={styles.sub}>
            Gözlənilməz bir xəta yarandı. Səhifəni yeniləyin.
          </p>
          {this.state.error && (
            <pre className={styles.message}>
              {this.state.error.message}
            </pre>
          )}
          <button className={styles.btn} onClick={() => window.location.reload()}>
            Yenilə
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
