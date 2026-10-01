const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const handlers={},options={};
let ready=false,blocked=false,prevented=false,timer,delay,timers=0,pullHeight=0;
const prompt={innerHTML:'',textContent:''},replaced=[];
const page={
  isConnected:true,
  style:{setProperty(_,value){pullHeight=parseFloat(value)},removeProperty(){pullHeight=0}},
  classList:{contains(){return ready},remove(){ready=false},toggle(_,value){ready=value}},
  querySelector(selector){
    if(selector==='.pull-refresh')return prompt;
    if(selector==='.hero'||selector==='.bill-list')return {replaceWith(){replaced.push(selector)}};
    return blocked?{}:null;
  },
  addEventListener(name,handler,opts){handlers[name]=handler;options[name]=opts}
};
const window={scrollY:0};
const source=fs.readFileSync('app.js','utf8');
vm.runInNewContext(source.slice(source.indexOf('function enableBillPullRefresh(){'),source.indexOf('\nfunction showNotice('))+'\nenableBillPullRefresh();',{window,document:{querySelector:()=>page,createElement:()=>({querySelector:()=>({})})},renderBills(){},setTimeout(fn,ms){timer=fn;delay=ms;timers++}});
function touch(name,y){prevented=false;handlers[name]({touches:[{clientY:y}],cancelable:true,preventDefault(){prevented=true}})}
touch('touchstart',200);touch('touchmove',250);
assert(ready,'Downward pull at page top must reveal the prompt');
assert(prevented,'Custom pull must suppress native overscroll');
assert.equal(options.touchmove.passive,false);
touch('touchmove',210);assert(!ready,'Reversing below threshold disarms refresh');assert.equal(pullHeight,10);
touch('touchmove',230);assert.equal(pullHeight,30);
touch('touchmove',500);assert.equal(pullHeight,130);touch('touchend',500);
assert(ready);assert.match(prompt.innerHTML,/pull-spinner/);assert.match(prompt.innerHTML,/加载中\.\.\.\./);assert.equal(delay,300);
assert.deepEqual(replaced,[]);
touch('touchstart',200);touch('touchend',260);assert.equal(timers,1);
timer();assert(!ready);assert.equal(prompt.textContent,'↑释放更新');
assert.deepEqual(replaced,['.hero','.bill-list']);
window.scrollY=300;touch('touchstart',200);touch('touchmove',300);
assert(!ready,'Ordinary list scrolling must not reveal prompt');
window.scrollY=0;touch('touchmove',400);assert(!ready);
touch('touchmove',450);assert(ready,'Continuing the same gesture after reaching top must work');
touch('touchcancel',450);assert(!ready);
blocked=true;touch('touchstart',200);touch('touchmove',260);assert(!ready);
blocked=false;touch('touchstart',200);touch('touchmove',350);touch('touchend',350);
page.isConnected=false;timer();assert.equal(replaced.length,2);
console.log('Verified 1:1 pull capped at 130px, loading text, 0.3s loading, content-only refresh and cancellation guards.');
