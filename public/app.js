const money = (n) => '$' + n.toLocaleString('en-US');
const badge = (v) => `<span class="badge ${v}">${v}</span>`;

const ordersRows = (list) => list.map((o) =>
  `<tr><td>#${o.id}</td><td>${o.customer}</td><td>${money(o.amount)}</td><td>${badge(o.status)}</td><td>${o.date}</td></tr>`
).join('');

const page = document.body.dataset.page;

if (page === 'overview') {
  fetch('/api/summary').then((r) => r.json()).then((d) => {
    document.getElementById('revenue').textContent = money(d.revenue);
    document.getElementById('orders').textContent = d.orders;
    document.getElementById('customers').textContent = d.customers;
    document.getElementById('pending').textContent = d.pending;
    const max = Math.max(...d.revenueByMonth.map((m) => m.value));
    document.getElementById('chart').innerHTML = d.revenueByMonth.map((m) =>
      `<div class="bar" style="height:${(m.value / max) * 100}%" title="${money(m.value)}"><span>${m.month}</span></div>`
    ).join('');
    document.getElementById('recent').innerHTML = ordersRows(d.recentOrders);
  });
}

if (page === 'orders') {
  let all = [];
  const body = document.getElementById('rows');
  const render = () => {
    const f = document.getElementById('filter').value;
    body.innerHTML = ordersRows(f ? all.filter((o) => o.status === f) : all);
  };
  fetch('/api/orders').then((r) => r.json()).then((d) => { all = d; render(); });
  document.getElementById('filter').addEventListener('change', render);
}

if (page === 'customers') {
  fetch('/api/customers').then((r) => r.json()).then((list) => {
    document.getElementById('rows').innerHTML = list.map((c) =>
      `<tr><td>${c.name}</td><td>${c.email}</td><td>${badge(c.plan)}</td><td>${money(c.spent)}</td></tr>`
    ).join('');
  });
}
