---
title: time
subtitle: 日期
type: Type
---

## getTimeDistance

获取时间范围，返回 `[ Date, Date]` 表示开始与结束日期，例如：获取本周时间：

```ts
getTimeDistance('week')
```

**参数**

- `type` 快捷类型，带 `-` 表示过去一个时间，若指定 `number` 表示天数
  - `today`、`-today` 今天或昨天
  - `week`、`-week` 本周或上周
  - `month`、`-month` 本月或上月
  - `year`、`-year` 今年或去年
- `time` 指定开始时间，默认为：`now`

## toDate

转换成 `Date` 格式，支持 `Date, number, string` 类型，如果是 `number` 表示 Unix timestamp。

* `formatString` 如果转换失败尝试根据 `formatString` 格式来转换
* `defaultValue` 无效日期应返回的默认值，默认：`new Date(NaN)`
