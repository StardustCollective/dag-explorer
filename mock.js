const faker = require('faker');
const qs = require('qs');
const { default: Fuse } = require('fuse.js');
const { v4: uuid } = require('uuid');
const { default: fetchMock } = require('fetch-mock');
const json5 = require('json5');

const transactions = [...Array(100).keys()]
  .map(index => (transaction => ({
    txnFee: (transaction.value * 0.01).toPrecision(3),
    ...transaction
  }))({
    txnHash: `0x${uuid().replace(/-/g, 'a')}`,
    from: `0x${uuid().replace(/-/g, 'a')}`,
    to: `0x${uuid().replace(/-/g, 'a')}`,
    value: parseFloat(faker.finance.amount()),
    date: faker.date.recent()
  }))
  .sort((a, b) => b.date - a.date)
  .map((transaction, index, array) => ({
    id: array.length - index,
    blockNo: 9689830 + ~~((array.length - index + 1) / 10),
    ...transaction
  }));

fetchMock.get('express:/api/v1/transactions', url => {
  const params = qs.parse(url.replace(/^.*\?/, ''));
  const { page = 1, rowsPerPage = 10, term, keys = [ 'txnHash', 'blockNo', 'from', 'to' ] } = params;

  console.log('SEARCH API :', term, keys, transactions.length);

  const fuse = new Fuse(transactions, {
    keys,
    location: 0,
    threshold: 0,
    distance: 0,
  });

  let result = transactions;

  if (term) {
    result = fuse.search(term).map(({ item }) => item);

    console.log('result: ', result);
  }

  const limit = +rowsPerPage;
  const offset = (+page - 1) * limit;
  const rows = result.slice(offset, offset + limit);
  const count = result.length;

  return {
    count,
    rows
  };
});

fetchMock.get('express:/api/v1/transactions/:id', url => {
  const id = url.match(/[\w\d-_]+$/g);

  return transactions.find(transaction => transaction.id == id);
});


const log = (...args) => {
  const messages = args.map(arg =>
    typeof arg === 'object'
      ? json5.stringify(arg, (key, value) => {
        const numeric = parseFloat(value);

        if (!isNaN(numeric) && new String(numeric) == value) {
          return numeric;
        }

        if (value === true.toString() || value === false.toString()) {
          return value === true.toString() && Boolean(value);
        }

        return value;
      }, 1)
        .replace(/\n/g, ' ')
        .replace(/,(\s*[\]\}])/g, '$1')
        .replace(/\s+/g, ' ')
        .replace(/^\{|\}$/g, '')
    : arg
  );

  console.log(new Date().toISOString(), ...messages);
}

const fetch = global.fetch;

global.fetch = (...args) => {
  const [resource, init] = args;
  const url = typeof resource === 'string' ? resource : resource.url;
  const location = new URL(url);
  const { origin, pathname, search } = location;
  const params = qs.parse(location.search.replace(/^\?/, ''));
  const result = fetch(...args);

  result.then((response) => {
    log(response.status, `${origin}${pathname}`, params);

    return response;
  });

  return result;
}
