'use server'
import { z } from "zod"
import { createTransporter } from "../lib/tranporter";
import { State } from "../types/state";

const schema = z.object({
  name: z.string().min(1, {message: "Please enter your name"}),
  email: z.string().email({ message: 'please enter correct email'}),
  message: z.string().min(10, {message: 'Please enter your message at least 10 characters'})
})

export async function sendEmail (state: State, formData: FormData) : Promise<State>  {
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  })
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields, Failed to send message',
      isSuccess: false,
    }
  }

  const { name, email, message } = validatedFields.data;

  const mailOption = {
    from: 'no-reply@gmail.com',
    replyTo: email,
    to: process.env.USER_EMAIL,
    subject: `[Contact] You got contact from Mr/Ms ${name}`,
    text: `${message} send from ${email}`,
    html: `
    <p>[Name]</p>
    <p>${name}</p>
    <p>[Message]</p>
    <p>${message}</p>
    <p>[Email]</p>
    <p>${email}</p>
    `,
  }

  try {
    const emailTransporter = await createTransporter();
    if (emailTransporter instanceof Error) {
      return {
        errors: {
          name:[],
          email:[],
          message:[]
        },
        message: `Error: ${emailTransporter.message}`,
        isSuccess: false,
      }
    } else {
      await emailTransporter.sendMail(mailOption);
      return {
        errors: {
          name:[],
          email:[],
          message:[]
        },
        message: 'Send message successfully',
        isSuccess: true,
      }
    }
  } catch(err) {
    return {
      errors: {
        name:[],
        email:[],
        message:[]
      },
      message: `Error: ${err}`,
      isSuccess: false,
    }
  }
}
