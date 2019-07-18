'use strict';

var flow = require('lodash/flow');
var get = require('lodash/get');
var set = require('lodash/set');
var common = require('./common');

module.exports = function (adapter) {
  function db(path, defaultValue) {
    function getValue(funcs) {
      var result = get(db.getState(), path, defaultValue);
      return flow(funcs)(result);
    }

    getValue.write = function () {
      var result = getValue.apply(undefined, arguments);
      set(db.getState(), path, result);
      return db.write();
    };

    return getValue;
  }

  return common.init(db, '__state__', adapter);
};