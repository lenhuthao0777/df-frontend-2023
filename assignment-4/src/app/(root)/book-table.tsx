'use client'

import { BookOpen, Pen, PenSquare, Trash } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { useRouter } from 'next/navigation'
import Book from '@/services/apis/book'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Search from './search'

const BookTable = () => {
  const router = useRouter()
  // const {} = useQuery({
  //   queryKey: ['book'],
  //   queryFn: () => Book.book(),
  // })

  const data = [
    {
      id: 1,
      name: 'test',
      topic: 'abc',
      author: 'abc1',
    },
  ]

  const onDetail = () => {
    router.push('/book-detail/:id')
  }

  return (
    <div className="bg-white dark:bg-[#1e1f22] shadow rounded-md">
      <Search />

      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.topic}</TableCell>
              <TableCell>{item.author}</TableCell>
              <TableCell className="text-right">
                <div>
                  <Button size="icon" variant="secondary" className="mr-2">
                    <PenSquare className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="mr-2">
                    <Trash className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="secondary" onClick={onDetail}>
                    <BookOpen className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default BookTable
