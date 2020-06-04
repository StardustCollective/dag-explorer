<h3>Example</h3>


```js
import Table from '.'

;

const rows = Array.from(Array(10), (_, index) => ({
  id: index,
  hash: '19713e56a3bb3dd405bda984f4669718e8dc9990cc284bfad84f1844bfdb7f15',
  block: '19713e56a3bb3dd405bda984f4669718e8dc9990cc284bfad84f1844bfdb7f15',
  sender: '19713e56a3bb3dd405bda984f4669718e8dc9990cc284bfad84f1844bfdb7f15',
  receiver: '19713e56a3bb3dd405bda984f4669718e8dc9990cc284bfad84f1844bfdb7f15',
}));

const columns = [
  { field: 'id', primary: true, mediaHidden: 'smDown', width: '1px' },
  { field: 'hash', noWrap: true },
  { field: 'block', noWrap: true },
  { field: 'sender', noWrap: true },
  { field: 'receiver', noWrap: true }
];

const MyTable = ({ rows, columns }) => {
  console.log('RENDER TABLE: ', rows, columns);
  return (
    <Table
      columns={columns}
      rows={rows}
      detail={row => (
        <Table>
          Hello
        </Table>
      )}
    />
  );
};

<MyTable rows={rows} columns={columns}/>
```