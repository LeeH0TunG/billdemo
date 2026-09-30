const transactions=window.billDemoData?.transactions||{pending:[
 {merchant:'支付宝-名创优选科技（广州-原...',tail:'尾号(5027)',amount:'¥ 6.90',type:'消费',time:'2026-09-27 11:02:16',posted:'2026-09-28',channel:'支付宝',category:'购物'},
 {merchant:'支付宝-赵金娇-原绑定卡:6785',tail:'尾号(5027)',amount:'¥ 4.50',type:'消费',time:'2026-09-27 10:51:03',posted:'2026-09-28',channel:'支付宝',category:'购物'},
 {merchant:'支付宝-连宗荣-原绑定卡:6785',tail:'尾号(5027)',amount:'¥ 2.10',type:'消费',time:'2026-09-27 10:45:22',posted:'2026-09-28',channel:'支付宝',category:'购物'},
 {merchant:'程支付-携程保代',tail:'尾号(5027)',amount:'¥ -1,680.00',type:'退款',time:'2026-09-27 10:42:57',posted:'2026-09-28',channel:'',category:'退款',refund:true},
 {merchant:'程支付-携程保代',tail:'尾号(5027)',amount:'¥ 1,680.00',type:'消费',time:'2026-09-26 18:24:11',posted:'2026-09-27',channel:'',category:'旅行'},
 {date:'9月26日'},
 {merchant:'财付通-生活家超市龙口西店',tail:'尾号(5027)',amount:'¥ 5.00',type:'消费',time:'2026-09-26 15:11:09',posted:'2026-09-27',channel:'财付通',category:'购物'},
 {merchant:'财付通-神奇螺蛳粉（江燕路店）',tail:'尾号(5027)',amount:'¥ 34.00',type:'消费',time:'2026-09-26 12:32:44',posted:'2026-09-27',channel:'财付通',category:'餐饮'}],
current:[
 {merchant:'mytrip_1131236435',tail:'尾号(8409)',amount:'¥ 6,239.15',type:'消费',time:'2026-06-02 17:01:29',posted:'2026-06-04',channel:'无',category:'出行',card:'5236********8409',country:'瑞典',originalAmount:'918.44',originalCurrency:'$',foreign:true},
 {merchant:'支付宝-上海米虫网络...',tail:'尾号(5027)',amount:'¥ 9.18',type:'消费',time:'2026-09-13 21:16:49',posted:'2026-09-14',channel:'支付宝',category:'购物'},
 {merchant:'支付宝-拉扎斯网络科...',tail:'尾号(5027)',amount:'¥ 45.70',type:'消费',time:'2026-09-13 20:51:22',posted:'2026-09-14',channel:'支付宝',category:'餐饮'},
 {merchant:'支付宝-广东美宜佳便...',tail:'尾号(5027)',amount:'¥ 10.00',type:'消费',time:'2026-09-13 17:48:05',posted:'2026-09-14',channel:'支付宝',category:'购物'},
 {merchant:'支付宝-经济技术开发...',tail:'尾号(5027)',amount:'¥ 10.50',type:'消费',time:'2026-09-13 15:37:18',posted:'2026-09-14',channel:'支付宝',category:'购物'},
 {merchant:'财付通-广东美宜佳便...',tail:'尾号(5027)',amount:'¥ 11.30',type:'消费',time:'2026-09-12 18:51:53',posted:'2026-09-13',channel:'财付通',category:'购物'},
 {merchant:'支付宝-广州泉盛餐饮...',tail:'尾号(5027)',amount:'¥ 26.56',type:'消费',time:'2026-09-11 17:41:42',posted:'2026-09-12',channel:'支付宝',category:'餐饮'},
 {merchant:'支付宝-拉扎斯网络科...',tail:'尾号(5027)',amount:'¥ 48.70',type:'消费',time:'2026-09-11 10:42:57',posted:'2026-09-12',channel:'支付宝',category:'餐饮'}]};
const bills=window.billDemoData?.bills||[
 {id:'pending',title:'预计未出账单',amount:'¥ -5,623.59',meta:'剩余可用额度： ¥ 141,528.82',info:true,tx:transactions.pending},
 {id:'current',title:'本期账单',amount:'¥ 658.16',date:'8/15-9/14',meta:'比上月 <b class="down">↓ 55%</b>',tx:transactions.current},
 {id:'aug',title:'8月账单',amount:'¥ 1,461.54',date:'7/15-8/14',tx:[]},{id:'jul',title:'7月账单',amount:'¥ -1,633.04',date:'6/15-7/14',tx:[]},{id:'jun',title:'6月账单',amount:'¥ -371.49',date:'5/15-6/14',meta:'比上月 <b class="down">↓ 130%</b>',tx:[]},{id:'may',title:'5月账单',amount:'¥ 1,242.61',date:'4/15-5/14',meta:'比上月 <b class="down">↓ 97%</b>',tx:[]},
 {year:'2025年'},{id:'feb',title:'2月账单',amount:'¥ 11,399.08',date:'1/15-2/14',meta:'比上月 <b class="up">↑ 2133%</b>',tx:[]},{id:'jan',title:'1月账单',amount:'¥ 510.45',date:'12/15-1/14',meta:'比上月 <b class="down">↓ 94%</b>',tx:[]},{id:'dec',title:'12月账单',amount:'¥ 8,361.34',date:'11/15-12/14',meta:'比上月 <b class="down">↓ 46%</b>',tx:[]},{id:'nov',title:'11月账单',amount:'¥ 15,523.21',date:'10/15-11/14',meta:'比上月 <b class="up">↑ 15170%</b>',tx:[]},{id:'oct',title:'10月账单',amount:'¥ 101.66',date:'9/15-10/14',tx:[]}];
let expanded='current', selectedPeriods=['current'], selectedCard='', selectedTypes=[], searchResults=[];
const app=document.querySelector('#app');
const icon=(name,cls='')=>`<img class="ui-icon ${cls}" src="assets/${name}.png" alt="" onerror="this.style.visibility='hidden'">`;
function topbar(title,red=false,backAction='goBack()',backIcon='back'){return `<header class="topbar ${red?'red':''}"><button class="icon-btn back-btn" onclick="${backAction}">${icon(backIcon)}</button><div class="top-title">${title}</div><button class="more-btn" aria-label="更多">${icon(title==='我的账单'?'more0':'more')}</button></header>`}
history.scrollRestoration='manual';
let navigationIndex=0;
const pageScroll=new Map();
let finishNavigation=()=>{};
function transitionPage(render,back=false,scrollTop=0){
  const oldPage=app.firstElementChild;
  const oldScroll=window.scrollY;
  const currentTransform=getComputedStyle(app).transform;
  finishNavigation();
  const layer=document.createElement('div');
  layer.className='navigation-layer';
  layer.inert=true;
  layer.setAttribute('aria-hidden','true');
  if(oldPage)layer.append(oldPage.cloneNode(true));
  render();
  window.scrollTo(0,scrollTop);
  if(!oldPage||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  document.body.append(layer);
  layer.scrollTop=oldScroll;
  layer.style.zIndex=back?'3':'1';
  const target=back?layer:app;
  const animation=target.animate([
    {transform:back?currentTransform:'translateX(100%)'},
    {transform:back?'translateX(100%)':'translateX(0)'}
  ],{duration:200,easing:'cubic-bezier(.4,0,.2,1)'});
  const cleanup=()=>{animation.cancel();layer.remove()};
  finishNavigation=cleanup;
  animation.onfinish=cleanup;
}
function pushPage(view,render,transaction){
  pageScroll.set(navigationIndex,window.scrollY);
  history.pushState({view,index:++navigationIndex,transaction},'', '#'+view);
  transitionPage(render);
}
function goBack(){if(location.hash) history.back()}
function bottom(){return `<footer class="bottom"><button>分期还款</button><em></em><button>还款</button></footer>`}
function txHTML(tx,source='pending'){return tx.map((t,i)=>t.date?`<div class="date-sep">${t.date}</div>`:`<div class="tx" onclick="showDetail('${source}',${i})"><div><div class="merchant">${t.merchant}</div><small>${t.tail}</small></div><strong class="${t.refund?'refund':''}">${t.amount}</strong></div>`).join('')}
function pendingAvailableCredit(amount){const value=Number(String(amount).replace(/[^\d.-]/g,''));return `剩余可用额度：¥${(50000-value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`}
function renderBills(){app.innerHTML=`<div class="page bills-page">${topbar('我的账单',true)}<section class="hero"><div>个人消费(人民币)账户</div><p>剩余应还</p><h1>¥ 0.00</h1><p>最低应还 ¥ 0.00</p><div class="hero-foot"><span>账单日：9月14日　还款日：10月2日</span><button onclick="openSearch()">${icon('search')}查找交易</button></div></section><main class="bill-list">${bills.map((b,n)=>b.year==='2026年'?'':b.year?`<div class="year">${b.year}</div>`:`<section class="bill ${expanded===b.id?'open':''}" data-bill="${n}"><div class="bill-head" onclick="toggleBill(${n})"><div><h2>${b.title}${b.info?`<span class="info-hit" onclick="event.stopPropagation();openPendingInfo()">${icon('info','info-icon')}</span>`:''}</h2>${b.date?`<small>${b.date}</small>`:''}</div><div class="sum"><strong>${b.amount}</strong>${icon('arrow-down','chev')}${b.id==='pending'?`<small>${pendingAvailableCredit(b.amount)}</small>`:b.meta?`<small>${b.meta.replace(/↑\s*/g,icon('up','trend-icon').replace('alt=""','alt="上升"')).replace(/↓\s*/g,icon('down','trend-icon').replace('alt=""','alt="下降"'))}</small>`:''}</div></div>${expanded===b.id&&b.tx?.length?`<div class="tx-list">${txHTML(b.tx,b.id)}</div>`:''}</section>`).join('')}<div class="notice">温馨提醒：<br>1. 招商银行信用卡24小时服务热线：4008205555<br>2. 依据《征信业管理条例》相关规定，我行会如实上报您的个人信用信息至金融信用信息基础数据库，该信息将对您与银行等金融机构发生的借贷业务产生重要影响，为维护良好的信用记录，请您及时还款！</div></main>${bottom()}</div>`}

function openPendingInfo(){
  const host=document.querySelector('.page');
  if(!host)return;
  host.insertAdjacentHTML('beforeend',`<div class="info-modal-mask" onclick="closePendingInfo(event)"><section class="info-modal" role="dialog" aria-modal="true" aria-label="温馨提示"><div class="info-modal-body"><h3>温馨提示</h3><p>1、“预计未出账单”不含预授权、未入账分期提前结清、未入账息费调整、分期待入账、未来可能会发生的息费等交易金额。</p><p>2、如您本期美元欠款尚未还清，且有入账中的人民币还款，您的“预计未出账单”金额将在还款入账后更新。</p><p>3、“预计未出账单”为预估值，账单金额请以实际出账为准。</p></div><button class="info-modal-ok" onclick="closePendingInfo()">我知道了</button></section></div>`);
}
function closePendingInfo(e){
  if(e && !e.target.classList.contains('info-modal-mask'))return;
  document.querySelector('.info-modal-mask')?.remove();
}

async function toggleBill(n){
  const page=document.querySelector('.bills-page'), b=bills[n];
  if(!page||!b||page.querySelector('.bill-loading-mask'))return;
  if(expanded===b.id){expanded=null;renderBills();return}
  page.insertAdjacentHTML('beforeend','<div class="bill-loading-mask"><div class="bill-loading" role="status" aria-live="polite"><img src="assets/loading.gif" alt=""><span>数据请求中</span></div></div>');
  // Local demo data: briefly show the request state before expanding.
  await new Promise(resolve=>setTimeout(resolve,600));
  if(!page.isConnected)return;
  expanded=b.id;
  renderBills();
}
function showDetail(source,i){showDetailObject(transactions[source][i])}
function openSearch(){pushPage('search',renderSearch)}
function filteredTransactions(){return selectedPeriods.flatMap(period=>transactions[period]||[]).filter(t=>!t.date&&(!selectedCard||t.card===selectedCard)&&(!selectedTypes.length||selectedTypes.includes(t.type)))}
function cardOptions(){return [...new Set(Object.values(transactions).flat().filter(t=>t.card).map(t=>t.card))]}
function cardLabel(card){return card.replace(/(\d{4})(?=\d|\*)/g,'$1 ').replace(/(\*{4})(?=\*|\d)/g,'$1 ')}
function renderSearch(){const list=searchResults=filteredTransactions(); app.innerHTML=`<div class="page search-page">${topbar('查找交易',false,'goBack()','back0')}<div class="search-tools"><button class="drop ${selectedPeriods.length?'':''}" onclick="openPeriod()">${periodLabel()}${icon('triangle','tiny-arrow')}</button><button class="drop" onclick="openFilter()">筛选${icon('triangle','tiny-arrow')}</button></div><div class="search-box">${icon('search0')}<input placeholder="输入关键词或交易金额查找" oninput="filterList(this.value)"></div><main class="search-list" id="searchList">${searchTxHTML(list)}</main><div id="sheet"></div></div>`}
function searchText(value){return String(value).toLowerCase().replace(/[\s,¥￥]/g,'')}
function searchTxHTML(list){return list.map((t,i)=>({t,i})).filter(x=>!x.t.date).map(({t,i})=>`<div class="search-tx" data-text="${searchText(`${t.merchant} ${t.amount}`)}" onclick="showSearchDetail(${i})"><div><div class="merchant">${t.merchant}</div><small>${t.tail}</small></div><div><strong class="${t.refund?'refund':''}">${t.amount}</strong><small>${t.time}</small></div></div>`).join('')}
function showSearchDetail(i){showDetailObject(searchResults[i])}
async function showDetailObject(t){
  if(!t||t.date)return;
  pushPage('detail',()=>{app.innerHTML=`<div class="page detail-page">${topbar('交易详情',false,'goBack()','back0')}<div class="detail-loading" role="status" aria-live="polite"><span class="detail-spinner" aria-hidden="true"></span><span>加载中，请稍等</span></div></div>`},t);
  const page=document.querySelector('.detail-page');
  // Local demo data: show the loading background before the detail content.
  await new Promise(resolve=>setTimeout(resolve,600));
  if(!page.isConnected)return;
  renderDetail(t);
}
function renderDetail(t){const cardNo=t.card||'6225********5027';const country=t.country||'中国';const original=t.originalAmount?`<span>原交易金额（币种）</span><b>${t.originalAmount}(${t.originalCurrency||''})</b>`:'';app.innerHTML=`<div class="page detail-page">${topbar('交易详情',false,'goBack()','back0')}<main class="detail-main"><section class="card primary"><div class="merchant-type">${icon('merchant','merchant-icon')}<span>${t.company ?? t.merchant.replace(/^.*?-/, '').replace(/-原绑定卡.*$/,'')}</span></div><div class="big-amount"><span class="amount-sign">${t.refund?'−':'＋'}</span><span class="amount-value">${t.amount.replace('-','')}</span></div><div class="kv"><span>交易卡号</span><b>信用卡 ${cardNo}</b><span>交易时间</span><b>${t.time}</b><span>入账时间</span><b>${t.posted}</b><span>交易渠道</span><b>${t.channel||'无'}</b><span>国家或地区</span><b>${country}</b>${original}<span>银行交易类型</span><b>${t.type}</b></div></section><section class="card edit"><div><span>分类</span><b>${t.refund?'退款':t.category}${icon('arrow-right','inline-arrow')}</b></div><div><span>所属账本</span><b class="muted">请选择${icon('arrow-right','inline-arrow')}</b></div><div><span>不计入本月收支</span><i class="switch"></i></div><div class="note"><span>备注</span><p>记录点什么...</p></div></section></main></div>`}
function filterList(q){q=searchText(q);document.querySelectorAll('.search-tx').forEach(el=>el.style.display=el.dataset.text.includes(q)?'flex':'none')}
function periodLabel(){if(selectedPeriods.length>1)return `已选${selectedPeriods.length}期`;const period=selectedPeriods[0];return period==='pending'?'未出账单':period==='current'?'本期账单':period.endsWith('月')?period+'账单':period}
function openPeriod(){const options=[['pending','未出','09/15-今'],['current','本期','08/15-09/14'],['8月','8月','07/15-08/15'],['7月','7月','06/15-07/14'],['6月','6月','05/15-06/14'],['5月','5月','04/15-05/14'],['4月','4月','03/15-04/14'],['3月','3月','02/15-03/14'],['2月','2月','01/15-02/14'],['1月','1月','12/15-01/14']];const button=x=>`<button class="period-opt ${selectedPeriods.includes(x[0])?'selected':''}" onclick="selectPeriod('${x[0]}')"><b>${x[1]}</b><span>${x[2]}</span></button>`;document.querySelector('#sheet').innerHTML=`<div class="mask" onclick="closeSheet(event)"><section class="sheet period-sheet"><div class="sheet-top"><button class="drop active" onclick="closeSheet()">${periodLabel()}${icon('triangle-up','tiny-arrow')}</button><button class="drop" onclick="event.stopPropagation();openFilter()">筛选${icon('triangle','tiny-arrow')}</button></div><h3>2026年账单</h3><div class="period-grid">${options.map(button).join('')}</div><h3>2025年账单</h3><div class="period-grid">${[['12月','12月','11/15-12/14'],['11月','11月','10/15-11/14'],['10月','10月','09/15-10/14']].map(button).join('')}</div>${selectedPeriods.length===3?'<div class="period-limit">最多可选择3期账单</div>':''}<div class="sheet-actions"><button onclick="resetPeriod()">重置</button><button class="confirm" onclick="applySheet()">确认</button></div></section></div>`}
function openFilter(){document.querySelector('#sheet').innerHTML=`<div class="mask" onclick="closeSheet(event)"><section class="sheet filter-sheet"><div class="sheet-top"><button class="drop" onclick="event.stopPropagation();openPeriod()">${periodLabel()}${icon('triangle','tiny-arrow')}</button><button class="drop active" onclick="closeSheet()">筛选${icon('triangle-up','tiny-arrow')}</button></div><h3>选择卡片</h3><div class="card-options"><button class="${selectedCard?'':'selected'}" onclick="selectCard(this,'')">全部卡片</button>${cardOptions().map(x=>`<button class="${selectedCard===x?'selected':''}" onclick="selectCard(this,'${x}')">${cardLabel(x)}</button>`).join('')}</div><h3>选择类型</h3><div class="type-options">${['消费','还款','退款','分期','其他'].map(x=>`<button class="${selectedTypes.includes(x)?'selected':''}" onclick="toggleType(this,'${x}')">${x}</button>`).join('')}</div><div class="sheet-actions"><button onclick="resetFilter()">重置</button><button class="confirm" onclick="applySheet()">确认</button></div></section></div>`}
function selectPeriod(v){selectedPeriods=selectedPeriods.includes(v)?selectedPeriods.filter(period=>period!==v):selectedPeriods.length<3?[...selectedPeriods,v]:selectedPeriods;openPeriod()}
function resetPeriod(){selectedPeriods=['current'];openPeriod()} function selectCard(el,v){selectedCard=v;el.parentNode.querySelectorAll('button').forEach(x=>x.classList.remove('selected'));el.classList.add('selected')} function toggleType(el,v){el.classList.toggle('selected');selectedTypes=el.classList.contains('selected')?[...new Set([...selectedTypes,v])]:selectedTypes.filter(x=>x!==v)} function resetFilter(){selectedCard='';selectedTypes=[];openFilter()} function applySheet(){renderSearch()} function closeSheet(e){if(!e||e.target.classList.contains('mask'))document.querySelector('#sheet').innerHTML=''}
window.addEventListener('popstate',event=>{
  pageScroll.set(navigationIndex,window.scrollY);
  const nextIndex=event.state?.index||0;
  const back=nextIndex<navigationIndex;
  navigationIndex=nextIndex;
  transitionPage(()=>{
    if(location.hash==='#search')renderSearch();
    else if(location.hash==='#detail'&&event.state?.transaction)renderDetail(event.state.transaction);
    else renderBills();
  },back,pageScroll.get(nextIndex)||0);
});renderBills();if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
