import qs from 'qs';
import { PagedResult, PagedParams } from '.';
import { AppEnv } from '../app-env';
import { latestInfo } from '~api/latest-info';
import { BlockInfo } from '~api/types';

export const fetchBlocks = async (
  params?: PagedParams
): Promise<PagedResult<BlockInfo>> => {
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
    `${AppEnv.DAG_EXPLORER_REST}/latest/blocks.json${queryString}`
  );
  const rows = await response.json();

  return { rows: Object.values(rows), count: latestInfo.blockCount };
};
