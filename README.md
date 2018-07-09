# sample-mongoose

```js
const o1 = { col1: 3, col2: 'a3' };
const o2 = { col1: 3, col2: 'aaa333' };

// * upsert *

// reset
Aaa.remove({})
// -> { n: 2, ok: 1 }

// check content
Aaa.findOne({ col1: o1.col1 })
// -> null

// update not found
Aaa.update({ col1: o1.col1 }, o1)
// -> { n: 0, nModified: 0, ok: 1 }

// insert by upsert
Aaa.update({ col1: o1.col1 }, o1, { upsert: true })
// -> { n: 1,
//      nModified: 0,
//      upserted: [ { index: 0, _id: 5b433b933a9b509714b9982e } ],
//      ok: 1 }

// check content
Aaa.findOne({ col1: o1.col1 })
// -> { _id: 5b433b933a9b509714b9982e, col1: 3, __v: 0, col2: 'a3' }

// update
Aaa.update({ col1: o1.col1 }, o1)
// -> { n: 1, nModified: 0, ok: 1 }

// update the same object
Aaa.update({ col1: o1.col1 }, o1, { upsert: true })
// -> { n: 1, nModified: 0, ok: 1 }

// update the different object
Aaa.update({ col1: o2.col1 }, o2)
// -> { n: 1, nModified: 1, ok: 1 }

// * save *

// reset
Aaa.remove({})
// -> { n: 1, ok: 1 }

// check content
Aaa.findOne({ col1: o1.col1 })
// -> null

// save
new Aaa(o1).save()
// -> { _id: 5b433b9333ef93257cc52e78, col1: 3, col2: 'a3', __v: 0 }

// check content
Aaa.findOne({ col1: o1.col1 })
// -> { _id: 5b433b9333ef93257cc52e78, col1: 3, col2: 'a3', __v: 0 }

// save the different object
new Aaa(o2).save()
// -> { _id: 5b433b9333ef93257cc52e79, col1: 3, col2: 'aaa333', __v: 0 }

// check content
Aaa.findOne({ col1: o2.col1 })
// -> { _id: 5b433b9333ef93257cc52e78, col1: 3, col2: 'a3', __v: 0 }

// find and save
Aaa.findOne({ col1: o2.col1 }).then(o => { o.col2 = 'SAVED'; return o.save(); })
// -> { _id: 5b433b9333ef93257cc52e78, col1: 3, col2: 'SAVED', __v: 0 }

// check content
Aaa.findOne({ col1: o2.col1 })
// -> { _id: 5b433b9333ef93257cc52e78, col1: 3, col2: 'SAVED', __v: 0 }
