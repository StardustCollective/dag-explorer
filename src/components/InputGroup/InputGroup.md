<h3>Basic usage</h3>

```js
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

<InputGroup prepend={
  <Button
    color="secondary"
    variant="contained"
  >
    Click me!
  </Button>
}>
  <TextField variant="outlined" placeholder="What's up?" size="large"/>
</InputGroup>
```
