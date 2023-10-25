import { useSearchParams } from 'react-router-dom';
import { ListingTools } from '../../shared/components';
import BasePageLayout from '../../shared/layouts/BasePageLayout';
import React from 'react';

export const ListCity = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = React.useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  return (
    <BasePageLayout
      title="City"
      toolbar={
        <ListingTools
          showInputSearch
          textNewButton="New"
          textSearch={search}
          changeSearchText={(text) =>
            setSearchParams({ search: text }, { replace: true })
          }
        />
      }
    ></BasePageLayout>
  );
};
