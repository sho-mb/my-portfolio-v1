'use client'
import { z } from "zod";
import { messageState } from "../types/state";
import { redirect } from "next/navigation";

const schema = z.object({
  identify: z.string().min(1),
  password: z.string().min(1),
})

export default async function login( prevState: messageState, formData: FormData ) : Promise<messageState> {
  const validatedFields = schema.safeParse({
    identify: formData.get('id'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      message: JSON.parse(JSON.stringify('Missing id or password'))
    }
  }

  const { identify, password } = validatedFields.data

  const response = await fetch(
    '/api/login',
    {
      method: 'POST',
      body: JSON.stringify({ id : identify, password: password})
    }
  )
  const body = await response.json()
  if (response.status === 200) {
    redirect('/admin/dashboard')
  } else {
    return { message: body.message }
  }
}
