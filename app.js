'use strict';

const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/db1');

const Schema = mongoose.Schema;

const AModel = mongoose.model('AModel', new Schema({
  col1: { type: Number }, col2: { type: String }
}));
const o1 = { col1: 3, col2: 'a3' };
const o2 = { col1: 3, col2: 'aaa333' };

function executable(f) {
  return () => Promise.resolve(f).then(f => console.log(f.toString()) || f).then(f => f()).then(console.log);
}

Promise.resolve()
  .then(() => console.log('\n// * upsert *'))
  .then(() => console.log('\n// reset')).then(executable(() => AModel.remove({})))
  .then(() => console.log('\n// find all')).then(executable(() => AModel.find({})))
  .then(() => console.log('\n// update not found')).then(executable(() => AModel.update({ col1: o1.col1 }, o1)))
  .then(() => console.log('\n// insert by upsert')).then(executable(() => AModel.update({ col1: o1.col1 }, o1, { upsert: true })))
  .then(() => console.log('\n// find all')).then(executable(() => AModel.find({})))
  .then(() => console.log('\n// update')).then(executable(() => AModel.update({ col1: o1.col1 }, o1)))
  .then(() => console.log('\n// update the same object')).then(executable(() => AModel.update({ col1: o1.col1 }, o1, { upsert: true })))
  .then(() => console.log('\n// update the different object')).then(executable(() => AModel.update({ col1: o2.col1 }, o2)))
  .then(() => console.log('\n// find all')).then(executable(() => AModel.find({})))
  .then(() => console.log('\n// * save *'))
  .then(() => console.log('\n// reset')).then(executable(() => AModel.remove({})))
  .then(() => console.log('\n// find all')).then(executable(() => AModel.find({})))
  .then(() => console.log('\n// save')).then(executable(() => new AModel(o1).save()))
  .then(() => console.log('\n// save the same object')).then(executable(() => new AModel(o1).save()))
  .then(() => console.log('\n// save the different object')).then(executable(() => new AModel(o2).save()))
  .then(() => console.log('\n// find all')).then(executable(() => AModel.find({})))
  .then(() => console.log('\n// findOne and save')).then(executable(() => AModel.findOne({ col1: o2.col1 }).then(o => { o.col2 = 'AAA333'; return o.save(); })))
  .then(() => console.log('\n// find all')).then(executable(() => AModel.find({})))
  .then(() => console.log('\n// * create *'))
  .then(() => console.log('\n// reset')).then(executable(() => AModel.remove({})))
  .then(() => console.log('\n// find all')).then(executable(() => AModel.find({})))
  .then(() => console.log('\n// create')).then(executable(() => AModel.create(o1)))
  .then(() => console.log('\n// create the same object')).then(executable(() => AModel.create(o1)))
  .then(() => console.log('\n// create the different object')).then(executable(() => AModel.create(o2)))
  .then(() => console.log('\n// find all')).then(executable(() => AModel.find({})))
  .then(() => console.log('\n// * upsert (special) *'))
  .then(() => console.log('\n// upsert without condition')).then(executable(() => AModel.update({}, { col1: 3, col2: 'AAA333' }, { upsert: true })))
  .then(() => console.log('\n// find all')).then(executable(() => AModel.find({})))
  .then(() => {
    mongoose.disconnect();
  })
  .catch((e) => {
    mongoose.disconnect();
    console.log(e);
  });
