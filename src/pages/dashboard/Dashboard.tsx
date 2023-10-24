import React from 'react';
import BasePageLayout from '../../shared/layouts/BasePageLayout';
import { ListingTools } from '../../shared/components';

const Dashboard: React.FC = () => {
  return (
    <BasePageLayout
      title="Initial Page"
      toolbar={<ListingTools showInputSearch showNewButton />}
    >
      <p>test</p>
    </BasePageLayout>
  );
};

export default Dashboard;
