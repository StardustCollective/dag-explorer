export type Transaction = {
  id: number;
  amount: number;
};

export const fetchTransactions = (): Promise<Transaction[]> => {
  return Promise.resolve([
    { id: 1, amount: 124 },
    { id: 2, amount: -124 }
  ]);
};
