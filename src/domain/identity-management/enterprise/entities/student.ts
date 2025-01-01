import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import { User, UserProps } from './user'

export interface StudentProps extends UserProps {}

export class Student extends User<StudentProps> {
  static create(
    props: Optional<StudentProps, 'createdAt' | 'role'>,
    id?: UniqueEntityID,
  ) {
    const student = new Student(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        role: 'STUDENT',
      },
      id,
    )

    return student
  }
}
