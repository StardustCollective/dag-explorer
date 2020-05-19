import qs from 'qs';
import { PagedResult, PagedParams, Info } from '.';
import { AppEnv } from '../app-env';
import { latestInfo } from '~api/latest-info';

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
    `${AppEnv.DAG_EXPLORER_API}/latest/blocks.json${queryString}`
  );
  const rows = await response.json();

  return { rows: Object.values(rows), count: latestInfo.blockCount };
};
