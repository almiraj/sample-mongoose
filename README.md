# sample-mongoose

```js
const AModel = mongoose.model('AModel', new Schema({
  col1: { type: Number }, col2: { type: String }
}));
const o1 = { col1: 3, col2: 'a3' };
const o2 = { col1: 3, col2: 'aaa333' };

// * upsert *

// reset
AModel.remove({})
// -> { n: 3, ok: 1 }

// find all
AModel.find({})
// -> []

// update not found
AModel.update({ col1: o1.col1 }, o1)
// -> { n: 0, nModified: 0, ok: 1 }

// insert by upsert
AModel.update({ col1: o1.col1 }, o1, { upsert: true })
// -> { n: 1,
//      nModified: 0,
//      upserted: [ { index: 0, _id: 5b434c6b3a9b509714b99d51 } ],
//      ok: 1 }

// find all
AModel.find({})
// -> [ { _id: 5b434c6b3a9b509714b99d51, col1: 3, __v: 0, col2: 'a3' } ]

// update
AModel.update({ col1: o1.col1 }, o1)
// -> { n: 1, nModified: 0, ok: 1 }

// update the same object
AModel.update({ col1: o1.col1 }, o1, { upsert: true })
// -> { n: 1, nModified: 0, ok: 1 }

// update the different object
AModel.update({ col1: o2.col1 }, o2)
// -> { n: 1, nModified: 1, ok: 1 }

// find all
AModel.find({})
// -> [ { _id: 5b434c6b3a9b509714b99d51, col1: 3, __v: 0, col2: 'aaa333' } ]

// * save *

// reset
AModel.remove({})
// -> { n: 1, ok: 1 }

// find all
AModel.find({})
// -> []

// save
new AModel(o1).save()
// -> { _id: 5b434c6bdc5d9f1ef42d9163, col1: 3, col2: 'a3', __v: 0 }

// save the same object
new AModel(o1).save()
// -> { _id: 5b434c6bdc5d9f1ef42d9164, col1: 3, col2: 'a3', __v: 0 }

// save the different object
new AModel(o2).save()
// -> { _id: 5b434c6bdc5d9f1ef42d9165, col1: 3, col2: 'aaa333', __v: 0 }

// find all
AModel.find({})
// -> [ { _id: 5b434c6bdc5d9f1ef42d9163, col1: 3, col2: 'a3', __v: 0 },
//      { _id: 5b434c6bdc5d9f1ef42d9164, col1: 3, col2: 'a3', __v: 0 },
//      { _id: 5b434c6bdc5d9f1ef42d9165, col1: 3, col2: 'aaa333', __v: 0 } ]

// findOne and save
AModel.findOne({ col1: o2.col1 }).then(o => { o.col2 = 'AAA333'; return o.save(); })
// -> { _id: 5b434c6bdc5d9f1ef42d9163, col1: 3, col2: 'AAA333', __v: 0 }

// find all
AModel.find({})
// -> [ { _id: 5b434c6bdc5d9f1ef42d9163, col1: 3, col2: 'AAA333', __v: 0 },
//      { _id: 5b434c6bdc5d9f1ef42d9164, col1: 3, col2: 'a3', __v: 0 },
//      { _id: 5b434c6bdc5d9f1ef42d9165, col1: 3, col2: 'aaa333', __v: 0 } ]

// * create *

// reset
AModel.remove({})
// -> { n: 3, ok: 1 }

// find all
AModel.find({})
// -> []

// create
AModel.create(o1)
// -> { _id: 5b434c6bdc5d9f1ef42d9166, col1: 3, col2: 'a3', __v: 0 }

// create the same object
AModel.create(o1)
// -> { _id: 5b434c6bdc5d9f1ef42d9167, col1: 3, col2: 'a3', __v: 0 }

// create the different object
AModel.create(o2)
// -> { _id: 5b434c6bdc5d9f1ef42d9168, col1: 3, col2: 'aaa333', __v: 0 }

// find all
AModel.find({})
// -> [ { _id: 5b434c6bdc5d9f1ef42d9166, col1: 3, col2: 'a3', __v: 0 },
//      { _id: 5b434c6bdc5d9f1ef42d9167, col1: 3, col2: 'a3', __v: 0 },
//      { _id: 5b434c6bdc5d9f1ef42d9168, col1: 3, col2: 'aaa333', __v: 0 } ]

// * upsert (special) *

// upsert without condition
AModel.update({}, { col1: 3, col2: 'AAA333' }, { upsert: true })
// -> { n: 1, nModified: 1, ok: 1 }

// find all
AModel.find({})
// -> [ { _id: 5b434c6bdc5d9f1ef42d9166, col1: 3, col2: 'AAA333', __v: 0 },
//      { _id: 5b434c6bdc5d9f1ef42d9167, col1: 3, col2: 'a3', __v: 0 },
//      { _id: 5b434c6bdc5d9f1ef42d9168, col1: 3, col2: 'aaa333', __v: 0 } ]
```