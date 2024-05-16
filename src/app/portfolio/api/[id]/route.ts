import { getPortfolioDetail } from "@/services/portfolioService";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: {params: Params}) {
  const id = context.params.id;
  if (!id) {
    return NextResponse.json({error: 'No id found'}, {status: 400})
  }
  try {
    const detail = await getPortfolioDetail(parseInt(id));
    return NextResponse.json((detail), {status: 200})
  } catch (err) {
    console.error('Error fetching portfolios:', err);
    return NextResponse.json({ error: 'Error fetching portfolios' }, {status: 400})
  }
}