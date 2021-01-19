---
title: time
subtitle: Date-Time
type: Type
---

## getTimeDistance

Get the time range, return `[ Date, Date]` for the start and end dates, for example: Get this week time:

```ts
getTimeDistance('week')
```

**Parameters**

- `type` Shortcut type, with `-` for last time, if specified `number` type for days
  - `today`, `-today` Today or yesterday
  - `week`, `-week` This week or last week
  - `month`, `-month` This month or last month
  - `year`, `-year` This year or last year
- `time` Specify start time, default is `now`

## toDate

Return the date parsed from string using the given format string, If the argument is a number, it is treated as a timestamp.

* `formatString` If parsing fails try to parse the date by pressing `formatString`
* `defaultValue` If parsing fails returned default value, default: `new Date(NaN)`
