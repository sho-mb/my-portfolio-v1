'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get('code');
      if (!code) {
        router.push('/admin/dashboard');
        return;
      }

      try {
        const res = await fetch('/admin/auth/api', {
          cache: 'no-store',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: code }),
        });

        if (!res.ok) {
          console.error('Failed to fetch token');
        }
        router.push('/admin/dashboard');
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchData(); // Promiseを返す関数を呼び出す
  }, [router]);
  return <div></div>;
}
