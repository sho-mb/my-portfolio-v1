import { getPortfolios } from "@/repositories/portfolioRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const number = request.nextUrl.searchParams.get('number');
  try {
    const res = await getPortfolios();
    if(number) {
      const slicedPortfolios = res.slice(0, parseInt(number));
      return NextResponse.json(slicedPortfolios, {status: 200})
    }
    
    return NextResponse.json(res, {status: 200})
  } catch(err) {
    return NextResponse.json(err, {status: 400})
  }
}