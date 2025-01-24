import { getDatesOfWeek } from './get-dates-of-week'

test('get first day of week', () => {
  const date = '2025-01-19'

  const datesOfWeek = getDatesOfWeek(date)

  console.log(datesOfWeek)

  expect(datesOfWeek).toHaveLength(7)
  expect(datesOfWeek[0].getDate()).toEqual(13)
  expect(datesOfWeek[6].getDate()).toEqual(19)
})
