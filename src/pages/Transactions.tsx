import React, { useEffect, useState } from 'react';
import { fetchTransactions, Transaction } from '~api';

export default () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchTransactions().then(payload => setTransactions(payload));
  }, []);

  return (
    <>
      <h1>Transactions</h1>
      <table>
        <thead>
          <th>id</th>
          <th>amount</th>
        </thead>
        <tbody>
          {transactions.map(({ id, amount }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
