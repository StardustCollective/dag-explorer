import qs from 'qs';
import { PagedResult, PagedParams, fetchInfo } from '.';

export type Aggregation = {
  dagAmount: number;
  feeAmount: number;
  txCount: 3;
};

export type Range = {
  min: number;
  max: number;
};

export type Block = {
  aggr: Aggregation;
  childCount: number;
  hash: string;
  height: number;
  range: Range;
};

export const fetchBlocks = async (
  params?: PagedParams
): Promise<PagedResult<Block>> => {
  let queryString = '';

  if (params) {
    const { startAt = 0, endAt = 9, orderBy = '$key' } = params;
    const urlParams = {
      startAt: `\"${startAt}\"`,
      endAt: `\"${endAt}\"`,
      orderBy: JSON.stringify(orderBy)
    };

    queryString = `?${qs.stringify(urlParams)}`;
  }

  const response = await fetch(
    `https://stargazer-4497c.firebaseio.com/latest/blocks.json${queryString}`
  );
  const rows = await response.json();
  const { blockCount: count } = await fetchInfo();

  return { rows: Object.values(rows), count };
};
