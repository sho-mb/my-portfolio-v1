import { getPaths } from '@/repositories/portfolioRepository';
import { Dropbox, DropboxResponse, files } from 'dropbox';

export async function uploadAndGetLink(file: File, filename: string) {
  const dbx = new Dropbox({
    refreshToken: process.env.DROPBOX_REFLESH_TOKEN,
    clientId: process.env.DROPBOX_APP_KEY,
    clientSecret: process.env.DROPBOX_APP_SECRET,
    fetch });

 try {
   const buf = await file.arrayBuffer();
   const uploadResponse = await dbx.filesUpload({ path: `/${filename}`, contents: buf });
   console.log(uploadResponse)
   const link = getSharedlink(dbx, uploadResponse)
   return { link: link, path: uploadResponse.result.path_display };
 } catch (error) {
   console.error(error);
   return { error : 'An error occurred while uploading and sharing the file.' };
 }
}

const getSharedlink = async (dbx: Dropbox, uploadResponse: DropboxResponse<files.FileMetadata>) => {
  const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({ 
    path: `${uploadResponse.result.path_display}`, 
  });
  const sharedLink = (sharedLinkResponse.result.url).replace('dl=0','raw=1');
  return sharedLink;
}

export async function deleteUploadPictures(ids: number[]) {
  const paths = await getPaths(ids)

  console.log(paths)

  if (!paths){
    throw new Error('No data on dropbox')
  }

  const dbx = new Dropbox({
    refreshToken: process.env.DROPBOX_REFLESH_TOKEN,
    clientId: process.env.DROPBOX_APP_KEY,
    clientSecret: process.env.DROPBOX_APP_SECRET,
    fetch });

 try {
  paths.map(p => {
    console.log(p)
    dbx.filesDeleteV2({
      path: p
     })
  })
 } catch (error) {
   console.error(error);
   return { error : 'An error occurred while uploading and sharing the file.' };
 }
}
