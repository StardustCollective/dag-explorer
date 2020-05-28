<h3>Example</h3>


```js
import Table from '.';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';

const rows = Array.from(Array(10), (_, index) => ({
  id: index,
  firstName: '19713e56a3bb3dd405bda984f4669718e8dc9990cc284bfad84f1844bfdb7f15',
  lastName: '19713e56a3bb3dd405bda984f4669718e8dc9990cc284bfad84f1844bfdb7f15'
}));

console.log('rows', [...Array(100).keys()].length, rows);

<Table>
  <TableHead>
    <TableRow>
      <TableCell>Id</TableCell>
      <TableCell>First name</TableCell>
      <TableCell>Last name</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {rows.map(({ id, firstName, lastName }) => (
      <TableRow key={id}>
        <TableCell size="small">
          <Typography variant="body2" display="block" noWrap>
            {id}
          </Typography>
        </TableCell>
        <TableCell size="small">
          <Typography variant="body2" display="block" noWrap>
            {firstName}
          </Typography>
        </TableCell>
        <TableCell size="small">
          <Typography variant="body2" display="block" noWrap>
            {lastName}
          </Typography>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```