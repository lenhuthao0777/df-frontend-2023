import { FC, useEffect, useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'

import { cn } from '../lib/utils'

interface PaginationProps {
  currPage: number
  totalPage: number
  onChange?: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({
  currPage,
  totalPage,
  onChange,
}) => {
  const [page, setPage] = useState<number>(currPage)

  const pages = [...Array(totalPage).keys()].map((x) => x + 1)

  const onChangePage = (number) => {
    if (number !== page) {
      setPage(number)
      onChange && onChange(number)
    }
  }

  const nextPage = () => {
    setPage((curr) => {
      onChange && onChange(curr + 1)
      return curr + 1
    })
  }
  const prePage = () => {
    setPage((curr) => {
      onChange && onChange(curr - 1)
      return curr - 1
    })
  }

  useEffect(() => {
    setPage(currPage)
  }, [currPage])

  if (!totalPage) return null

  return (
    <div className="flex justify-end w-full mt-5">
      <ul className="flex items-center">
        <li>
          <button
            onClick={prePage}
            disabled={page === 1}
            className={cn(
              'min-w-[25px] h-[25px] leading-6 border border-transparent flex items-center justify-center hover:text-rose-400 dark:hover:text-rose-400 transition dark:text-gray-100',
              page === 1 &&
                'disabled:cursor-no-drop disabled:text-gray-400 dark:disabled:text-gray-400',
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </li>

        {pages.map((item: number) => (
          <li key={item}>
            <button
              className={cn(
                'min-w-[24px] h-6 text-sm leading-6 border border-transparent flex items-center justify-center hover:text-rose-400 dark:hover:text-rose-400 dark:text-gray-100',
                page === item &&
                  'border-rose-400 text-rose-400 dark:text-rose-400',
              )}
              onClick={() => onChangePage(item)}
            >
              {item}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={nextPage}
            disabled={page === totalPage}
            className={cn(
              'min-w-[25px] h-[25px] leading-6 border border-transparent flex items-center justify-center hover:text-rose-400 dark:hover:text-rose-400 transition dark:text-gray-100',
              page === totalPage &&
                'disabled:cursor-no-drop disabled:text-gray-400 dark:disabled:text-gray-400',
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
