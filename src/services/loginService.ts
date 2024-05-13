'use server'
import { z } from "zod";
import { messageState } from "../types/state";
import { redirect } from "next/navigation";
import  bcrypt  from 'bcrypt'
import { findUserById } from "@/repositories/loginRepository";
import { createSeession } from "../lib/session";

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

  const { data, err } = await findUserById(identify);

    if (!data) {
      return {
        message: `code: ${JSON.parse(JSON.stringify(err)).code} , error: ${JSON.parse(JSON.stringify(err)).name}`,
      }
    }
    
    const hash = data!.password;
    const isMached = await bcrypt.compare(password, hash)

  if (isMached) {
    await createSeession(identify)
    redirect('/admin/dashboard')
    
  } else {
    return {
      message: 'Id or password are incorrect',
    }
  }
}

