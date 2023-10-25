import React from 'react';
import BasePageLayout from '../../shared/layouts/BasePageLayout';
import { DetailTools } from '../../shared/components';

export const Dashboard: React.FC = () => {
  return (
    <BasePageLayout
      title="Initial Page"
      toolbar={
        <DetailTools
          showButtonReturn
          showButtonNew
          showButtonDelete
          showButtonSave
          showButtonSaveAndReturn
        />
      }
    ></BasePageLayout>
  );
};
