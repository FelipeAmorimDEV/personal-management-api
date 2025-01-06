export class FeedbackAlreadyRepliedError extends Error {
  constructor() {
    super('Feedback already replied.')
  }
}
