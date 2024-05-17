import { createSeession, getSessionValue } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body= await request.json()
  const data = new URLSearchParams();
  data.append('code', body.code);
  data.append('grant_type', 'authorization_code');
  data.append('redirect_uri', `${process.env.DROPBOX_REDIRECT_URL!}/admin/auth`);
  data.append('client_id', process.env.DROPBOX_APP_KEY!);
  data.append('client_secret', process.env.DROPBOX_APP_SECRET!);
  
  try {
    const response = await fetch('https://api.dropboxapi.com/oauth2/token', {
    method: 'POST',
    body: data
  });

  if (response.ok) {
    const res = await response.json();

    const refreshToken = res.refresh_token;
    await createSeession(refreshToken, 'dbxToken') 
    return NextResponse.json({message : 'success'}, {status: 200})
  } else {
    return NextResponse.json({ error: 'Failed to fetch token' },  {
      status: response.status
    })
  }
} catch (err : any) {
  return NextResponse.json({error : err}, {status: 400});
}
}