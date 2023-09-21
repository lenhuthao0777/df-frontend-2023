import { BookProvider } from 'providers/book-provider';
import './App.css';
import Book from './pages/book';
function App() {
  return (
    <BookProvider>
      <Book />
    </BookProvider>
  );
}

export default App;
