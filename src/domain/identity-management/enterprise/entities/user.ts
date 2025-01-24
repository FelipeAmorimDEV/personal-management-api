import { Entity } from '../../../../core/entities/entities'

export interface UserProps {
  name: string
  email: string
  password: string
  role: 'ADMIN' | 'STUDENT'
  createdAt: Date
  updatedAt?: Date
}
export abstract class User<Props extends UserProps> extends Entity<Props> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get role() {
    return this.props.role
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set name(newName: string) {
    this.props.name = newName
    this.touch()
  }

  touch() {
    this.props.updatedAt = new Date()
  }
}
