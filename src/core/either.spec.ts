import { Either, left, right } from './either'

function doSomething(x: boolean): Either<string, string> {
  if (x) {
    return right('success')
  } else {
    return left('error')
  }
}

test('success result', () => {
  const result = doSomething(true)

  expect(result.isLeft()).toBe(false)
  expect(result.isRight()).toBe(true)
})

test('error result', () => {
  const result = doSomething(false)

  expect(result.isLeft()).toBe(true)
  expect(result.isRight()).toBe(false)
})
