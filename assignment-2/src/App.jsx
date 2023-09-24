import { Suspense, lazy } from 'react';

import { BookProvider } from 'providers/book-provider';
import { ThemeProvider } from 'providers/theme-provider';
import Loading from 'components/ui/loading';

const Book = lazy(() => import('./pages/book'));

function App() {
  return (
    <ThemeProvider>
      <div className='w-full h-screen bg-[#d3d3d3] dark:bg-[#313338]'>
        <BookProvider>
          <Suspense fallback={<Loading />}>
            <Book />
          </Suspense>
        </BookProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
