import Header from 'components/header';
import BookTable from './book-table';

const Book = () => {
  return (
    <div>
      <Header />
      <div className='container mx-auto pt-20'>
        <BookTable />
      </div>
    </div>
  );
};

export default Book;
