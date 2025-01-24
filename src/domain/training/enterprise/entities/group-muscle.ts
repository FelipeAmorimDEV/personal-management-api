import { Entity } from '../../../../core/entities/entities'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'

export interface GroupMuscleProps {
  name: string
}

export class GroupMuscle extends Entity<GroupMuscleProps> {
  get name() {
    return this.props.name
  }

  static create(props: GroupMuscleProps, id?: UniqueEntityID) {
    const groupMuscle = new GroupMuscle(props, id)

    return groupMuscle
  }
}
