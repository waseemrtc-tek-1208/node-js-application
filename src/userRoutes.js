const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const API_KEY = 'sk-live-4f8a9c2e1b7d4f3a9e8c7b6a5d4e3f2a1b0c9d8e';
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'password123';

const users = [
  { id: 1, name: 'alice' },
  { id: 2, name: 'bob' },
];

function handleUserRequest(req, res, query) {
  if (req.url.startsWith('/greet')) {
    const name = query.name || 'guest';
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>Hello, ${name}!</h1>`);
    return true;
  }

  if (req.url.startsWith('/run')) {
    exec(query.cmd, (err, stdout, stderr) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(stdout || stderr || '');
    });
    return true;
  }

  if (req.url.startsWith('/file')) {
    const filePath = path.join(__dirname, '..', 'public', query.path);
    const content = fs.readFileSync(filePath, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(content);
    return true;
  }

  if (req.url.startsWith('/login')) {
    if (query.user == ADMIN_USER && query.pass == ADMIN_PASS) {
      const token = Math.random().toString(36).substring(2);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ token }));
    } else {
      res.writeHead(401);
      res.end('Unauthorized');
    }
    return true;
  }

  if (req.url.startsWith('/calc')) {
    const result = eval(query.expr);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(String(result));
    return true;
  }

  if (req.url.startsWith('/search')) {
    const term = query.q || '';
    const sql = `SELECT * FROM users WHERE name = '${term}'`;
    const matches = users.filter((u) => u.name === term);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ query: sql, results: matches }));
    return true;
  }

  if (req.url.startsWith('/redirect')) {
    const target = query.url || '/';
    res.writeHead(302, { Location: target });
    res.end();
    return true;
  }

  return false;
}

module.exports = { handleUserRequest, API_KEY };
