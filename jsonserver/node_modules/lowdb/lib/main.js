'use strict';

var lodash = require('lodash');
var isPromise = require('is-promise');

module.exports = function (adapter) {
  if (typeof adapter !== 'object') {
    throw new Error('An adapter must be provided, see https://github.com/typicode/lowdb/#usage');
  }

  // Create a fresh copy of lodash
  var _ = lodash.runInContext();
  var db = _.chain({});

  // Add write function to lodash
  // Calls save before returning result
  _.prototype.write = _.wrap(_.prototype.value, function (func) {
    var funcRes = func.apply(this);
    return db.write(funcRes);
  });

  function plant(state) {
    db.__wrapped__ = state;
    return db;
  }

  // Lowdb API
  // Expose _ for mixins
  db._ = _;

  db.read = function () {
    var r = adapter.read();
    return isPromise(r) ? r.then(plant) : plant(r);
  };

  db.write = function (returnValue) {
    var w = adapter.write(db.getState());
    return isPromise(w) ? w.then(function () {
      return returnValue;
    }) : returnValue;
  };

  db.getState = function () {
    return db.__wrapped__;
  };

  db.setState = function (state) {
    return plant(state);
  };

  return db.read();
};