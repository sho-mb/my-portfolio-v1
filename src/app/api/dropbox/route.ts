import { Dropbox } from 'dropbox';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch });

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileName = request.nextUrl.searchParams.get('filename')!;

    const buf = await file.arrayBuffer();

    const uploadResponse = await dbx.filesUpload({ path: `/${fileName}`, contents: buf });
    const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({ 
      path: `${uploadResponse.result.path_display}`, 
    });

    const sharedLink = (sharedLinkResponse.result.url).replace('dl=0','raw=1');
    return NextResponse.json({ sharedLink });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred while uploading and sharing the file.' });
  }
}
