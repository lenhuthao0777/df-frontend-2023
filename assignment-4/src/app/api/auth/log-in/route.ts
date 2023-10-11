import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json()

    const user = await db.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      return NextResponse.json({
        message: 'Login failure!',
        status: 400,
      })
    }

    const checkPass = password === user.password

    if (!checkPass) {
      return NextResponse.json({
        message: 'Login failure!',
        status: 400,
      })
    }

    return NextResponse.json({
      message: 'Login success!',
      status: 200,
      data: {
        id: user.id,
        email,
      },
    })
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error,
      message: 'Internal server error',
    })
  }
}
