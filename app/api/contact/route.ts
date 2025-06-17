import { NextResponse } from 'next/server'
import { sendContactEmail } from '@/app/actions/contact'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const result = await sendContactEmail(data)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send message' },
        { status: 400 }
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
