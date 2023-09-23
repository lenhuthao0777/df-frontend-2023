import { Fragment, useEffect, useState } from 'react';
import { Loader2, Trash } from 'lucide-react';

import { cn } from 'lib/utils';
import Search from './search';
import { useBook } from 'providers/book-provider';
import Pagination from 'components/pagination';
import ConfirmModal from './confirm-modal';
import AddModal from './add-modal';
import BookService from 'api/book';

const limit = 2;

const BookTable = () => {
  const { state, dispatch } = useBook();
  const [isLoading, setIsLoading] = useState(false);

  const [currPage, setCurrPage] = useState(1);

  const changePage = (page) => {
    setCurrPage(page);
  };

  const pagination = (data = [], page = 1, limit) => {
    const trimStart = (page - 1) * limit;
    const trimEnd = trimStart + limit;
    const result = data.slice(trimStart, trimEnd);
    const totalPage = Math.ceil(data.length / limit);
    return {
      data: result,
      totalPage,
    };
  };

  const getBooks = async (page = 1, limit) => {
    setIsLoading(true);
    try {
      const res = await BookService.index();
      const { data, totalPage } = pagination(res, page, limit);
      dispatch({
        type: 'setBooks',
        payload: {
          books: data,
          totalPage,
        },
      });
      setIsLoading(false);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getBooks(currPage, limit);
  }, [currPage, limit]);

  return (
    <div className='flex flex-col'>
      <Search />

      <div className='mt-3 min-h-[200px] bg-white rounded-md p-5 relative overflow-hidden shadow'>
        <table className='w-full'>
          <thead className='bg-gray-100 rounded-t-lg'>
            <tr>
              <th className='w-96 p-3 text-sm text-zinc-900 font-extrabold tracking-wide text-left'>
                Name
              </th>
              <th className='w-60 p-3 text-sm text-zinc-900 font-extrabold tracking-wide text-left'>
                Author
              </th>
              <th className='w-60 p-3 text-sm text-zinc-900 font-extrabold tracking-wide text-left'>
                Topic
              </th>
              <th className='w-30 p-3 text-sm text-zinc-900 font-extrabold tracking-wide text-right'>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            <Fragment>
              {state.books.map((item, index) => (
                <tr
                  key={item.id}
                  className={cn(
                    'bg-gray-50',
                    index % 2 === 0 && 'bg-transparent'
                  )}
                >
                  <td className='p-4 text-sm text-zinc-700'>{item.name}</td>
                  <td className='p-4 text-sm text-zinc-700'>{item.author}</td>
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
                  <td className='p-4 text-sm text-zinc-700 flex items-center justify-end'>
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
        totalPage={state.totalPage}
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
