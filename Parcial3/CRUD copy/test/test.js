const assert = require('chai').assert;
const http = require('http');
const { test } = require('node:test');

const BASE_URL = 'http://localhost:3000';

//it , chai.request, con aserciones

test('GET /personajes debe devolver status 200', async (t) => {
  await new Promise((resolve, reject) => {
    http.get(`${BASE_URL}/personajes`, (res) => {
      try {
        assert.equal(res.statusCode, 200);
        resolve();
      } catch (error) {
        reject(error);
      }
    }).on('error', reject);
  });
});


