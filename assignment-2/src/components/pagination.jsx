import { cn } from 'lib/utils';
import { useState } from 'react';

const Pagination = ({ currPage, totalPage, onChange }) => {
  const [page, setPage] = useState(currPage);

  const pages = [...Array(totalPage).keys()].map((x) => x + 1);

  const onChangePage = (number) => {
    if (number !== page) {
      setPage(number);
      onChange && onChange(number);
    }
  };

  const nextPage = () => {
    setPage((curr) => {
      onChange && onChange(curr + 1);
      return curr + 1;
    });
  };
  const prePage = () => {
    setPage((curr) => {
      onChange && onChange(curr - 1);
      return curr - 1;
    });
  };

  return (
    <div className='flex justify-end w-full mt-5'>
      <div className='flex items-center'>
        <button
          onClick={prePage}
          disabled={page === 1}
          className={cn(
            'bg-white p-2 cursor-pointer shadow rounded-l-md border-r border-gray-300 transition hover:bg-white/50',
            page === 1 && 'disabled:bg-white/10 disabled:cursor-no-drop'
          )}
        >
          Previous
        </button>

        {pages.map((item) => (
          <p
            key={item}
            onClick={() => onChangePage(item)}
            className={cn(
              'py-2 px-4 border-r cursor-pointer border-gray-300 bg-white transition hover:bg-rose-500 hover:text-white',
              page === item && 'bg-rose-500 text-white'
            )}
          >
            {item}
          </p>
        ))}

        <button
          onClick={nextPage}
          disabled={page === totalPage}
          className={cn(
            'bg-white p-2 shadow cursor-pointer rounded-r-md transition hover:bg-white/50',
            page === totalPage && 'disabled:bg-white/40 disabled:cursor-no-drop'
          )}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
