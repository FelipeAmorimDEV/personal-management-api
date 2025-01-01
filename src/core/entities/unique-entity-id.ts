import { randomUUID } from 'crypto'

export class UniqueEntityID {
  private value: string

  toString() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  equals(id: UniqueEntityID) {
    return id.toString() === this.value
  }
}
