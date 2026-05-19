import { memo, useRef, useState, useEffect } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import ProductCard from '@shared/components/ProductCard/ProductCard'
import styles from './ProductGrid.module.css'

const MIN_COL_WIDTH = 260
const GAP = 24
const ROW_HEIGHT = 444 // card ~420px + 24px gap

function ProductGrid({ products, favorites = [], basket = [], onAddToCart, onToggleFavorite, onRemove, getQuantity, onIncrement, onDecrement }) {
  const listRef = useRef(null)
  const [columns, setColumns] = useState(4)

  // Ekran eni dəyişdikdə sütun sayını yenilə
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      setColumns(Math.max(1, Math.floor((w + GAP) / (MIN_COL_WIDTH + GAP))))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const rowCount = Math.ceil(products.length / columns)

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => ROW_HEIGHT,
    overscan: 3,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  })

  return (
    <div ref={listRef} className={styles.grid}>
      <div className={styles.inner} style={{ '--total': `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map(virtualRow => {
          const rowStart = virtualRow.index * columns
          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              className={styles.row}
              style={{
                '--row-start': `${virtualRow.start - virtualizer.options.scrollMargin}px`,
                '--cols': columns,
              }}
            >
              {Array.from({ length: columns }, (_, col) => {
                const product = products[rowStart + col]
                if (!product) return <div key={`ph-${col}`} />
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.some(f => f.id === product.id)}
                    isInBasket={basket.some(b => b.id === product.id)}
                    quantity={getQuantity ? getQuantity(product.id) : undefined}
                    onAddToCart={onAddToCart}
                    onToggleFavorite={onToggleFavorite}
                    onRemove={onRemove}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default memo(ProductGrid)
