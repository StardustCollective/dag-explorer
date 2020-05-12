import qs from 'qs';
import { PagedResult, SearchParams, PagedParams } from '.';

export type Transaction = {
  id: number;
  txnHash: string;
  blockNo: number;
  date: string;
  from: string;
  to: string;
  value: number;
  txnFee: number;
};

export const fetchTransactions = async (
  params?: SearchParams<Transaction> & PagedParams
): Promise<PagedResult<Transaction>> => {
  const response = await fetch(
    `http://localhost:3000/api/v1/transactions${
      params ? '?' + qs.stringify(params) : ''
    }`
  );
  return await response.json();
};

export const fetchTransaction = async (
  id: number | string
): Promise<Transaction> => {
  const response = await fetch(
    `http://localhost:3000/api/v1/transactions/${id}`
  );
  return await response.json();
};
