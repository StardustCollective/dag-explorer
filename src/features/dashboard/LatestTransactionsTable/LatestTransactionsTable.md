<h3>Example</h3>

```js
const rows = Array.from(Array(10), (_, index) => ({
  hash: '19713e56a3bb3dd405bda984f4669718e8dc9990cc284bfad84f1844bfdb7f' + index,
  block: '19713e56a3bb3dd405bda984f4669718e8dc9990cc284bfad84f1844bfdb7f15',
  sender: '19713e56a3bb3dd405bda984f4669718e8dc9990cc284bfad84f1844bfdb7f15',
  receiver: '19713e56a3bb3dd405bda984f4669718e8dc9990cc284bfad84f1844bfdb7f15',
  amount: '23467 EUR',
  fee: '123 EUR'
}));

<LatestTransactionsTable rows={rows}/>
```