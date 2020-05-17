<h3>Basic Usage</h3>

```js
<ActivityIndicator>
  Fetching transactions...
</ActivityIndicator>
```

<h3>Activity Indicator Button</h3>

```js
import Button from '@material-ui/core/Button';

const [isPending, setPending] = React.useState(false);

<>
  <Button variant="outlined" color="primary" onClick={() => setPending(!isPending)} fullWidth>
    <ActivityIndicator pending={isPending}>
      Load more
    </ActivityIndicator>
  </Button>
</>
```
