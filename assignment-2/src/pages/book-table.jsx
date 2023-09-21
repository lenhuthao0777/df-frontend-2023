import { cn } from 'lib/utils';
import Search from './search';
import { Trash } from 'lucide-react';
import { useBook } from 'providers/book-provider';
import Pagination from 'components/pagination';
import ConfirmModal from './confirm-modal';
import AddModal from './add-modal';

const BookTable = () => {
  const {state, dispatch} = useBook();

  const changePage = (page) => {
    console.log(page);
  };

  return (
    <div className='flex flex-col'>
      <Search />

      <div className='mt-3 bg-white rounded-md p-5'>
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
                      'text-white text-xs font-semibold py-1 px-2 rounded-md',
                      item.topic.toLowerCase() === 'programming' &&
                        'bg-rose-500',
                      item.topic.toLowerCase() === 'database' && 'bg-sky-500',
                      item.topic.toLowerCase() === 'devops' && 'bg-green-500'
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
                        payload: { name: item.name },
                      })
                    }
                    className='w-8 h-8 bg-rose-500 hover:bg-rose-500/90 cursor-pointer transition flex items-center justify-center rounded-md'
                  >
                    <Trash className='w-4 h-4 text-white font-semibold' />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination totalPage={10} currPage={1} onChange={changePage} />

      <ConfirmModal />
      <AddModal />
    </div>
  );
};

export default BookTable;
