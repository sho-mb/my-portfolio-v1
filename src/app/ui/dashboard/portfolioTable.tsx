import { getPortfolios } from '@/service/portfolioService';
import { Table } from '@radix-ui/themes';

export const PortfolioTable = async () => {
  const portfolios = await getPortfolios().catch((err) => {
    console.error('Error fetching portfolios:', err);
  });

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Project Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Image Url</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Content</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {portfolios?.map((portfolio) => {
          return (
            <Table.Row key={portfolio.image.src}>
              <Table.RowHeaderCell>{portfolio.portfolio.title}</Table.RowHeaderCell>
              <Table.Cell>{portfolio.portfolio.content}</Table.Cell>
              <Table.Cell>{portfolio.image.src}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};
