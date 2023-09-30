import { useRef } from 'react';

import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { useBook } from 'providers/book-provider';

const Search = ({ onSearch }) => {
  const { dispatch } = useBook();

  const typingTimeRef = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    if (typingTimeRef.current) {
      clearTimeout(typingTimeRef.current);
    }

    typingTimeRef.current = setTimeout(() => {
      const formValue = {
        searchTerm: value,
      };
      onSearch && onSearch(formValue);
    }, 300);
  };

  return (
    <div className='flex items-center justify-end bg-white py-3 px-3 rounded-md shadow-sm dark:bg-[#252525]'>
      <Input
        onChange={handleSearch}
        className='w-60'
        placeholder='Search...'
      />
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
