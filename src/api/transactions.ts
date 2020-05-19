import qs from 'qs';
import { PagedResult, SearchParams, PagedParams } from '.';
import { AppEnv } from '../app-env';
import { latestInfo } from '~api/latest-info';

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
  const filterKeys = ['block', 'hash', 'address'];
  const { startAt = 0, endAt = 9, term, keys = [] } = params || {};
  let requestKeys = ['$key'];
  if (term) {
    if (term.indexOf('DAG') === 0) {
      requestKeys = ['address'];
    } else {
      requestKeys = keys.length ? keys : filterKeys;
    }
  }
  const requests = requestKeys.map(key => {
    if (key === 'address') {
      const queryString = `?${qs.stringify({
        address: term
      })}`;

      return fetch(`${AppEnv.STAR_GAZER_API}/transactions${queryString}`);
    }

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
      `${AppEnv.DAG_EXPLORER_API}/latest/transactions.json${queryString}`
    ).catch(() => null);
  });

  const responses = await Promise.all(requests);
  const results = await Promise.all(
    responses
      .filter(response => response !== null && response.status === 200)
      .map(response => response!.json())
  );
  const transactions = results
    .map(rows => Object.values(rows))
    .reduce((result, current) =>
      current.length > result.length ? current : result
    ) as (Transaction & {
    checkpointBlock?: string;
  })[];

  const rows = transactions.map(
    ({ block, checkpointBlock, ...transaction }) => ({
      ...transaction,
      block: checkpointBlock || block || ''
    })
  );

  const count = term ? rows.length : latestInfo.txCount;

  return { rows, count };
};
