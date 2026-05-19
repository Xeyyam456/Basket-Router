import { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiSearch } from 'react-icons/fi'
import Button from '@shared/components/Button/Button'
import Input from '@shared/components/Input/Input'
import useDebounce from '@hooks/useDebounce'
import './Header.css'

function Header({ cartCount = 0, wishCount = 0 }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const isProductsPage = pathname === '/products'
  const isHomePage = pathname === '/'

  const [searchVal, setSearchVal] = useState(searchParams.get('q') || '')
  const [sortVal, setSortVal] = useState(searchParams.get('sort') || '')
  const debouncedSearch = useDebounce(searchVal)

  useEffect(() => {
    setSearchParams(prev => {
      if (debouncedSearch) prev.set('q', debouncedSearch)
      else prev.delete('q')
      return new URLSearchParams(prev)
    })
  }, [debouncedSearch])

  function handleSearch(e) {
    setSearchVal(e.target.value)
  }

  function handleSort(e) {
    const val = e.target.value
    setSortVal(val)
    setSearchParams(prev => {
      if (val) prev.set('sort', val)
      else prev.delete('sort')
      return new URLSearchParams(prev)
    })
  }

  function handleReset() {
    setSearchVal('')
    setSortVal('')
    setSearchParams({})
  }

  return (
    <header className={`header${isHomePage ? ' header--home' : ''}`}>
      <div className="header__left">
        {isProductsPage && (
          <>
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
          </>
        )}
      </div>

      {!isHomePage && (
        <div className="header__search-wrap">
          <Input
            placeholder="Search products..."
            value={searchVal}
            onChange={handleSearch}
            icon={<FiSearch size={16} />}
          />
        </div>
      )}

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
            {cartCount > 0 && <span className="header__badge">{cartCount}</span>}
          </button>
          <button className="header__icon-btn" aria-label="Wishlist" onClick={() => navigate('/favorites')}>
            <FiHeart size={22} />
            {wishCount > 0 && <span className="header__badge">{wishCount}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

