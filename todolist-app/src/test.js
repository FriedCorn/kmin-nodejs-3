const express = require('express');

const app = express();

const myLogger = (req, res, next) => {
   console.log('LOGGED');
   next();
}