import qs from 'qs';
import { PagedResult, SearchParams, PagedParams, fetchInfo } from '.';

export type Transaction = {
  amount: number;
  block: string;
  fee: number;
  hash: string;
  isDummy?: boolean;
  receiver: string;
  sender: string;
};

export const fetchTransactions = async (
  params?: SearchParams<Transaction> & PagedParams
): Promise<PagedResult<Transaction>> => {
  let queryString = '';

  if (params) {
    const { startAt = 0, endAt = 9, term = '', keys = [] } = params;
    const orderBy = term ? keys.join(',') : '$key';

    const urlParams = term
      ? {
          orderBy: JSON.stringify(orderBy),
          equalTo: term ? JSON.stringify(term) : undefined
        }
      : {
          startAt: `\"${startAt}\"`,
          endAt: `\"${endAt}\"`,
          orderBy: JSON.stringify(orderBy)
        };

    queryString = `?${qs.stringify(urlParams)}`;
  }

  const response = await fetch(
    `https://stargazer-4497c.firebaseio.com/latest/transactions.json${queryString}`
  );
  const rows = await response.json();
  const { txCount: count } = await fetchInfo();

  return { rows: Object.values(rows), count };
};
