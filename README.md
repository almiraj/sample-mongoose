# sample-mongoose-upsert

```js
const o1 = { col1: 3, col2: 'a3' };
const o2 = { col1: 3, col2: 'aaa333' };

Promise.all([
  Aaa.remove({}),
    // -> { n: 1, ok: 1 }
  Aaa.update({ col1: o1.col1 }, o1),
    // -> { n: 0, nModified: 0, ok: 1 }
  Aaa.update({ col1: o1.col1 }, o1, { upsert: true }),
    // -> { n: 1, nModified: 0, upserted: [ { index: 0, _id: 5b42ff1a3a9b509714b98aa6 } ], ok: 1 }
  Aaa.update({ col1: o1.col1 }, o1),
    // -> { n: 1, nModified: 0, ok: 1 }
  Aaa.update({ col1: o1.col1 }, o1, { upsert: true }),
    // -> { n: 1, nModified: 0, ok: 1 }
  Aaa.update({ col1: o2.col1 }, o2),
    // -> { n: 1, nModified: 1, ok: 1 }
]);
```
