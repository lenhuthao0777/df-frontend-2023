import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

export const POST = async (req: Request) => {
  try {
    const { email, name, password } = await req.json()

    const user = await db.user.findFirst({
      where: {
        email,
      },
    })

    if (user) {
      return NextResponse.json({
        status: 400,
        message: 'Conflict',
      })
    }

    const res = await db.user.create({
      data: {
        email,
        name,
        password,
      },
    })

    return NextResponse.json({
      status: 200,
      data: {
        email: res.email,
      },
      message: 'Sign up success!',
    })
  } catch (error) {
    return NextResponse.json({
      error,
      status: 500,
      message: 'Internal server!',
    })
  }
}
