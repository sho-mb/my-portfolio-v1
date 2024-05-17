import { getSessionValue } from '@/lib/session';
import { getPaths } from '@/repositories/portfolioRepository';
import { Dropbox, DropboxResponse, files } from 'dropbox';

async function getRefeshTokenFromSession() {
  const refreshToken = await getSessionValue('dbxToken')
  if (!refreshToken) {
    return { error : 'expire or invalid refresh token, please login again' }
  }
  return { token : refreshToken } 
}

export async function uploadAndGetLink(file: File, filename: string) {
  try {
    const{ token, error} = await getRefeshTokenFromSession();
    if (error)
    return error
    const dbx = new Dropbox({
      refreshToken: token,
      clientId: process.env.DROPBOX_APP_KEY,
      clientSecret: process.env.DROPBOX_APP_SECRET,
      fetch });

    const buf = await file.arrayBuffer();
    const uploadResponse = await dbx.filesUpload({ path: `/${filename}`, contents: buf });
    const link = getSharedlink(dbx, uploadResponse)
    return { link: link, path: uploadResponse.result.path_display };
  } catch (error) {
   return { error : `An error occurred while uploading and sharing the file. reason might be ${error}` };
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
  const{ token, error} = await getRefeshTokenFromSession();
  if (error)
  return error
  const paths = await getPaths(ids)

  if (!paths){
    throw new Error('No data on dropbox')
  }

  const dbx = new Dropbox({
    refreshToken: token,
    clientId: process.env.DROPBOX_APP_KEY,
    clientSecret: process.env.DROPBOX_APP_SECRET,
    fetch });

 try {
  paths.map(p => {
    dbx.filesDeleteV2({
      path: p
     })
  })
 } catch (error) {
   console.error(error);
   return { error : 'An error occurred while uploading and sharing the file.' };
 }
}
