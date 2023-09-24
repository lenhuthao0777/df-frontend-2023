import { cn } from 'lib/utils';
import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const Pagination = ({ currPage, totalPage, onChange, isLoading }) => {
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

  if (!totalPage) return null;

  return (
    <div className='flex justify-end w-full mt-5'>
      <div className='flex items-center'>
        <button
          onClick={prePage}
          disabled={page === 1}
          className={cn(
            'bg-white text-zinc-700 p-2 cursor-pointer shadow rounded-l-md border-r border-gray-300 transition hover:bg-white/50  dark:bg-gray-700 dark:text-white dark:hover:bg-gray-50 dark:hover:text-black',
            page === 1 &&
              'disabled:bg-white/10 disabled:cursor-no-drop disabled:hover:text-zinc-700 dark:disabled:bg-gray-300'
          )}
        >
          <ChevronLeft className='w-5 h-5' />
        </button>

        {pages.map((item) => (
          <button
            key={item}
            onClick={() => onChangePage(item)}
            disabled={isLoading}
            className={cn(
              'py-2 px-4 text-zinc-700 text-sm border-r cursor-pointer border-gray-300 bg-white transition hover:bg-white/50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-50 dark:hover:text-black',
              page === item && 'bg-rose-500 text-white hover:bg-rose-500/90 dark:bg-gray-50 dark:text-black'
            )}
          >
            {item}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={page === totalPage}
          className={cn(
            'bg-white text-zinc-700 p-2 shadow cursor-pointer rounded-r-md transition hover:bg-white/50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-50 dark:hover:text-black',
            page === totalPage &&
              'disabled:bg-white/40 disabled:cursor-no-drop disabled:hover:text-zinc-700 dark:disabled:bg-gray-300'
          )}
        >
          <ChevronRight className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
