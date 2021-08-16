const express = require('express');
const app = express();
const knex = require('knex')(require('./knexfile.js')['development']);