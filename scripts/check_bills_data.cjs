const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const app = {innerHTML: ''};
const context = vm.createContext({window: {addEventListener() {}}, document: {querySelector: () => app}, history: {pushState() {}}, location: {}, navigator: {}});
for (const file of ['assets/bills-data.js', 'app.js']) vm.runInContext(fs.readFileSync(file, 'utf8'), context);
const data = context.window.billDemoData;
assert(data.transactions.pending.length);
assert.equal(data.bills.find(b => b.id === 'current').title, '本期账单');
for (const bill of data.bills.filter(b => b.id)) {
  const total = bill.tx.filter(t => !t.date && t.type !== '还款').reduce((sum,t) => sum + Number(t.amount.replace(/[^\d.-]/g,'')),0);
  assert.equal(bill.amount, `¥ ${total < 0 ? '-' : ''}${Math.abs(total).toLocaleString('en-US',{minimumFractionDigits:2})}`);
}
assert.equal(vm.runInContext("searchText(' ¥ 1,680.00 ')", context), '1680.00');
assert(vm.runInContext("searchText('支付宝-名创优选').includes(searchText('名创优选'))", context));
context.record = {merchant: '测试商户', amount: '¥ 1,680.00'};
assert(vm.runInContext('searchTxHTML([record])', context).includes('data-text="测试商户1680.00"'));
let count = 0;
for (const records of Object.values(data.transactions)) {
  for (const t of records.filter(t => !t.date)) {
    assert.match(t.time, /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    context.record = t;
    vm.runInContext('renderDetail(record)', context);
    assert(app.innerHTML.includes(`<span>交易时间</span><b>${t.time}</b>`));
    assert(app.innerHTML.includes(`<span>${t.company}</span>`));
    assert(vm.runInContext('searchTxHTML([record])', context).includes(t.time));
    assert(!vm.runInContext('txHTML([record])', context).includes(t.time));
    count++;
  }
}
console.log(`Verified ${count} transactions: detail company/time, search time, date-only bill list.`);
