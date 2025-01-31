import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

type MyProgressWithDetailsProps = {
  myProgressId: UniqueEntityID
  studentId: UniqueEntityID
  adminId?: UniqueEntityID
  studentName?: string
  photo: string
  comment: string
  adminName?: string
  adminPhoto?: string | null
  reply?: string
  createdAt: Date
}

export class MyProgressWithDetails extends ValueObject<MyProgressWithDetailsProps> {
  get myProgressId() {
    return this.props.myProgressId
  }

  get studentId() {
    return this.props.studentId
  }

  get adminId() {
    return this.props.adminId
  }

  get studentName() {
    return this.props.studentName
  }

  get photo() {
    return this.props.photo
  }

  get comment() {
    return this.props.comment
  }

  get adminName() {
    return this.props.adminName
  }

  get adminPhoto() {
    return this.props.adminPhoto
  }

  get reply() {
    return this.props.reply
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: MyProgressWithDetailsProps) {
    const studentExerciseWithDetails = new MyProgressWithDetails(props)

    return studentExerciseWithDetails
  }
}
