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
  const filterKeys = [
    'block',
    'hash'
    // 'sender',
    // 'receiver'
  ];
  const { startAt = 0, endAt = 9, term, keys = [] } = params || {};
  const requestKeys = term ? (keys.length ? keys : filterKeys) : ['$key'];
  const requests = requestKeys.map(key => {
    const params = Object.assign(
      {},
      {
        orderBy: JSON.stringify(key),
        equalTo: term ? JSON.stringify(term) : undefined
      },
      !term && {
        startAt: `\"${startAt}\"`,
        endAt: `\"${endAt}\"`
      }
    );

    const queryString = `?${qs.stringify(params)}`;

    return fetch(
      `https://stargazer-4497c.firebaseio.com/latest/transactions.json${queryString}`
    );
  });

  const responses = await Promise.all(requests);
  const results = await Promise.all(responses.map(response => response.json()));
  const rows = results
    .map(rows => Object.values(rows))
    .reduce((result, current) =>
      current.length > result.length ? current : result
    ) as Transaction[];

  const { txCount: count } = await fetchInfo();

  return { rows, count };
};
