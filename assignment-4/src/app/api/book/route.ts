import { NextResponse } from 'next/server'
import { Book } from '@prisma/client'
import { db } from '@/lib/prisma'

export const POST = async (req: Request) => {
  try {
    const { name, topicId, author } = await req.json()
    await db.book.create({
      data: {
        name,
        topicId,
        author,
      },
    })

    return NextResponse.json({
      status: 201,
      message: 'Create book success!',
    })
  } catch (error) {
    return NextResponse.json({
      message: 'Internal server error',
      error,
      status: 500,
    })
  }
}

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)

    const cursor = searchParams.get('cursor')

    const limit = searchParams.get('limit') || 5

    let books: Book[] = []

    if (cursor) {
      books = await db.book.findMany({
        take: limit as number,
        skip: 1,
        cursor: {
          id: cursor,
        },
        include: {
          topic: true,
        },
      })
    } else {
      books = await db.book.findMany({
        take: limit as number,
        include: {
          topic: true,
        },
      })
    }

    return NextResponse.json({
      status: 200,
      data: books,
      message: 'Get book success!',
    })
  } catch (error) {
    return NextResponse.json({
      message: 'Internal server error',
      error,
      status: 500,
    })
  }
}
