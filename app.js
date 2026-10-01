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
let expanded=null, selectedPeriods=['current'], selectedCard='', selectedTypes=[], searchResults=[];
let billAccount='cny', accountPickerOpen=false;
const app=document.querySelector('#app');
const icon=(name,cls='')=>`<img class="ui-icon ${cls}" src="assets/${name}.png" alt="" onerror="this.style.visibility='hidden'">`;
function moreMenu(light=false){return `<div class="more-wrap"><button class="more-btn" aria-label="更多" aria-expanded="false" onclick="toggleMore(this,event)">${icon(light?'more0':'more')}<span class="notification-badge">99</span></button><nav class="more-menu" onclick="event.stopPropagation()"><button onclick="pushPage('home',renderHome)"><span class="more-menu-icon">${icon('home')}</span><span>首页</span></button><button><span class="more-menu-icon">${icon('message')}<span class="notification-badge">99</span></span><span>消息</span></button></nav></div>`}
function topbar(title,red=false,backAction='goBack()',backIcon='back'){return `<header class="topbar ${red?'red':''}"><button class="icon-btn back-btn" onclick="${backAction}">${icon(backIcon)}</button><div class="top-title">${title}</div>${moreMenu(red)}</header>`}
function toggleMore(button,event){event.stopPropagation();const open=button.closest('.more-wrap').classList.toggle('open');button.setAttribute('aria-expanded',open)}
if(document.addEventListener)document.addEventListener('click',()=>document.querySelectorAll('.more-wrap.open').forEach(wrap=>{wrap.classList.remove('open');wrap.querySelector('.more-btn').setAttribute('aria-expanded','false')}));
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
function bottom(){return `<footer class="bottom"><button onclick="openInstallment()">分期还款</button><em></em><button onclick="openRepayment()">还款</button></footer>`}
function renderHome(){app.innerHTML=`<div class="page home-page"><header class="home-topbar"><button class="home-back" aria-label="返回">${icon('back')}</button><h1>我的信用卡</h1>${moreMenu(true)}</header><main class="home-main"><section class="home-account"><div class="home-account-title"><img src="assets/logo.png" alt="招商银行"><b>个人消费账户</b><button onclick="openBills()">查账单</button></div><div class="home-card-number"><div class="home-card-mask"><span>****</span><svg viewBox="0 0 24 18" aria-hidden="true"><path d="M3 4c3 7 15 7 18 0M5 8l-2 3m6-1-1 4m7-4 1 4m3-6 2 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></div><div class="home-card-balance">******</div></div><div class="home-credit">可用额度　******　›</div><div class="home-actions"><button onclick="openInstallment()">分期还款</button><button onclick="openRepayment()">还款</button></div></section><section class="home-section"><h2>信用卡借钱服务</h2><div class="home-loan"><b>e招贷</b><span>官方直营｜快出额度｜实时审核</span><p>可借 <strong>¥50,000</strong></p><button>借一笔</button></div><div class="home-cards"><div><b>专享消费额度</b><span>最高30万<br>超100万人申请</span></div><div><b>预借现金</b><span>可借额度<br><strong>¥82,123.59</strong></span></div></div></section><section class="home-section home-featured"><h2>当季热推</h2><div class="home-promo"><img src="assets/seasonal-promo.png" alt="当季热推" onerror="this.style.display='none'"></div></section></main><nav class="home-nav"><button class="active">${icon('card1')}<span>用卡</span></button><button>${icon('card2')}<span>管卡</span></button></nav></div>`}
async function openBills(){
  billAccount='cny';
  expanded=null;
  accountPickerOpen=false;
  pushPage('bills',renderBills);
  const page=document.querySelector('.bills-page');
  showLoading(page);
  await new Promise(resolve=>setTimeout(resolve,400));
  if(!page.isConnected)return;
  renderBills();
  document.querySelector('.bills-page')?.classList.add('content-refresh');
}
function amountClass(t){return t.refund?'refund':/-\d/.test(t.amount)?'negative':''}
function txHTML(tx,source='pending'){return tx.map((t,i)=>t.date?`<div class="date-sep">${t.date}</div>`:`<div class="tx" onclick="showDetail('${source}',${i})"><div><div class="merchant">${t.merchant}</div><small>${t.tail}</small></div><strong class="${amountClass(t)}">${t.amount}</strong></div>`).join('')}
function pendingAvailableCredit(amount){const value=Number(String(amount).replace(/[^\d.-]/g,''));return `剩余可用额度：¥${(50000-value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`}
function toggleAccountPicker(){accountPickerOpen=!accountPickerOpen;renderBills()}
async function selectBillAccount(account){accountPickerOpen=false;renderBills();const page=document.querySelector('.bills-page');showLoading(page);await new Promise(resolve=>setTimeout(resolve,400));if(!page.isConnected)return;billAccount=account;expanded=null;renderBills();document.querySelector('.bills-page')?.classList.add('content-refresh')}
function billAccountName(){return `个人消费(${billAccount==='usd'?'美元':'人民币'})账户`}
function displayedBills(){return billAccount==='usd'?bills.map(b=>b.year?b:{...b,amount:'$ 0.00',meta:b.id==='pending'?'剩余可用额度：$ 7314.72':'',tx:[]}):bills}
function renderBills(host=app){const accountBills=displayedBills();const accountOption=(account,label)=>`<button class="${billAccount===account?'selected':''}" onclick="selectBillAccount('${account}')"><span>${label}</span>${billAccount===account?'<i class="account-check" aria-hidden="true">✓</i>':''}</button>`;const billAmountInfo=n=>`<button class="bill-amount-info" onclick="openBillAmountInfo(${n})">${icon('info','empty-bill-icon')}账单金额说明</button>`;host.innerHTML=`<div class="page bills-page">${topbar('我的账单',true)}<div class="pull-refresh" aria-live="polite">↑释放更新</div><section class="hero"><button class="account-picker" onclick="toggleAccountPicker()" aria-expanded="${accountPickerOpen}">${billAccountName()}${icon('triangle-down',`account-triangle ${accountPickerOpen?'open':''}`)}</button>${accountPickerOpen?`<div class="account-options">${accountOption('cny','个人消费(人民币)账户')}${accountOption('usd','个人消费(美元)账户')}</div>`:''}<p>剩余应还</p><h1>${billAccount==='usd'?'$':'¥'} 0.00</h1><p>最低应还 ${billAccount==='usd'?'$':'¥'} 0.00</p><div class="hero-foot"><span>账单日：9月14日　还款日：10月2日</span><button onclick="openSearch()">${icon('search')}查找交易</button></div></section><main class="bill-list">${accountBills.map((b,n)=>b.year==='2026年'?'':b.year?`<div class="year">${b.year}</div>`:`<section class="bill ${expanded===b.id?'open':''}" data-bill="${n}"><div class="bill-head" onclick="toggleBill(${n})"><div><h2>${b.title}${b.info?`<span class="info-hit" onclick="event.stopPropagation();openPendingInfo()">${icon('info','info-icon')}</span>`:''}</h2>${b.date?`<small>${b.date}</small>`:''}</div><div class="sum"><strong>${b.amount}</strong>${icon('arrow-down','chev')}${b.id==='pending'?`<small>${billAccount==='usd'?b.meta:pendingAvailableCredit(b.amount)}</small>`:b.meta?`<small>${b.meta.replace(/↑\s*/g,icon('up','trend-icon').replace('alt=""','alt="上升"')).replace(/↓\s*/g,icon('down','trend-icon').replace('alt=""','alt="下降"'))}</small>`:''}</div></div>${expanded===b.id?(b.tx?.length?`<div class="tx-list">${billAmountInfo(n)}${txHTML(b.tx,b.id)}</div>`:billAccount==='usd'?`<div class="empty-bill">${billAmountInfo(n)}<p>该月无账单明细哦</p></div>`:billAmountInfo(n)):''}</section>`).join('')}<div class="notice">温馨提醒：<br>1. 招商银行信用卡24小时服务热线：4008205555<br>2. 依据《征信业管理条例》相关规定，我行会如实上报您的个人信用信息至金融信用信息基础数据库，该信息将对您与银行等金融机构发生的借贷业务产生重要影响，为维护良好的信用记录，请您及时还款！</div></main>${bottom()}</div>`;if(host===app)enableBillPullRefresh()}

function enableBillPullRefresh(){
  const page=document.querySelector('.bills-page');
  if(!page?.addEventListener)return;
  let startY=null,refreshing=false;
  const reset=()=>{page.classList.remove('pull-ready');page.style?.removeProperty('--pull-distance');startY=null};
  page.addEventListener('touchstart',e=>{
    if(refreshing)return;
    reset();
    if(e.touches.length===1&&window.scrollY<=0)startY=e.touches[0].clientY;
  },{passive:true});
  page.addEventListener('touchmove',e=>{
    if(refreshing){if(e.cancelable)e.preventDefault();return}
    if(e.touches.length!==1||page.querySelector('.info-modal-mask,.bill-loading-mask')){reset();return}
    const y=e.touches[0].clientY;
    if(window.scrollY>0){reset();return}
    if(startY===null)startY=y;
    const distance=y-startY;
    if(distance>0&&e.cancelable)e.preventDefault();
    page.style.setProperty('--pull-distance',`${Math.min(130,Math.max(0,distance))}px`);
    page.classList.toggle('pull-ready',distance>36);
  },{passive:false});
  page.addEventListener('touchend',()=>{
    if(refreshing)return;
    if(!page.classList.contains('pull-ready')){reset();return}
    refreshing=true;
    const prompt=page.querySelector('.pull-refresh');
    prompt.innerHTML='<span class="pull-spinner" aria-hidden="true"></span>加载中....';
    setTimeout(()=>{
      if(!page.isConnected)return;
      const content=document.createElement('div');
      renderBills(content);
      for(const selector of ['.hero','.bill-list'])page.querySelector(selector).replaceWith(content.querySelector(selector));
      prompt.textContent='↑释放更新';
      refreshing=false;
      reset();
    },300);
  },{passive:true});
  page.addEventListener('touchcancel',()=>{if(!refreshing)reset()},{passive:true});
}

function showNotice(content,onClose='closePendingInfo()'){
  const host=document.querySelector('.page');
  if(!host)return;
  host.insertAdjacentHTML('beforeend',`<div class="info-modal-mask" onclick="closePendingInfo(event)"><section class="info-modal" role="dialog" aria-modal="true" aria-label="温馨提示"><div class="info-modal-body">${content}</div><button class="info-modal-ok" onclick="${onClose}">我知道了</button></section></div>`);
}
function openPendingInfo(){showNotice('<h3>温馨提示</h3><p>1、“预计未出账单”不含预授权、未入账分期提前结清、未入账息费调整、分期待入账、未来可能会发生的息费等交易金额。</p><p>2、如您本期美元欠款尚未还清，且有入账中的人民币还款，您的“预计未出账单”金额将在还款入账后更新。</p><p>3、“预计未出账单”为预估值，账单金额请以实际出账为准。</p>')}
function billAmountDetails(n){const current=bills[n],previous=bills.slice(n+1).find(b=>b.amount),zero=billAccount==='usd'?'$ 0.00':'¥ 0.00',currentAmount=billAccount==='usd'?zero:current?.amount||zero,previousAmount=billAccount==='usd'?zero:previous?.amount||zero;return `<h3>账单金额说明</h3><div class="bill-amount-rows"><div><span>本期消费金额</span><b>${currentAmount}</b></div><div class="bill-amount-history"><div><span>上期账单金额</span><b>+${previousAmount}</b></div><div><span>上期还款</span><b>−${previousAmount}</b></div></div><div><span>本期调整</span><b>−${zero}</b></div><div><span>循环利息</span><b>+${zero}</b></div><div class="bill-amount-total"><span>本期账单金额</span><b>${currentAmount}</b></div></div>`}
function openBillAmountInfo(n){showNotice(billAmountDetails(n))}
function closePendingInfo(e){
  if(e && !e.target.classList.contains('info-modal-mask'))return;
  document.querySelector('.info-modal-mask')?.remove?.();
}
function closeInstallmentNotice(){closePendingInfo();goBack()}

async function toggleBill(n){
  const page=document.querySelector('.bills-page'), b=bills[n];
  if(!page||!b||page.querySelector('.bill-loading-mask'))return;
  if(expanded===b.id){expanded=null;renderBills();return}
  showLoading(page);
  // Local demo data: briefly show the request state before expanding.
  await new Promise(resolve=>setTimeout(resolve,600));
  if(!page.isConnected)return;
  expanded=b.id;
  renderBills();
}
function showLoading(page,label='数据请求中'){page.insertAdjacentHTML('beforeend',`<div class="bill-loading-mask"><div class="bill-loading" role="status" aria-live="polite"><img src="assets/loading.gif" alt="">${label?`<span>${label}</span>`:''}</div></div>`)}
function updateRepaymentButton(input){input.closest('.repayment-card').querySelector('.repay-now').disabled=!(Number(input.value)>0)}
function repaymentCard(){return `<main class="repayment-main"><section class="repayment-card"><div class="repayment-account"><img src="assets/logo.png" alt="招商银行"><b>个人消费账户</b></div><div class="repayment-status"><strong>已还清</strong><span>下期账单日为10月14日</span></div><div class="repayment-line"></div><div class="repayment-label"><b>还款金额</b><button onclick="goBack()">查看账单 ${icon('arrow-right')}</button></div><label class="repayment-input"><b>¥</b><input inputmode="decimal" placeholder="请输入金额" aria-label="还款金额" oninput="updateRepaymentButton(this)"></label><button class="repay-now" disabled>立即还款</button><button class="repay-installment" onclick="openInstallment()">分期还款</button><div class="repayment-help">还款说明 ${icon('info')}</div></section><button class="add-card" onclick="goBack()">⌃<span>添加他人/他行卡</span></button></main>`}
function renderRepayment(){app.innerHTML=`<div class="page repayment-page">${topbar('信用卡还款',false,'goBack()','back0')}${repaymentCard()}</div>`}
function renderRepaymentLoading(){app.innerHTML=`<div class="page repayment-page">${topbar('信用卡还款',false,'goBack()','back0')}</div>`}
async function openRepayment(){
  pushPage('repayment',renderRepaymentLoading);
  const page=document.querySelector('.repayment-page');
  if(!page)return;
  showLoading(page);
  await new Promise(resolve=>setTimeout(resolve,600));
  if(page.isConnected)renderRepayment();
}
function renderInstallment(){app.innerHTML=`<div class="page installment-page">${topbar('分期还款',false,'goBack()','back0')}</div>`}
async function openInstallment(){
  pushPage('installment',renderInstallment);
  const page=document.querySelector('.installment-page');
  if(!page)return;
  showLoading(page);
  await new Promise(resolve=>setTimeout(resolve,600));
  if(!page.isConnected)return;
  page.querySelector('.bill-loading-mask')?.remove();
  showNotice('<h3>温馨提示</h3><p>可办理分期金额不足。</p>','closeInstallmentNotice()');
}
function showDetail(source,i){showDetailObject(transactions[source][i])}
function renderSearchLoading(){app.innerHTML=`<div class="page search-page">${topbar('查找交易',false,'goBack()','back0')}</div>`}
async function openSearch(){
  pushPage('search',renderSearchLoading);
  const page=document.querySelector('.search-page');
  if(!page)return;
  showLoading(page);
  await new Promise(resolve=>setTimeout(resolve,600));
  if(page.isConnected)renderSearch();
}
function filteredTransactions(){return selectedPeriods.flatMap(period=>transactions[period]||[]).filter(t=>!t.date&&(!selectedCard||t.card===selectedCard)&&(!selectedTypes.length||selectedTypes.includes(t.type)))}
function cardOptions(){return [...new Set(Object.values(transactions).flat().filter(t=>t.card).map(t=>t.card))]}
function cardLabel(card){return card.replace(/(\d{4})(?=\d|\*)/g,'$1 ').replace(/(\*{4})(?=\*|\d)/g,'$1 ')}
function renderSearch(){const list=searchResults=filteredTransactions(); app.innerHTML=`<div class="page search-page">${topbar('查找交易',false,'goBack()','back0')}<div class="search-tools"><button class="drop ${selectedPeriods.length?'':''}" onclick="openPeriod()">${periodLabel()}${icon('triangle','tiny-arrow')}</button><button class="drop" onclick="openFilter()">筛选${icon('triangle','tiny-arrow')}</button></div><form class="search-box" onsubmit="event.preventDefault();searchTransactions(this.elements.query.value)"><button type="submit" aria-label="搜索">${icon('search0')}</button><input name="query" type="search" placeholder="输入关键词或交易金额查找" onfocus="clearSearchResults()"></form><main class="search-list" id="searchList">${searchTxHTML(list)}</main><div id="sheet"></div></div>`}
function searchText(value){return String(value).toLowerCase().replace(/[\s,¥￥]/g,'')}
function searchTxHTML(list){return list.map((t,i)=>({t,i})).filter(x=>!x.t.date).map(({t,i})=>`<div class="search-tx" data-text="${searchText(`${t.merchant} ${t.amount}`)}" onclick="showSearchDetail(${i})"><div><div class="merchant">${t.merchant}</div><small>${t.tail}</small></div><div><strong class="${amountClass(t)}">${t.amount}</strong><small>${t.time}</small></div></div>`).join('')}
function showSearchDetail(i){showDetailObject(searchResults[i])}
function clearSearchResults(){const list=document.querySelector('#searchList');if(list){list.style.minHeight=`${list.offsetHeight}px`;list.innerHTML=''}}
async function searchTransactions(query){
  const page=document.querySelector('.search-page');
  if(!page||page.querySelector('.bill-loading-mask'))return;
  clearSearchResults();
  showLoading(page,false);
  await new Promise(resolve=>setTimeout(resolve,400));
  if(!page.isConnected)return;
  const keyword=searchText(query);
  searchResults=filteredTransactions().filter(t=>searchText(`${t.merchant} ${t.amount}`).includes(keyword));
  const list=page.querySelector('#searchList');
  list.innerHTML=searchTxHTML(searchResults);
  list.style.minHeight='';
  page.querySelector('.bill-loading-mask')?.remove();
}
async function showDetailObject(t){
  if(!t||t.date)return;
  pushPage('detail',()=>{app.innerHTML=`<div class="page detail-page">${topbar('交易详情',false,'goBack()','back0')}<div class="detail-loading" role="status" aria-live="polite"><span class="detail-spinner" aria-hidden="true"></span><span>加载中，请稍等</span></div></div>`},t);
  const page=document.querySelector('.detail-page');
  // Local demo data: show the loading background before the detail content.
  await new Promise(resolve=>setTimeout(resolve,600));
  if(!page.isConnected)return;
  renderDetail(t);
}
function renderDetail(t){const cardNo=t.card||'6225********5027';const country=t.country||'中国';const original=t.originalAmount?`<span>原交易金额（币种）</span><b>${t.originalAmount}(${String(t.originalCurrency||'').trim()})</b>`:'';app.innerHTML=`<div class="page detail-page">${topbar('交易详情',false,'goBack()','back0')}<main class="detail-main"><section class="card primary"><div class="merchant-type">${icon('merchant','merchant-icon')}<span>${t.company ?? t.merchant.replace(/^.*?-/, '').replace(/-原绑定卡.*$/,'')}</span></div><div class="big-amount"><span class="amount-sign">${t.refund?'−':'＋'}</span><span class="amount-value">${t.amount.replace('-','')}</span></div><div class="kv"><span>交易卡号</span><b>信用卡 ${cardNo}</b><span>交易时间</span><b>${t.time}</b><span>入账时间</span><b>${t.posted}</b><span>交易渠道</span><b>${t.channel||'无'}</b><span>国家或地区</span><b>${country}</b>${original}<span>银行交易类型</span><b>${t.type}</b></div></section><section class="card edit"><div><span>分类</span><b>${t.refund?'退款':t.category}${icon('arrow-right','inline-arrow')}</b></div><div><span>所属账本</span><b class="muted">请选择${icon('arrow-right','inline-arrow')}</b></div><div><span>不计入本月收支</span><i class="switch"></i></div><div class="note"><span>备注</span><p>记录点什么...</p></div></section></main></div>`}
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
    if(location.hash==='#bills')renderBills();
    else if(location.hash==='#search')renderSearch();
    else if(location.hash==='#detail'&&event.state?.transaction)renderDetail(event.state.transaction);
    else if(location.hash==='#repayment')renderRepayment();
    else if(location.hash==='#installment')renderInstallment();
    else renderHome();
  },back,pageScroll.get(nextIndex)||0);
});location.hash==='#bills'?renderBills():renderHome();if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
