<h3>Basic example</h3>

```js
import useBreakpoints from '.';

const MyComponent = () => {

  const mediaMatches = useBreakpoints();

  console.log('mediaMatches', mediaMatches);

  return (
    <div>Hello</div>
  );
}

<MyComponent/>;

```