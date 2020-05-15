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
  const response = await fetch(
    `https://www.stargazer.network/api/v1/address/${hash}`
  );
  const payload = await response.json();

  return {
    hash,
    balance: 0,
    ...payload
  };
};
