import { findUserById } from "@/service/loginService";
import { NextRequest, NextResponse } from "next/server";
import  bcrypt  from 'bcrypt'
import { createSeession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
    const body = await request.json()
    const id = body.id;
    const { data, err } = await findUserById(id);

    if (!data) {
      return NextResponse.json({
        message: `code: ${JSON.parse(JSON.stringify(err)).code} , error: ${JSON.parse(JSON.stringify(err)).name}`
      });
    }
    
    const hash = data!.password;
    const isMached = await bcrypt.compare(body.password, hash)

  if (isMached) {
    await createSeession(id)
    redirect('/admin/dashboard')
  } else {
    return NextResponse.json({
      message: 'Id or password are incorrect'
    })
  }
}