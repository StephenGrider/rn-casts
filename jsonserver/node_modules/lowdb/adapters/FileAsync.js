'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Not using async/await on purpose to avoid adding regenerator-runtime
// to lowdb dependencies
var fs = require('graceful-fs');
var pify = require('pify');
var steno = require('steno');
var Base = require('./Base');

var readFile = pify(fs.readFile);
var writeFile = pify(steno.writeFile);

var FileAsync = function (_Base) {
  _inherits(FileAsync, _Base);

  function FileAsync() {
    _classCallCheck(this, FileAsync);

    return _possibleConstructorReturn(this, (FileAsync.__proto__ || Object.getPrototypeOf(FileAsync)).apply(this, arguments));
  }

  _createClass(FileAsync, [{
    key: 'read',
    value: function read() {
      var _this2 = this;

      // fs.exists is deprecated but not fs.existsSync
      if (fs.existsSync(this.source)) {
        // Read database
        return readFile(this.source, 'utf-8').then(function (data) {
          // Handle blank file
          var trimmed = data.trim();
          return trimmed ? _this2.deserialize(trimmed) : _this2.defaultValue;
        }).catch(function (e) {
          if (e instanceof SyntaxError) {
            e.message = `Malformed JSON in file: ${_this2.source}\n${e.message}`;
          }
          throw e;
        });
      } else {
        // Initialize
        return writeFile(this.source, this.serialize(this.defaultValue)).then(function () {
          return _this2.defaultValue;
        });
      }
    }
  }, {
    key: 'write',
    value: function write(data) {
      return writeFile(this.source, this.serialize(data));
    }
  }]);

  return FileAsync;
}(Base);

module.exports = FileAsync;