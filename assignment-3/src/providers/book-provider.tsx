import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import { v4 as uuid } from 'uuid'

interface InitialState {
  books: {
    id: string
    name: string
    author: string
    topic: string
  }[]
  totalPage: number | null
  isLoading: boolean
  type: string | null
  isOpen: boolean
  name: string
  bookId: string | null
}

const BookContext = createContext<{
  state: InitialState | null
  dispatch: ({ type, payload }: { type: string; payload: any }) => void
}>({
  state: null,
  dispatch: () => {},
})

export const useBook = () => useContext(BookContext)

const initialState: InitialState = {
  books: [
    {
      id: uuid(),
      name: 'Refactoring',
      author: 'Martin fowler',
      topic: 'Programming',
    },
    {
      id: uuid(),
      name: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      topic: 'Database',
    },
    {
      id: uuid(),
      name: 'The Phoenix Project',
      author: 'Gene Kim',
      topic: 'Devops',
    },
  ],
  totalPage: null,
  isLoading: false,
  type: '',
  isOpen: false,
  name: '',
  bookId: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'addBook':
      return {
        ...state,
        type: 'addBook',
        isOpen: true,
      }
    case 'onClose':
      return {
        ...state,
        type: '',
        isOpen: false,
      }
    case 'setBooks':
      return {
        ...state,
        books: action.payload.books,
        totalPage: action.payload.totalPage,
      }
    case 'confirm':
      return {
        ...state,
        type: 'confirmModal',
        isOpen: true,
        name: action.payload.name,
        bookId: action.payload.bookId,
      }

    default:
      return state
  }
}

const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const isData = localStorage.getItem('books')

    if (!isData) {
      localStorage.setItem('books', JSON.stringify(initialState.books))
    }
  }, [])

  return (
    <BookContext.Provider
      value={useMemo(() => ({ state, dispatch }), [state, dispatch])}
    >
      {children}
    </BookContext.Provider>
  )
}

export { BookProvider }
