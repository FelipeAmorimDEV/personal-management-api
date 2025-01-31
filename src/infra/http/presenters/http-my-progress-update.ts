import { MyProgres } from '@/domain/progress-tracking/enterprise/entities/my-progress'

export class HttpMyProgressUpdate {
  static toHTTP(myProgress: MyProgres) {
    return {
      id: myProgress.id.toString(),
      studentId: myProgress.studentId.toString(),
      comment: myProgress.comment,
      photo: myProgress.photo,
      createdAt: myProgress.createdAt,
    }
  }
}
