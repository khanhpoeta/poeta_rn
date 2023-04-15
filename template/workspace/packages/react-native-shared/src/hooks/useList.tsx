import React, {useState} from 'react';
import {
  APIResponse,
  DataListResponse,
  IFilterItem,
  IPaging,
} from '@poeta/shared/build/models';

export interface IPagingProps {
  currentPage: number;
  pageSize: number;
}

interface IListHookProps<T, P> {
  pageSize: number;
  filters: IFilterItem[];
  buildParams: (paging: IPagingProps, filters: IFilterItem[]) => P;
  apiCall: (params?: P) => Promise<APIResponse<DataListResponse<T[]>>>;
}

const isEqualFilters = (filter: IFilterItem[], another: IFilterItem[]) => {
  return filter.every(f => {
    const inAnother = another.find(af => af.category === f.category);
    return inAnother !== undefined && inAnother.value === f.value;
  });
};

/**
 * Handle paginating & filtering items from get list api call
 */

export const useList = <T, P extends IPaging>(props: IListHookProps<T, P>) => {
  const {apiCall, filters, buildParams, pageSize} = props;

  const items = React.useRef<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [listEnded, setListEnded] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilters, setCurrentFilters] = useState<IFilterItem[]>([]);

  React.useEffect(() => {
    // Reset page to 1 if filters changed
    if (!isEqualFilters(filters, currentFilters)) {
      setCurrentPage(1);
      setIsRefreshing(true);
      setCurrentFilters(filters);
    }
  }, [currentFilters, filters]);

  const loadMore = React.useCallback(() => {
    if (!listEnded) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, listEnded]);

  const refresh = React.useCallback(() => {
    setIsRefreshing(true);
    setListEnded(false);
    if (currentPage === 1) {
      // If page doesn't change, change filter to trigger calling api
      setCurrentFilters(filters.slice());
    } else {
      setCurrentPage(1);
    }
  }, [currentPage, filters]);

  React.useEffect(() => {
    setIsLoading(true);
    const params = buildParams({pageSize, currentPage}, currentFilters);

    // Ignore the first request
    if (currentFilters.length > 0) {
      apiCall(params)
        .then(resp => {
          const data = resp.data?.data;
          if (data) {
            // if loading the first page
            if (params.page && params.page === 1) {
              items.current = data;
            } else {
              items.current = [...items.current, ...data];
            }
            setListEnded(data.length < pageSize);
          }

          setIsLoading(false);
          setIsRefreshing(false);
        })
        .then((err: unknown) => {
          setIsLoading(false);
          setIsRefreshing(false);

          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('unknown');
          }
        });
    }
  }, [apiCall, buildParams, currentFilters, currentPage, pageSize]);

  return {items, isLoading, isRefreshing, error, loadMore, refresh};
};
