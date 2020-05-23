const express = require('express');
const axios = require('axios');


async function start() {
  const app = express();

  const {data: {results: users}} = await axios('https://randomuser.me/api/?results=1000');

  const router = express.Router();
  router.get('/search', (req, res, next) => {
    const {q} = req.query;
    if (!q) return next(new Error('No query found'));
  });

  app.use(router);


  app.listen(8080);
  console.log('API is listening on http://localhost:8080');
}

start();
