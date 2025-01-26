import { getFirstDayOfWeek } from './get-first-day-of-week'

export function getDatesOfWeek(baseDate: string) {
  const dates: Date[] = []
  const firstDayOfWeek = getFirstDayOfWeek(baseDate)

  for (let i = 0; i < 7; i++) {
    const date = new Date(firstDayOfWeek)
    date.setDate(firstDayOfWeek.getDate() + i)
    dates.push(date)
  }

  console.log('Dates', dates)

  return dates
}
