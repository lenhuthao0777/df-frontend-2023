import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)

    const email = searchParams.get('email')

    const user = await db.user.findFirst({
      where: {
        email: email as string,
      },
    })

    return NextResponse.json({
      status: 200,
      data: user,
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
