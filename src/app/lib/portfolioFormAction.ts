import { z } from "zod";
import { State } from "../types/state";
import { redirect } from "next/navigation";
import { createNewPortfolio } from "@/service/portfolioService";

const IMAGE_TYPES = ['image/jpg', 'image/png', 'image/jpeg'];
const MAX_IMAGE_SIZE = 5; // 5MB

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

const schema = z.object({
  file: z
  .custom<FileList>()
  .refine((file) => file.length !== 0, { message: 'Image required' })
  .transform((file) => file[0])
  .refine((file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE, {message: 'File should be under 5MB'})
  .refine((file) => IMAGE_TYPES.includes(file.type), {message: 'type shoulde be .png or .jpeg'}),
  title: z.string().min(1, {message: 'Please enter title'}),
  content: z.string().min(1, {message: 'Please enter content'})
})

export default async function uploadPortfolio(prev: State, formData: FormData ) : Promise<State> {
  const validatedFields = schema.safeParse({
    file: formData.getAll('file'),
    title: formData.get('title'),
    content: formData.get('content')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields, Failed to upload portfolio',
      isSuccess: false,
    }
  }

  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = ('0' + (now.getMonth() + 1)).slice(-2); 
  const day = ('0' + now.getDate()).slice(-2); 
  const YYMMDD = year + month + day;

  const { file, title, content } = validatedFields.data;
  console.log(file)

  const filename = `${YYMMDD}_${file.name}`  

  const newFormData = new FormData()
  newFormData.append('file', file);

  const response = await fetch(
    `/api/dropbox?filename=${filename}`,
    {
      method: 'POST',
      body: newFormData,
    }
  );

  return {
    message: '',
    errors: {},
    isSuccess: false,
  }
  
  // if (response.ok) {
  //   const data = await response.json();
  //   const sharedLink = data.sharedLink;
  //   const res = await createNewPortfolio(sharedLink, title, content)
  //   console.log(res)
  //   redirect('/admin/dashboard')
  // } else {
  //   return {
  //     errors: {},
  //     message: `Failed to upload portfolio:', ${response.statusText}`,
  //     isSuccess: false,
  //   }
  // }
}
