import { Component } from 'react'

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
        <div style={{
          minHeight: '100vh',
          background: '#0f172a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          color: '#f1f5f9',
          fontFamily: 'system-ui, sans-serif',
          padding: '24px',
          textAlign: 'center',
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Xəta baş verdi</h1>
          <p style={{ color: '#94a3b8', maxWidth: '400px' }}>
            Gözlənilməz bir xəta yarandı. Səhifəni yeniləyin.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 28px',
              background: '#38bdf8',
              color: '#0f172a',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.95rem',
            }}
          >
            Yenilə
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
