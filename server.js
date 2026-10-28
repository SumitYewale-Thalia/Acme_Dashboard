import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { customers, orders, revenueByMonth } from './data.js';

const root = join(fileURLToPath(new URL('.', import.meta.url)), 'public');
const port = Number(process.env.PORT) || 3000;
const types = { '.html': 'text/html', '.css': 'text/css' };

createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  if (path === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }
  if (path === '/api/summary') {
    const paid = orders.filter((o) => o.status === 'Paid');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      revenue: paid.reduce((sum, o) => sum + o.amount, 0),
      orders: orders.length,
      customers: customers.length,
      pending: orders.filter((o) => o.status === 'Pending').length,
      revenueByMonth,
      recentOrders: orders.slice(0, 5),
    }));
    return;
  }
  if (path === '/api/orders' || path === '/api/customers') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(path === '/api/orders' ? orders : customers));
    return;
  }
  const file = normalize(path === '/' ? '/index.html' : path);
  try {
    const body = await readFile(join(root, file));
    res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
}).listen(port, '0.0.0.0', () => console.log(`Listening on ${port}`));
