import { createContext, useContext, useReducer } from 'react';

const BookContext = createContext(null);

export const useBook = () => useContext(BookContext);

const initialState = {
  books: [],
  totalPage: null,
  isLoading: false,
  type: '',
  isOpen: false,
  name: '',
  bookId: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'addBook':
      return {
        ...state,
        type: 'addBook',
        isOpen: true,
      };
    case 'onClose':
      return {
        ...state,
        type: '',
        isOpen: false,
      };
    case 'setBooks':
      return {
        ...state,
        books: action.payload.books,
        totalPage: action.payload.totalPage,
      };
    case 'confirm':
      return {
        ...state,
        type: 'confirmModal',
        isOpen: true,
        name: action.payload.name,
        bookId: action.payload.bookId,
      };

    default:
      return state;
  }
};

const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};

export { BookProvider };
