export class CredentialsInvalidError extends Error {
  constructor() {
    super('O e-mail ou o password esta incorreto.')
  }
}
