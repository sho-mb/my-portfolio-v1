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
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch('/api/dropbox/authentication', {
  //         method: 'GET',
  //       });
  //       const data = await response.json();
  //       console.log('Redirect URI:', data.redirect_uri);
  //       window.location.href = data.redirect_uri;
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <main>
      <div className="text-right">
        <CreateBtn />
      </div>
      <PortfolioTable />
    </main>
  );
}
