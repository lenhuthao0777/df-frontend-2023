import { ChangeEvent, FC, useRef } from 'react'
import { PlusCircle } from 'lucide-react'

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { useBook } from '../../providers/book-provider'

interface SearchProps {
  onSearch: (value: any) => void
}
const Search: FC<SearchProps> = ({ onSearch }) => {
  const { dispatch } = useBook()

  const typingTimeRef = useRef<any>()

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (typingTimeRef.current) {
      clearTimeout(typingTimeRef.current)
    }

    typingTimeRef.current = setTimeout(() => {
      const formValue = {
        searchTerm: e.target.value,
      }
      onSearch(formValue)
    }, 300)
  }

  return (
    <div className="flex items-center justify-end bg-white dark:bg-black py-2 px-5 shadow rounded-md">
      <Input
        onChange={handleSearch}
        className="w-60"
        placeholder="Search by name"
      />

      <Button
        variant="danger"
        className="ml-2"
        onClick={() => dispatch({ type: 'addBook' })}
      >
        <PlusCircle className="w-5 h-5" />
      </Button>
    </div>
  )
}

export default Search
