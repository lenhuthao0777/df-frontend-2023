import { Fragment } from 'react';

import Header from 'components/header';
import BookTable from './book-table';

const Book = () => {
  return (
    <Fragment>
      <Header />

      <BookTable />
    </Fragment>
  );
};

export default Book;
