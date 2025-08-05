import {
  CalendarDate,
  getDayOfWeek,
  getLocalTimeZone,
  parseDate,
} from '@internationalized/date'

export function startOfWeek(date: CalendarDate) {
  const weekday = getDayOfWeek(date, 'fr') // 1 = lundi, 7 = dimanche
  return date.subtract({ days: weekday }) // ramène à lundi
}

export function endOfWeek(date: CalendarDate) {
  const weekday = getDayOfWeek(date, 'fr')
  return date.add({ days: 7 - weekday }) // va jusqu’à dimanche
}

export function eachDay(start: CalendarDate, end: CalendarDate) {
  const days: CalendarDate[] = []
  let current = start
  while (current.compare(end) < 0) {
    days.push(current)
    current = current.add({ days: 1 })
  }
  return days
}

export function today(): CalendarDate {
  const now = new Date()
  return new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate())
}

export function addMonths(date: CalendarDate, count: number) {
  return date.add({ months: count })
}

export function subtractMonths(date: CalendarDate, count: number) {
  return date.subtract({ months: count })
}

export function addDays(date: CalendarDate, count: number) {
  return date.add({ days: count })
}

export function subtractDays(date: CalendarDate, count: number) {
  return date.subtract({ days: count })
}

export function isSameMonth(dateA: CalendarDate, dateB: CalendarDate) {
  return dateA.year === dateB.year && dateA.month === dateB.month
}

export function isBeforeToday(date: CalendarDate) {
  return date.compare(today()) >= 0
}

export function isSameDay(dateA: CalendarDate, dateB: CalendarDate) {
  return dateA.compare(dateB) === 0
}

export function formatToDDMMYYYY(date: string): string {
  const dateParse = parseDate(date.split('T')[0])
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(dateParse.toDate(getLocalTimeZone()))
}
