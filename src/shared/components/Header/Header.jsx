import clsx from 'clsx'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiSearch } from 'react-icons/fi'
import Button from '@shared/components/Button/Button'
import Input from '@shared/components/Input/Input'
import useHeaderSearch from '@hooks/useHeaderSearch'
import { useFavorites } from '@store/favoritesStore'
import { useBasket } from '@store/basketStore'
import styles from './Header.module.css'

function Header() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isProductsPage = pathname === '/products' || pathname === '/favorites' || pathname === '/basket'
  const isHomePage = pathname === '/'

  const { searchVal, sortVal, handleSearch, handleSort, handleReset } = useHeaderSearch()
  const { favorites } = useFavorites()
  const { basket } = useBasket()

  return (
    <header className={clsx(styles.header, isHomePage && styles['header--home'])}>
      <div className={styles['header__left']}>
        {isHomePage && (
          <Link to="/" className={styles['header__logo']}>
            <span className={styles['header__logo-dummy']}>Dummy</span>
            <span className={styles['header__logo-json']}>JSON</span>
          </Link>
        )}
        {isProductsPage && (
          <>
            <select
              className={styles['header__select']}
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
        <div className={styles['header__search-wrap']}>
          <Input
            placeholder="Search products..."
            value={searchVal}
            onChange={handleSearch}
            icon={<FiSearch size={16} />}
          />
        </div>
      )}

      <div className={styles['header__right']}>
        <nav className={styles['header__nav']}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(styles['header__link'], isActive && styles['header__link--active'])
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              clsx(styles['header__link'], isActive && styles['header__link--active'])
            }
          >
            Products
          </NavLink>
        </nav>

        <div className={styles['header__actions']}>
          <button
            className={clsx(styles['header__icon-btn'], pathname === '/basket' && styles['header__icon-btn--active'])}
            aria-label="Cart"
            onClick={() => navigate('/basket')}
          >
            <FiShoppingCart size={22} />
            {basket.length > 0 && <span className={styles['header__badge']}>{basket.length}</span>}
          </button>
          <button
            className={clsx(styles['header__icon-btn'], pathname === '/favorites' && styles['header__icon-btn--active'])}
            aria-label="Wishlist"
            onClick={() => navigate('/favorites')}
          >
            <FiHeart size={22} />
            {favorites.length > 0 && <span className={styles['header__badge']}>{favorites.length}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

