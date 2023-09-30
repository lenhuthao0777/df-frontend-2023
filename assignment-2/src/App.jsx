import { Suspense, lazy } from 'react';

import { BookProvider } from 'providers/book-provider';
import { ThemeProvider } from 'providers/theme-provider';
import Loading from 'components/ui/loading';
import Header from 'components/header';

const Book = lazy(() => import('./pages/book'));

function App() {
  return (
    <ThemeProvider>
      <div className='w-full h-screen'>
        <BookProvider>
          <Suspense fallback={<Loading />}>
            <Header />

            <div className='container'>
              <Book />
            </div>
          </Suspense>
        </BookProvider>
      </div>
    </ThemeProvider>
  );
}

// #252525

export default App;
