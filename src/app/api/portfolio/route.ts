import { createNewPortfolio } from "@/service/portfolioService";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json()

  createNewPortfolio(body.sharedLink, body.title, body.content, body.height, body.width)
  redirect('/admin/dashboard')
}