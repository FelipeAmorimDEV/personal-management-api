import { getFirstDayOfWeek } from './get-first-day-of-week'

test('get first day of week', () => {
  const date = '2025-01-19'

  const firstDayOfWeek = getFirstDayOfWeek(date)

  expect(firstDayOfWeek.getDay()).toBe(1)
  expect(firstDayOfWeek.getDate()).toBe(13)
})
