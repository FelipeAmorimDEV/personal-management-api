import { getDatesOfWeek } from './get-dates-of-week'

test('get first day of week', () => {
  const date = '2025-01-19T03:00:00'

  const datesOfWeek = getDatesOfWeek(date)

  expect(datesOfWeek).toHaveLength(7)
  expect(datesOfWeek[0].getDate()).toEqual(19)
  expect(datesOfWeek[6].getDate()).toEqual(25)
})
