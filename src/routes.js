const url = require('url');
const { getGreeting } = require('./utils');
const { handleUserRequest } = require('./userRoutes');

function handleRequest(req, res) {
  const parsed = url.parse(req.url, true);

  if (parsed.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (handleUserRequest(req, res, parsed.query)) {
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(getGreeting());
}

module.exports = { handleRequest };
