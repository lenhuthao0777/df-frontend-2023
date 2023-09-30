import Header from './components/header'
import Book from './pages/book'
import { BookProvider } from './providers/book-provider'
import { ThemeProvider } from './providers/theme-provider'

function App() {
  return (
    <ThemeProvider>
      <BookProvider>
        <Header />
        <div className="container mx-auto pt-24">
          <Book />
        </div>
      </BookProvider>
    </ThemeProvider>
  )
}

export default App
