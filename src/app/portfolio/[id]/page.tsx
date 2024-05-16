import { PortfolioDetail } from '@/app/ui/common/PortfolioDetail';
import React from 'react';

export default function page({ params }: { params: { id: number } }) {
  return <PortfolioDetail id={params.id} />;
}
