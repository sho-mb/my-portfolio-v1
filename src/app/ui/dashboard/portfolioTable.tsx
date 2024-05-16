'use client';

import { PortfoliosProps } from '@/types/portfolio/portfolio';
import { Checkbox, Table } from '@radix-ui/themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  onChildChecked: (id: number) => void;
  onDeleteSuccess: boolean;
};

const fetchData = async () => {
  const response = await fetch('/admin/dashboard/api', {
    cache: 'no-store',
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export const PortfolioTable: React.FC<Props> = ({ onChildChecked, onDeleteSuccess }) => {
  const [portfolios, setPortfolios] = useState<PortfoliosProps[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (onDeleteSuccess) {
      fetchData().then((data) => setPortfolios(data));
    }
  }, [onDeleteSuccess]);

  useEffect(() => {
    fetchData().then((data) => setPortfolios(data));
  }, []);

  const toggleChecked = (id: number) => {
    onChildChecked(id);
  };

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell width="20px"></Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell width="120px">Project Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell width="120px">Image Url</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Content</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {portfolios.map((portfolio) => {
          const isExpanded = expandedId === portfolio.portfolio.id;
          return (
            <Table.Row key={portfolio.portfolio.id}>
              <Table.Cell>
                <Checkbox onCheckedChange={() => toggleChecked(portfolio.portfolio.id)} />
              </Table.Cell>
              <Table.RowHeaderCell>{portfolio.portfolio.title}</Table.RowHeaderCell>
              <Table.Cell>
                <Link href={portfolio.image.src} className="text-blue-600 hover:text-gray-400">
                  link
                </Link>
              </Table.Cell>
              <Table.Cell>
                {portfolio.portfolio.content.length > 100 && !isExpanded ? (
                  <>
                    {portfolio.portfolio.content.slice(0, 100)}
                    <span
                      className="hover:text-gray-400 cursor-pointer"
                      onClick={() => setExpandedId(portfolio.portfolio.id)}
                    >
                      ...
                    </span>
                  </>
                ) : (
                  <span onClick={() => setExpandedId(null)}>{portfolio.portfolio.content}</span>
                )}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};
