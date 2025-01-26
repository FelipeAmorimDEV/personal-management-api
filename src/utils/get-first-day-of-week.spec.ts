import { getFirstDayOfWeek } from './get-first-day-of-week'

test('get first day of week', () => {
  const date = '2025-01-20'

  const firstDayOfWeek = getFirstDayOfWeek(date)

  expect(firstDayOfWeek.getDay()).toBe(0)
  expect(firstDayOfWeek.getDate()).toBe(19)
})
