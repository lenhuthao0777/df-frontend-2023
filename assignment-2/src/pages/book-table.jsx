import { Fragment, useEffect, useMemo, useState } from 'react';
import { Loader2, Trash } from 'lucide-react';

import { cn } from 'lib/utils';
import Search from './search';
import { useBook } from 'providers/book-provider';
import Pagination from 'components/pagination';
import ConfirmModal from './confirm-modal';
import AddModal from './add-modal';
import BookService from 'api/book';
import usePagination from 'hooks/use-pagination';

const limit = 2;

const BookTable = () => {
  const { state, dispatch } = useBook();

  const [tableData, setTableData] = useState({
    data: [],
    totalPage: 0,
  });

  const { pagination } = usePagination();

  const [isLoading, setIsLoading] = useState(false);

  const [currPage, setCurrPage] = useState(1);

  const changePage = (page) => {
    setCurrPage(page);
  };

  const handleMapData = (value) => {
    const { data, totalPage } = pagination(value, currPage, limit);
    setTableData({
      data,
      totalPage,
    });
  };

  const getBooks = async () => {
    setIsLoading(true);
    try {
      const res = await BookService.index();
      handleMapData(res);
      dispatch({
        type: 'setBooks',
        payload: {
          books: res,
        },
      });
      setIsLoading(false);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getBooks();
  }, [currPage]);

  const handleSearch = (value) => {
    const { data, totalPage } = pagination(state.books, currPage, limit);

    const result = data.filter((item) => {
      return item.name.toLowerCase().includes(value.searchTerm.toLowerCase());
    });

    if (!value.searchTerm) {
      setTableData({
        data: data,
        totalPage,
      });
    } else {
      setTableData({
        data: result,
        totalPage: null,
      });
    }
  };

  return (
    <div className='flex flex-col'>
      <Search onSearch={handleSearch} />

      <div className='mt-3 min-h-[200px] bg-white dark:bg-black rounded-md p-5 relative overflow-hidden shadow'>
        <table className='w-full'>
          <thead className='bg-gray-100 dark:bg-gray-800 rounded-t-lg'>
            <tr className='dark:text-white text-sm font-extrabold tracking-wide'>
              <th className='w-96 p-3 text-left'>Name</th>
              <th className='w-60 p-3 text-left'>Author</th>
              <th className='w-60 p-3 text-left'>Topic</th>
              <th className='w-30 p-3 text-right'>Action</th>
            </tr>
          </thead>

          <tbody>
            <Fragment>
              {tableData.data.map((item, index) => (
                <tr
                  key={item.id}
                  className={cn(
                    'bg-gray-50 dark:bg-gray-700',
                    (index) % 2 === 0 && 'bg-transparent dark:bg-transparent'
                  )}
                >
                  <td className='p-4 text-sm text-zinc-700 dark:text-white'>{item.name}</td>
                  <td className='p-4 text-sm text-zinc-700 dark:text-white'>{item.author}</td>
                  <td className='p-4'>
                    <span
                      className={cn(
                        'text-xs font-semibold py-1 px-2 bg-gray-400 rounded-md',
                        item.topic.toLowerCase() === 'programming' &&
                          'bg-rose-500 text-white',
                        item.topic.toLowerCase() === 'database' &&
                          'bg-sky-500 text-white',
                        item.topic.toLowerCase() === 'devops' &&
                          'bg-green-500 text-white'
                      )}
                    >
                      {item.topic}
                    </span>
                  </td>
                  <td className='p-4 text-sm text-zinc-700 dark:text-white flex items-center justify-end'>
                    <p
                      onClick={() =>
                        dispatch({
                          type: 'confirm',
                          payload: { name: item.name, bookId: item.id },
                        })
                      }
                      className='w-8 h-8 bg-rose-500 hover:bg-rose-500/90 cursor-pointer transition flex items-center justify-center rounded-md'
                    >
                      <Trash className='w-4 h-4 text-white font-semibold' />
                    </p>
                  </td>
                </tr>
              ))}
            </Fragment>
          </tbody>
        </table>
        {isLoading ? (
          <div className='w-full bg-gray-300 bg-opacity-30 backdrop-blur-lg flex items-center justify-center absolute top-0 left-0 bottom-0'>
            <span>
              <Loader2 className='w-10 h-10 animate-spin' />
            </span>
          </div>
        ) : null}
      </div>

      <Pagination
        totalPage={tableData.totalPage}
        currPage={currPage}
        isLoading={isLoading}
        onChange={changePage}
      />

      <ConfirmModal />
      <AddModal />
    </div>
  );
};

export default BookTable;
