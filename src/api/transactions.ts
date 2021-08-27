import qs from 'qs';
import { PagedResult, SearchParams, PagedParams } from '.';
import { AppEnv } from '../app-env';
import { TransactionInfo } from '~api/types';
import fetchAPI from '~utils/apiUtils';

export const fetchTransactions = async (
  params?: SearchParams<TransactionInfo> & PagedParams
): Promise<PagedResult<TransactionInfo>> => {
  const { startAt = 0, endAt = 9 } = params || {};
  const requestKeys = ['$key'];

  const requests = requestKeys.map(key => {
    const params = Object.assign(
      {},
      {
        orderBy: JSON.stringify(key)
      },
      {
        startAt: `\"${startAt}\"`,
        endAt: `\"${endAt}\"`
      }
    );

    const queryString = `?${qs.stringify(params)}`;

    return fetch(
      `${AppEnv.DAG_EXPLORER_REST}/latest/transactions.json${queryString}`
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
    ) as (TransactionInfo & {
    checkpointBlock?: string;
  })[];

  const rows = transactions.map(
    ({ block, checkpointBlock, ...transaction }) => ({
      ...transaction,
      block: checkpointBlock || block || ''
    })
  );

  const count = 20;

  return { rows, count };
};

export const checkPendingTx = async (txHash: string) => {
  try {
    await fetchAPI(`${AppEnv.DAG_BLOCK_EXPLORER_API}${txHash}`);
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return false;
  }
};
