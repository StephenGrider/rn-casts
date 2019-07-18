'use strict';

var isPromise = require('is-promise');

var init = function init(db, key, adapter) {
  db.read = function () {
    var r = adapter.read();

    return isPromise(r) ? r.then(db.plant) : db.plant(r);
  };

  db.write = function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : db.getState();

    var w = adapter.write(db.getState());

    return isPromise(w) ? w.then(function () {
      return value;
    }) : value;
  };

  db.plant = function (state) {
    db[key] = state;
    return db;
  };

  db.getState = function () {
    return db[key];
  };

  db.setState = function (state) {
    db.plant(state);
    return db;
  };

  return db.read();
};

module.exports = {
  init
};