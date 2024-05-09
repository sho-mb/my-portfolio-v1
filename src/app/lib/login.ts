'use client'
import { z } from "zod";
import { messageState } from "../types/state";

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

  await fetch(
    '/api/login',
    {
      method: 'POST',
      body: JSON.stringify({ id : identify, password: password})
    }
  ).then(async res => {
    const response = await res.json()
    return { message: response.message }
  })
  
  return { message: 'Internal Server error'  }  
}
