'use server'
import { z } from "zod";
import { State } from "../types/state";
import { redirect } from "next/navigation";
import { createDate } from "@/lib/utils/createUtils";
import { createNewPortfolio, deleteMany } from "@/repositories/portfolioRepository";
import { deleteUploadPictures, uploadAndGetLink } from "./dropboxService";

const IMAGE_TYPES = ['image/jpg', 'image/png', 'image/jpeg'];
const MAX_IMAGE_SIZE = 1; // 5MB

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
  content: z.string().min(1, {message: 'Please enter content'}),
  height: z.string(),
  width: z.string(),
})

export default async function uploadPortfolio(prev: State, formData: FormData ) : Promise<State> {
  const validatedFields = schema.safeParse({
    file: formData.getAll('file'),
    title: formData.get('title'),
    content: formData.get('content'),
    height :formData.get('height'),
    width : formData.get('width')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields, Failed to upload portfolio',
      isSuccess: false,
    }
  }
  const { file, title, content, height, width } = validatedFields.data;
  
  const today = createDate()
  const filename = `${today}_${file.name}`

  const { link, path , error } = await uploadAndGetLink(file, filename)
  if (link && path) {
      const sharedLink = await link;
      await createNewPortfolio(sharedLink, title, content, parseInt(height), parseInt(width), path)
      .catch(err => {
          return { 
              message: `Bad request error: ${err}`,
              errors: {},
              isSuccess: false,
            }
        });
          redirect('/admin/dashboard')
      } else {
        return {
        message:  `Failed to upload portfolio:', ${error}`,
        errors: {},
        isSuccess: false,
      }
    }  
}

export const deletePortfolios = async(ids:number[]) : Promise<any> => {
  if (!ids.length) {
    throw new Error('At least choose one id');
  }

  try {
    await deleteUploadPictures(ids);
    await deleteMany(ids);
  } catch (err) {
    return err
  }
}
