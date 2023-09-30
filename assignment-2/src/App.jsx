import { Suspense, lazy } from 'react';

import { BookProvider } from 'providers/book-provider';
import { ThemeProvider } from 'providers/theme-provider';
import Loading from 'components/ui/loading';
import Header from 'components/header';

const Book = lazy(() => import('./pages/book'));

function App() {
  return (
    <ThemeProvider>
      <div className='w-full h-screen bg-[#D3D3D3] dark:bg-[#2A2C2C]'>
        <BookProvider>
          <Suspense fallback={<Loading />}>
            <Header />

            <div className='container mx-auto pt-24'>
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
