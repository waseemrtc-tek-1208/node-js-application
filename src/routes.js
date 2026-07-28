const { getGreeting } = require('./utils');
const url = require('url');
const {
  getUserById,
  authenticate,
  readUserFile,
  searchUsers,
  runDiagnostic,
  deleteUser,
  listUsers
} = require('./userController');

function handleRequest(req, res) {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;
  const query = parsed.query;

  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (pathname === '/user') {
    const user = getUserById(query.id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
    return;
  }

  if (pathname === '/file') {
    const content = readUserFile(query.name);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(content);
    return;
  }

  if (pathname === '/search') {
    const results = searchUsers(query.q);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(results));
    return;
  }

  if (pathname === '/login') {
    const user = authenticate(query.username, query.password);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
    return;
  }

  if (pathname === '/diagnostic') {
    runDiagnostic(query.host);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Diagnostic started');
    return;
  }

  if (pathname === '/users') {
    const page = parseInt(query.page) || 0;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(listUsers(page)));
    return;
  }

  if (pathname === '/delete-user') {
    deleteUser(query.id, query.role);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(getGreeting());
}

module.exports = { handleRequest };
