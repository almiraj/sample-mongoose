const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/db1');

const Schema = mongoose.Schema;
const Aaa = mongoose.model('Aaa', new Schema({
  col1: { type: Number },
  col2: { type: String }
}));

const o1 = { col1: 3, col2: 'a3' };
const o2 = { col1: 3, col2: 'aaa333' };

Promise.all([
  Aaa.remove({}).then(console.log),
  Aaa.update({ col1: o1.col1 }, o1).then(console.log),
  Aaa.update({ col1: o1.col1 }, o1, { upsert: true }).then(console.log),
  Aaa.update({ col1: o1.col1 }, o1).then(console.log),
  Aaa.update({ col1: o1.col1 }, o1, { upsert: true }).then(console.log),
  Aaa.update({ col1: o2.col1 }, o2).then(console.log),
])
.then(() => {
  mongoose.disconnect();
})
.catch((e) => {
  mongoose.disconnect();
  console.log(e);
});

// { n: 1, ok: 1 }
// { n: 0, nModified: 0, ok: 1 }
// { n: 1,
//   nModified: 0,
//   upserted: [ { index: 0, _id: 5b4300c13a9b509714b98b0c } ],
//   ok: 1 }
// { n: 1, nModified: 0, ok: 1 }
// { n: 1, nModified: 0, ok: 1 }
// { n: 1, nModified: 1, ok: 1 }
