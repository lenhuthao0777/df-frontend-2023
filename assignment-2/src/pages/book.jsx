import { Fragment } from 'react';

import Header from 'components/header';
import BookTable from './book-table';

const Book = () => {
  return (
    <Fragment>
      <Header />
      <div className='container mx-auto pt-20'>
        <BookTable />
      </div>
    </Fragment>
  );
};

export default Book;
