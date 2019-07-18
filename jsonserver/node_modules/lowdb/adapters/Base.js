'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stringify = require('./_stringify');

var Base = function Base(source) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === undefined ? {} : _ref$defaultValue,
      _ref$serialize = _ref.serialize,
      serialize = _ref$serialize === undefined ? stringify : _ref$serialize,
      _ref$deserialize = _ref.deserialize,
      deserialize = _ref$deserialize === undefined ? JSON.parse : _ref$deserialize;

  _classCallCheck(this, Base);

  this.source = source;
  this.defaultValue = defaultValue;
  this.serialize = serialize;
  this.deserialize = deserialize;
};

module.exports = Base;