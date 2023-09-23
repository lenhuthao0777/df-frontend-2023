import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { useBook } from 'providers/book-provider';

const Search = () => {
  const { dispatch } = useBook();

  return (
    <div className='flex items-center justify-end'>
      <Input className='w-60' placeholder='Search by name' />
      <Button
        variant='danger'
        className='ml-2'
        onClick={() => dispatch({ type: 'addBook' })}
      >
        Add book
      </Button>
    </div>
  );
};

export default Search;
