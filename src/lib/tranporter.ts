'use server'
import { google } from "googleapis";
import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const createTransporter = async () : Promise<Transporter<SMTPTransport.SentMessageInfo> | Error> => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URL,
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken: string | null | undefined = await new Promise<string | null | undefined>((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(token);
        }
      });
    });

    if (accessToken) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port:465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: process.env.USER_EMAIL,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken,
          expires:3599,    
        },
      });
      return transporter;
    }
    
    return new Error('Could not get accessToken')

  } catch (err: any) {
    return err;
  }

}