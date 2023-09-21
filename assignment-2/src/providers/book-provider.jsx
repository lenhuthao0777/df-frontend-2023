import { v4 as uuid } from 'uuid';
import { createContext, useContext, useReducer } from 'react';

const BookContext = createContext(null);

export const useBook = () => useContext(BookContext);

const initialState = {
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
  type: '',
  isOpen: false,
  name: '',
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
    case 'confirm':
      return {
        ...state,
        type: 'confirmModal',
        isOpen: true,
        name: action.payload.name,
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
