import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiSearch } from 'react-icons/fi'
import Button from '@shared/components/Button/Button'
import './Header.css'

function Header({ cartCount = 0, wishCount = 0, onSearch, onSort, onReset }) {
  const navigate = useNavigate()
  const [searchVal, setSearchVal] = useState('')
  const [sortVal, setSortVal] = useState('')

  function handleSearch(e) {
    setSearchVal(e.target.value)
    onSearch?.(e.target.value)
  }

  function handleSort(e) {
    setSortVal(e.target.value)
    onSort?.(e.target.value)
  }

  function handleReset() {
    setSearchVal('')
    setSortVal('')
    onReset?.()
  }

  return (
    <header className="header">
      {/* Sol — Sort + Reset */}
      <div className="header__left">
        <select
          className="header__select"
          value={sortVal}
          onChange={handleSort}
        >
          <option value="">Sort by</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="name-desc">Name: Z → A</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
        <Button onClick={handleReset}>Reset</Button>
      </div>

      {/* Mərkəz — Axtarış */}
      <div className="header__search-wrap">
        <FiSearch className="header__search-icon" />
        <input
          className="header__search"
          type="text"
          placeholder="Search products..."
          value={searchVal}
          onChange={handleSearch}
        />
      </div>

      {/* Sağ — Nav + İkonlar */}
      <div className="header__right">
        <nav className="header__nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'header__link header__link--active' : 'header__link'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? 'header__link header__link--active' : 'header__link'
            }
          >
            Products
          </NavLink>
        </nav>

        <div className="header__actions">
          <button className="header__icon-btn" aria-label="Cart" onClick={() => navigate('/basket')}>
            <FiShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="header__badge">{cartCount}</span>
            )}
          </button>
          <button className="header__icon-btn" aria-label="Wishlist" onClick={() => navigate('/favorites')}>
            <FiHeart size={22} />
            {wishCount > 0 && (
              <span className="header__badge">{wishCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

