'use client';
import { PortfolioTable } from '@/app/ui/dashboard/portfolioTable';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React, { useState } from 'react';

const CreateBtn = () => {
  return (
    <Button color="blue">
      <Link href="/admin/dashboard/create">Create</Link>
    </Button>
  );
};

const DeleteBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button color="red" onClick={onClick}>
      Delete
    </Button>
  );
};

const deleteItems = async (clickedIds: number[]) => {
  try {
    const response = await fetch('/admin/dashboard/api', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clickedIds),
    });

    if (!response.ok) {
      throw new Error('Failed to delete items');
    }
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
    throw error;
  }
};

export default function Page() {
  const [checked, setChecked] = useState<number[]>([]);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChildChecked = (id: number) => {
    if (checked.includes(id)) {
      setChecked(checked.filter((n) => n !== id));
    } else {
      setChecked([...checked, id]);
    }
  };

  const HandleDelete = async () => {
    try {
      await deleteItems(checked);
      setChecked([]);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  };

  return (
    <main>
      <div className="flex justify-end gap-4">
        <div>
          <CreateBtn />
        </div>
        <div>
          <DeleteBtn onClick={HandleDelete} />
        </div>
      </div>
      <PortfolioTable onChildChecked={handleChildChecked} onDeleteSuccess={success} />
    </main>
  );
}
