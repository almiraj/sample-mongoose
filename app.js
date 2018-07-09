'use strict';

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

function executable(f) {
  return () => Promise.resolve(f).then(f => console.log(f.toString()) || f).then(f => f()).then(console.log);
}

Promise.resolve()
  .then(() => console.log('\n// * upsert *'))
  .then(() => console.log('\n// reset')).then(executable(() => Aaa.remove({})))
  .then(() => console.log('\n// check content')).then(executable(() => Aaa.findOne({ col1: o1.col1 })))
  .then(() => console.log('\n// update not found')).then(executable(() => Aaa.update({ col1: o1.col1 }, o1)))
  .then(() => console.log('\n// insert by upsert')).then(executable(() => Aaa.update({ col1: o1.col1 }, o1, { upsert: true })))
  .then(() => console.log('\n// check content')).then(executable(() => Aaa.findOne({ col1: o1.col1 })))
  .then(() => console.log('\n// update')).then(executable(() => Aaa.update({ col1: o1.col1 }, o1)))
  .then(() => console.log('\n// update the same object')).then(executable(() => Aaa.update({ col1: o1.col1 }, o1, { upsert: true })))
  .then(() => console.log('\n// update the different object')).then(executable(() => Aaa.update({ col1: o2.col1 }, o2)))
  .then(() => console.log('\n// * save *'))
  .then(() => console.log('\n// reset')).then(executable(() => Aaa.remove({})))
  .then(() => console.log('\n// check content')).then(executable(() => Aaa.findOne({ col1: o1.col1 })))
  .then(() => console.log('\n// save')).then(executable(() => new Aaa(o1).save()))
  .then(() => console.log('\n// check content')).then(executable(() => Aaa.findOne({ col1: o1.col1 })))
  .then(() => console.log('\n// save the different object')).then(executable(() => new Aaa(o2).save()))
  .then(() => console.log('\n// check content')).then(executable(() => Aaa.findOne({ col1: o2.col1 })))
  .then(() => console.log('\n// find and save')).then(executable(() => Aaa.findOne({ col1: o2.col1 }).then(o => { o.col2 = 'SAVED'; return o.save(); })))
  .then(() => console.log('\n// check content')).then(executable(() => Aaa.findOne({ col1: o2.col1 })))
  .then(() => {
    mongoose.disconnect();
  })
  .catch((e) => {
    mongoose.disconnect();
    console.log(e);
  });

// // * upsert *
//
// // reset
// () => Aaa.remove({})
// { n: 2, ok: 1 }
//
// // check content
// () => Aaa.findOne({ col1: o1.col1 })
// null
//
// // update not found
// () => Aaa.update({ col1: o1.col1 }, o1)
// { n: 0, nModified: 0, ok: 1 }
//
// // insert by upsert
// () => Aaa.update({ col1: o1.col1 }, o1, { upsert: true })
// { n: 1,
//   nModified: 0,
//   upserted: [ { index: 0, _id: 5b433b933a9b509714b9982e } ],
//   ok: 1 }
//
// // check content
// () => Aaa.findOne({ col1: o1.col1 })
// { _id: 5b433b933a9b509714b9982e, col1: 3, __v: 0, col2: 'a3' }
//
// // update
// () => Aaa.update({ col1: o1.col1 }, o1)
// { n: 1, nModified: 0, ok: 1 }
//
// // update the same object
// () => Aaa.update({ col1: o1.col1 }, o1, { upsert: true })
// { n: 1, nModified: 0, ok: 1 }
//
// // update the different object
// () => Aaa.update({ col1: o2.col1 }, o2)
// { n: 1, nModified: 1, ok: 1 }
//
// // * save *
//
// // reset
// () => Aaa.remove({})
// { n: 1, ok: 1 }
//
// // check content
// () => Aaa.findOne({ col1: o1.col1 })
// null
//
// // save
// () => new Aaa(o1).save()
// { _id: 5b433b9333ef93257cc52e78, col1: 3, col2: 'a3', __v: 0 }
//
// // check content
// () => Aaa.findOne({ col1: o1.col1 })
// { _id: 5b433b9333ef93257cc52e78, col1: 3, col2: 'a3', __v: 0 }
//
// // save the different object
// () => new Aaa(o2).save()
// { _id: 5b433b9333ef93257cc52e79, col1: 3, col2: 'aaa333', __v: 0 }
//
// // check content
// () => Aaa.findOne({ col1: o2.col1 })
// { _id: 5b433b9333ef93257cc52e78, col1: 3, col2: 'a3', __v: 0 }
//
// // find and save
// () => Aaa.findOne({ col1: o2.col1 }).then(o => { o.col2 = 'SAVED'; return o.save(); })
// { _id: 5b433b9333ef93257cc52e78, col1: 3, col2: 'SAVED', __v: 0 }
//
// // check content
// () => Aaa.findOne({ col1: o2.col1 })
// { _id: 5b433b9333ef93257cc52e78, col1: 3, col2: 'SAVED', __v: 0 }
