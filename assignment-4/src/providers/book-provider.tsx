'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react'

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

const initialState: InitialState = {
  books: [],
  totalPage: null,
  isLoading: false,
  type: '',
  isOpen: false,
  name: '',
  bookId: null,
}

const BookContext = createContext<{
  state: InitialState
  dispatch: ({
    type,
    payload,
  }: {
    type?: string
    payload?: InitialState
  }) => void
}>({
  state: initialState,
  dispatch: () => {},
})

export const useBook = () => useContext(BookContext)

const reducer = (
  state: InitialState,
  action: { type?: string; payload?: any },
) => {
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
        books: action.payload?.books,
        totalPage: action.payload?.totalPage,
      }
    case 'delete':
      return {
        ...state,
        type: 'deleteBook',
        isOpen: true,
        name: action.payload?.name,
        bookId: action.payload?.bookId,
      }

    default:
      return state
  }
}

const BookProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <BookContext.Provider
      value={useMemo(() => ({ state, dispatch }), [state, dispatch])}
    >
      {children}
    </BookContext.Provider>
  )
}

export { BookProvider }
