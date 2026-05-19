import { useNavigate } from 'react-router-dom'
import useTitle from '@hooks/useTitle'
import Button from '@shared/components/Button/Button'
import './NotFound.css'

function NotFound() {
  useTitle('404 — Not Found')
  const navigate = useNavigate()

  return (
    <div className="nf">
      {/* Aurora background blobs */}
      <div className="nf__blob nf__blob--1" aria-hidden="true" />
      <div className="nf__blob nf__blob--2" aria-hidden="true" />
      <div className="nf__blob nf__blob--3" aria-hidden="true" />

      {/* Grid overlay */}
      <div className="nf__grid" aria-hidden="true" />

      <div className="nf__card">
        <span className="nf__badge">404 Error</span>

        <div className="nf__number" aria-hidden="true">404</div>

        <h1 className="nf__title">Səhifə tapılmadı</h1>
        <p className="nf__sub">
          Axtardığınız səhifə mövcud deyil, silinib və ya köçürülüb.
        </p>

        <div className="nf__actions">
          <Button className="nf__btn nf__btn--primary" onClick={() => navigate('/')}>
            Ana Səhifə
          </Button>
          <Button variant="ghost" className="nf__btn nf__btn--ghost" onClick={() => navigate(-1)}>
            ← Geri
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
