import { MyProgressRepository } from '@/domain/progress-tracking/applications/repositories/my-progress-repository'
import { MyProgres } from '@/domain/progress-tracking/enterprise/entities/my-progress'
import { MyProgressWithDetails } from '@/domain/progress-tracking/enterprise/entities/value-objects/my-progress-with-details'
import { InMemoryUsersRepository } from './in-memory-users-repository'
import { InMemoryMyProgressAnswerRepository } from './in-memory-my-progress-answer-repository'

export class InMemoryMyProgressRepository implements MyProgressRepository {
  constructor(
    private usersRepository: InMemoryUsersRepository,
    private myProgressAnswer: InMemoryMyProgressAnswerRepository,
  ) {}

  public items: MyProgres[] = []

  async findById(id: string) {
    const myProgressUpdate = this.items.find(
      (item) => item.id.toString() === id,
    )

    if (!myProgressUpdate) {
      return null
    }

    return myProgressUpdate
  }

  async fetchManyByStudentId(studentId: string) {
    const myProgressUpdates = this.items.filter(
      (item) => item.studentId.toString() === studentId,
    )

    return myProgressUpdates.map((myProgress) => {
      const user = this.usersRepository.items.find(
        (item) => item.id === myProgress.studentId,
      )
      const myProgressReply = this.myProgressAnswer.items.find(
        (item) => item.progressId === myProgress.id,
      )
      const admin = this.usersRepository.items.find(
        (item) => item.id === myProgressReply?.adminId,
      )

      if (!user && !myProgressReply && !admin) {
        throw new Error('Resource not found')
      }

      return MyProgressWithDetails.create({
        myProgressId: myProgress.id,
        studentId: myProgress.studentId,
        photo: myProgress.photo,
        comment: myProgress.comment,
        studentName: user?.name,
        adminId: admin?.id,
        createdAt: myProgress.createdAt,
      })
    })
  }

  async create(myProgress: MyProgres) {
    this.items.push(myProgress)
  }
}
