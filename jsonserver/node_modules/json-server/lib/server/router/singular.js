"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const express = require('express');

const write = require('./write');

const getFullURL = require('./get-full-url');

const delay = require('./delay');

module.exports = (db, name, opts) => {
  const router = express.Router();
  router.use(delay);

  function show(req, res, next) {
    res.locals.data = db.get(name).value();
    next();
  }

  function create(req, res, next) {
    if (opts._isFake) {
      res.locals.data = req.body;
    } else {
      db.set(name, req.body).value();
      res.locals.data = db.get(name).value();
    }

    res.setHeader('Access-Control-Expose-Headers', 'Location');
    res.location(`${getFullURL(req)}`);
    res.status(201);
    next();
  }

  function update(req, res, next) {
    if (opts._isFake) {
      if (req.method === 'PUT') {
        res.locals.data = req.body;
      } else {
        const resource = db.get(name).value();
        res.locals.data = _objectSpread({}, resource, req.body);
      }
    } else {
      if (req.method === 'PUT') {
        db.set(name, req.body).value();
      } else {
        db.get(name).assign(req.body).value();
      }

      res.locals.data = db.get(name).value();
    }

    next();
  }

  const w = write(db);
  router.route('/').get(show).post(create, w).put(update, w).patch(update, w);
  return router;
};