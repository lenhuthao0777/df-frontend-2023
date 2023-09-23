import './App.css';
import Book from './pages/book';
import { BookProvider } from 'providers/book-provider';
import { ThemeProvider } from 'providers/theme-provider';

function App() {
  return (
    <ThemeProvider>
      <BookProvider>
        <Book />
      </BookProvider>
    </ThemeProvider>
  );
}

export default App;
