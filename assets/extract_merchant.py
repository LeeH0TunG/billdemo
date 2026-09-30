# -*- coding: utf-8 -*-
"""从 F 列「交易摘要」抽取公司/商户名，写入 M 列「公司名」"""
import re, openpyxl
from copy import copy

PATH = '/Users/niko/bill-demo-v9/assets/demo_bills.xlsx'

# 渠道 / 活动前缀，长的排前面
PREFIX = [
    '手机支付返现-', '银联Pay境内返现调回-', '银联Pay境内返现-', '银联Pay境外返现-',
    '银联1%汇率补贴-', '非常境外游汇率补贴-', '银联高端卡境外消费1%返现',
    '消费分期-', '掌上生活优惠商户-', '拼多多支付-', '美团支付-', '美团App',
    '云闪付扫码-', '云闪付-', '京东支付-', '支付宝-', '财付通-', '银联-', '（特约）',
]
# 剥完之后仍不是公司名的残留
NOT_MERCHANT = {
    '', '特约商户', '财付通', '增值服务使用费-用卡安全保障',
    '预借现金手续费（已优惠30.00元)', '自由人生白金卡消费达标免年费800元',
    'VisaApplePay1pctCashback', 'VisaApplePay1stCashback',
}


def extract(s):
    if not s:
        return None
    s = str(s).strip()
    s = re.sub(r'\s*本金\s*第\d+/\d+期.*$', '', s)          # 分期期数
    s = re.sub(r'-原绑定卡:?\d*.*$', '', s)                  # -原绑定卡:6785
    s = re.sub(r'\s*汇率\s*[\d.]+.*$', '', s)                # 汇率 6.7993 及其后
    s = re.sub(r'\s*-\s*Apple\s*Pay\w*:?\s*\d*.*$', '', s, flags=re.I)
    s = re.sub(r'\s*-\s*Apple\s*P\w*$', '', s, flags=re.I)   # 被截断的 -Apple P
    s = re.sub(r'\s*-\s*App\w*$', '', s, flags=re.I)
    while True:                                              # 逐层剥渠道前缀
        for p in PREFIX:
            if s.startswith(p):
                s = s[len(p):].strip()
                break
        else:
            break
    s = s.strip(' -—')
    if s in NOT_MERCHANT:
        return None
    return s or None


wb = openpyxl.load_workbook(PATH)
ws = wb['账单明细']
head = ws.cell(1, 13)
head.value = '公司名'
src = ws.cell(1, 12)                                         # 沿用 L1 表头样式
head.font, head.fill, head.alignment, head.border = copy(src.font), copy(src.fill), copy(src.alignment), copy(src.border)
ws.column_dimensions['M'].width = 30

n = ok = 0
samples = []
for i in range(2, ws.max_row + 1):
    desc = ws.cell(i, 6).value
    if desc is None:
        continue
    n += 1
    v = extract(desc)
    ws.cell(i, 13).value = v
    if v:
        ok += 1
    samples.append((i, desc, v))

wb.save(PATH)
print(f'共 {n} 行，写出 {ok} 个公司名，留空 {n - ok} 行')
bad = [s for s in samples if s[2] and re.search(r'汇率|Apple ?Pay|原绑定卡|本金 第', str(s[2]))]
print('残留噪音', len(bad))
for s in samples[:8] + samples[100:106]:
    print(s)
