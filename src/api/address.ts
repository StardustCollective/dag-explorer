import { AppEnv } from '../app-env';

export type Address = {
  balance: number;
  memPoolBalance: number;
  reputation: number;
  ancestorBalances: any;
  ancestorReputations: any;
  balanceByLatestSnapshot: number;
  rewardsBalance: number;
  hash: string; // Added for keeping track of the actual result
};

export const fetchAddress = async (hash: string) => {
  const response = await fetch(`${AppEnv.STAR_GAZER_API}/address/${hash}`);
  let payload = await response.json();

  if (!payload) {
    payload = { balance: 0 };
  } else {
    payload.balance = payload.balance / 1e8;
  }

  return {
    hash,
    ...payload
  };
};
