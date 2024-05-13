import { PortfolioTable } from '@/app/ui/dashboard/portfolioTable';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

const CreateBtn = () => {
  return (
    <Button color="blue">
      <Link href="/admin/dashboard/create">Create</Link>
    </Button>
  );
};

export default function Page() {
  return (
    <main>
      <div className="text-right">
        <CreateBtn />
      </div>
      <PortfolioTable />
    </main>
  );
}
