import { getPortfolios } from "@/repositories/portfolioRepository";
import { deletePortfolios } from "@/services/portfolioService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const portfolios = await getPortfolios();
    return NextResponse.json((portfolios), {status: 200})
  } catch (err) {
    console.error('Error fetching portfolios:', err);
    return NextResponse.json({ error: 'Error fetching portfolios' }, {status: 400})
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const ids = await request.json();
    await deletePortfolios(ids);
    return NextResponse.json({ status: 200 }); 
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 }); 
  } 
}