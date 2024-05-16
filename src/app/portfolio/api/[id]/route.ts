import { getPortfolioDetail } from "@/services/portfolioService";
import { PortfoliosProps } from "@/types/portfolio/portfolio";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: {params: Params}) {
  const id = context.params.id;
  if (!id) {
    return NextResponse.json({error: 'No id found'}, {status: 400})
  }
  try {
    const detail : PortfoliosProps | Error = await getPortfolioDetail(parseInt(id));
    if (detail instanceof Error) {
      return NextResponse.json({ error: detail.message }, { status: 400 });
    }
    const newDetail = {
      ...detail,
      portfolio: {
        ...detail.portfolio,
        content: detail.portfolio.content.replace(/\n/g, "\\n")
      }
    };
    return NextResponse.json(newDetail, {status: 200})
  } catch (err) {
    console.error('Error fetching portfolios:', err);
    return NextResponse.json({ error: 'Error fetching portfolios' }, {status: 400})
  }
}