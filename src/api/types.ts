export type TransactionInfo = {
  amount: number;
  block: string;
  fee: number;
  hash: string;
  isDummy?: boolean;
  receiver: string;
  sender: string;
  timestamp: string;
};

type Aggregation = {
  dagAmount: number;
  feeAmount: number;
  txCount: number;
};

type Range = {
  min: number;
  max: number;
};

export type BlockInfo = {
  aggr: Aggregation;
  childCount: number;
  hash: string;
  height: number;
  range: Range;
};

export type SnapshotInfo = {
  dagAmount: number;
  feeAmount: number;
  txCount: number;
  height: number;
};

export type AddressInfo = {
  balance: number;
  memPoolBalance: number;
  reputation: number;
  ancestorBalances: any;
  ancestorReputations: any;
  balanceByLatestSnapshot: number;
  rewardsBalance: number;
  hash?: string; // Added for keeping track of the actual result
};
