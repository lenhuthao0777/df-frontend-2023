import React, { useEffect, useState } from 'react'
import { Trash } from 'lucide-react'

import { cn } from '../../lib/utils'
import { useBook } from '../../providers/book-provider'
import Pagination from '../../components/pagination'
import Search from './search'
import usePagination from '../../hooks/use-pagination'
import ConfirmModal from './confirm-modal'
import AddModal from './add-modal'
import { Button } from '../../components/ui/button'

const LIMIT = 2

interface DataLocalType {
  id?: string
  name: string
  author: string
  topic: string
}

const BookTable = () => {
  const { dispatch } = useBook()

  const [dataTable, setDataTable] = useState([])

  const dataLocal: DataLocalType[] =
    JSON.parse(localStorage.getItem('books') as string) || []

  const [pgn, setPgn] = useState<{ page: number; totalPage: number | null }>({
    page: 1,
    totalPage: 0,
  })

  const { pagination } = usePagination()

  const handleSearch = (value) => {
    const result = dataLocal.filter((item) => {
      return item.name.toLowerCase().includes(value.searchTerm.toLowerCase())
    })

    if (!value.searchTerm) {
      const { data, totalPage, page } = pagination(dataLocal, 1, LIMIT)
      setDataTable(data)
      setPgn((pre) => ({
        ...pre,
        page,
        totalPage,
      }))
    } else {
      const { data, totalPage, page } = pagination(result, 1, LIMIT)
      setDataTable(data)
      setPgn((pre) => ({ ...pre, page, totalPage }))
    }
  }

  const handleChangePage = (page: number) => {
    setPgn((pre) => ({
      ...pre,
      page,
    }))
  }

  useEffect(() => {
    const { data, totalPage, page } = pagination(dataLocal, pgn.page, LIMIT)

    if (!data.length && page > 1) {
      setPgn((pre) => ({
        ...pre,
        page: page - 1,
      }))
      setDataTable(data)
    } else {
      setPgn({
        page,
        totalPage,
      })
      setDataTable(data)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLocal.length, pgn.page])

  return (
    <>
      <Search onSearch={handleSearch} />

      <div className="bg-white dark:bg-black p-5 rounded-md shadow mt-2">
        <table className="w-full mb-5">
          <thead className="bg-gray-200 dark:bg-[#272827] rounded-t-lg border-b border-gray-200 dark:border-gray-700">
            <tr className="dark:text-white text-sm font-extrabold tracking-wide">
              <th className="w-96 p-4 text-left">Name</th>
              <th className="w-60 p-4 text-left">Author</th>
              <th className="w-60 p-4 text-left">Topic</th>
              <th className="w-30 p-4 text-right">Action</th>
            </tr>
          </thead>

          {!dataTable.length ? (
            <tbody>
              <tr>
                <td colSpan={4} className="text-center py-5 dark:text-white">
                  Empty data...
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {dataTable.map((item: DataLocalType) => (
                <tr
                  key={item?.id}
                  className="hover:bg-gray-50 dark:hover:bg-[#272827] transition border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="p-2 text-sm text-zinc-700 dark:text-white">
                    {item?.name}
                  </td>
                  <td className="p-2 text-sm text-zinc-700 dark:text-white">
                    {item?.author}
                  </td>
                  <td className="p-2">
                    <span
                      className={cn(
                        'text-xs font-semibold py-1 px-2 bg-gray-400 rounded-md',
                        item.topic.toLowerCase() === 'programming' &&
                          'bg-rose-500 text-white',
                        item.topic.toLowerCase() === 'database' &&
                          'bg-sky-500 text-white',
                        item.topic.toLowerCase() === 'devops' &&
                          'bg-green-500 text-white',
                      )}
                    >
                      {item?.topic}
                    </span>
                  </td>
                  <td className="p-2 text-sm text-zinc-700 dark:text-white flex items-center justify-end">
                    <Button
                      variant="danger"
                      onClick={() =>
                        dispatch({
                          type: 'confirm',
                          payload: { name: item?.name, bookId: item?.id },
                        })
                      }
                    >
                      <Trash className="w-4 h-4 text-white font-semibold" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        <Pagination
          onChange={handleChangePage}
          totalPage={pgn.totalPage}
          currPage={pgn.page}
        />
      </div>

      <ConfirmModal />
      <AddModal />
    </>
  )
}

export default BookTable
