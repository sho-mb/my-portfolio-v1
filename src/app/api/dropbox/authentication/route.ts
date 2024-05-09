import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const config = {
    clientId: process.env.DROPBOX_APP_KEY,
    clientSecret: process.env.DROPBOX_APP_SECRET,
  };

  const hostname = process.env.HOSTNAME || 'localhost';
  const port = process.env.PORT || 3000;
  const redirectUri = `https://${hostname}:${port}/auth`;

  axios.get(`https://www.dropbox.com/oauth2/authorize?client_id=${config.clientId}&response_type=code&redirect_uri=${redirectUri}`)
  .then((response) => {
    const redirectUrl = response.request.res.responseUrl;
    console.log(`redirect : ${redirectUrl}`)
    NextResponse.json(redirectUrl)
  })
  .catch((error) => {
    console.log('Error', error)
  })
}

export async function POST(request: NextRequest) {
  const code = 'YOUR_AUTHORIZATION_CODE_HERE';
  const hostname = process.env.HOSTNAME || 'localhost';
  const port = process.env.PORT || 3000;
  const redirectUri = `https://${hostname}:${port}/auth`;

  axios.post('https://api.dropboxapi.com/oauth2/token', {
  code: code,
  grant_type: 'authorization_code',
  redirect_uri: redirectUri,
  client_id: process.env.DROPBOX_APP_KEY,
  client_secret: process.env.DROPBOX_APP_SECRET,
  })
  .then((response) => {
  const accessToken = response.data.access_token;
  console.log('Access Token:', accessToken);
  })
  .catch((error) => {
  console.error('Error:', error);
  });
}