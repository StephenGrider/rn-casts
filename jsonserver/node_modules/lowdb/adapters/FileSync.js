'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fs = require('graceful-fs');
var Base = require('./Base');

var readFile = fs.readFileSync;
var writeFile = fs.writeFileSync;

// Same code as in FileAsync, minus `await`

var FileSync = function (_Base) {
  _inherits(FileSync, _Base);

  function FileSync() {
    _classCallCheck(this, FileSync);

    return _possibleConstructorReturn(this, (FileSync.__proto__ || Object.getPrototypeOf(FileSync)).apply(this, arguments));
  }

  _createClass(FileSync, [{
    key: 'read',
    value: function read() {
      // fs.exists is deprecated but not fs.existsSync
      if (fs.existsSync(this.source)) {
        // Read database
        try {
          var data = readFile(this.source, 'utf-8').trim();
          // Handle blank file
          return data ? this.deserialize(data) : this.defaultValue;
        } catch (e) {
          if (e instanceof SyntaxError) {
            e.message = `Malformed JSON in file: ${this.source}\n${e.message}`;
          }
          throw e;
        }
      } else {
        // Initialize
        writeFile(this.source, this.serialize(this.defaultValue));
        return this.defaultValue;
      }
    }
  }, {
    key: 'write',
    value: function write(data) {
      return writeFile(this.source, this.serialize(data));
    }
  }]);

  return FileSync;
}(Base);

module.exports = FileSync;