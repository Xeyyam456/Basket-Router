import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import useDebounce from '@hooks/useDebounce'

function useHeaderSearch() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [searchVal, setSearchVal] = useState(searchParams.get('q') || '')
  const [sortVal, setSortVal] = useState(searchParams.get('sort') || '')
  const debouncedSearch = useDebounce(searchVal)

  useEffect(() => {
    setSearchParams(prev => {
      if (debouncedSearch) prev.set('q', debouncedSearch)
      else prev.delete('q')
      return new URLSearchParams(prev)
    }, { replace: true })
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
    }, { replace: true })
  }

  function handleReset() {
    setSearchVal('')
    setSortVal('')
    setSearchParams({})
  }

  return { searchVal, sortVal, handleSearch, handleSort, handleReset }
}

export default useHeaderSearch
