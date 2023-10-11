import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

export const POST = async (req: Request) => {
  try {
    const { name } = await req.json()
    await db.topic.create({
      data: {
        name,
      },
    })

    return NextResponse.json({
      status: 201,
      message: 'Create topic success!',
    })
  } catch (error) {
    return NextResponse.json({
      message: 'Internal server error',
      error,
      status: 500,
    })
  }
}

export const GET = async () => {
  try {
    const res = await db.topic.findMany()

    return NextResponse.json({
      status: 200,
      data: res,
      message: 'Get topic success!',
    })
  } catch (error) {
    return NextResponse.json({
      message: 'Internal server error',
      error,
      status: 500,
    })
  }
}
