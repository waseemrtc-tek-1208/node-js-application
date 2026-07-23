const assert = require('assert');
const { getGreeting } = require('../src/utils');

function run() {
  assert.strictEqual(getGreeting(), 'Hello from node-js-applications-1!');
  console.log('All tests passed.');
}

run();