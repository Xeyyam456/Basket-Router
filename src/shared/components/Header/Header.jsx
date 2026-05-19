import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header__logo">Basket</div>
      <nav className="header__nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'header__link header__link--active' : 'header__link'}>
          Ana Səhifə
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
