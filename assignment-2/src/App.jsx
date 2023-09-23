import { Suspense, lazy } from 'react';

import { BookProvider } from 'providers/book-provider';
import { ThemeProvider } from 'providers/theme-provider';
import Loading from 'components/ui/loading';

const Book = lazy(() => import('./pages/book'));

function App() {
  return (
    <ThemeProvider>
      <BookProvider>
        <Suspense fallback={<Loading />}>
          <Book />
        </Suspense>
      </BookProvider>
    </ThemeProvider>
  );
}

export default App;
