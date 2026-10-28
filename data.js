export const customers = [
  { id: 1, name: 'Acme Corp', email: 'billing@acme.example', plan: 'Enterprise', spent: 12400 },
  { id: 2, name: 'Globex', email: 'ops@globex.example', plan: 'Pro', spent: 5300 },
  { id: 3, name: 'Initech', email: 'finance@initech.example', plan: 'Pro', spent: 4100 },
  { id: 4, name: 'Umbrella', email: 'it@umbrella.example', plan: 'Starter', spent: 900 },
  { id: 5, name: 'Hooli', email: 'ap@hooli.example', plan: 'Enterprise', spent: 9800 },
];

export const orders = [
  { id: 1042, customer: 'Acme Corp', amount: 2400, status: 'Paid', date: '2026-10-26' },
  { id: 1041, customer: 'Hooli', amount: 1800, status: 'Paid', date: '2026-10-25' },
  { id: 1040, customer: 'Globex', amount: 650, status: 'Pending', date: '2026-10-24' },
  { id: 1039, customer: 'Initech', amount: 980, status: 'Paid', date: '2026-10-22' },
  { id: 1038, customer: 'Umbrella', amount: 300, status: 'Refunded', date: '2026-10-20' },
  { id: 1037, customer: 'Acme Corp', amount: 3100, status: 'Paid', date: '2026-10-18' },
  { id: 1036, customer: 'Globex', amount: 720, status: 'Pending', date: '2026-10-15' },
];

export const revenueByMonth = [
  { month: 'May', value: 14200 },
  { month: 'Jun', value: 16800 },
  { month: 'Jul', value: 15100 },
  { month: 'Aug', value: 19400 },
  { month: 'Sep', value: 21700 },
  { month: 'Oct', value: 24300 },
];
