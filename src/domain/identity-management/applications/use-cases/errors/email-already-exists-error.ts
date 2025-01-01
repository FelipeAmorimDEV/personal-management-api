export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('E-mail address already exists.')
  }
}
