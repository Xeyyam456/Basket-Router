import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiSearch } from 'react-icons/fi'
import Button from '@shared/components/Button/Button'
import Input from '@shared/components/Input/Input'
import useHeaderSearch from '@hooks/useHeaderSearch'
import { useFavorites } from '@store/FavoritesContext'
import { useBasket } from '@store/BasketContext'
import './Header.css'

function Header() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isProductsPage = pathname === '/products' || pathname === '/favorites' || pathname === '/basket'
  const isHomePage = pathname === '/'

  const { searchVal, sortVal, handleSearch, handleSort, handleReset } = useHeaderSearch()
  const { favorites } = useFavorites()
  const { basket } = useBasket()

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
          <button
            className={`header__icon-btn${pathname === '/basket' ? ' header__icon-btn--active' : ''}`}
            aria-label="Cart"
            onClick={() => navigate('/basket')}
          >
            <FiShoppingCart size={22} />
            {basket.length > 0 && <span className="header__badge">{basket.length}</span>}
          </button>
          <button
            className={`header__icon-btn${pathname === '/favorites' ? ' header__icon-btn--active' : ''}`}
            aria-label="Wishlist"
            onClick={() => navigate('/favorites')}
          >
            <FiHeart size={22} />
            {favorites.length > 0 && <span className="header__badge">{favorites.length}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

