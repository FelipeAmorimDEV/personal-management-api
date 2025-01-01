import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import { User, UserProps } from './user'

export interface AdminProps extends UserProps {}

export class Admin extends User<AdminProps> {
  static create(
    props: Optional<AdminProps, 'createdAt' | 'role'>,
    id?: UniqueEntityID,
  ) {
    const admin = new Admin(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        role: 'ADMIN',
      },
      id,
    )

    return admin
  }
}
