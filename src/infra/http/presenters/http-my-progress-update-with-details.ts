import { MyProgressWithDetails } from '@/domain/progress-tracking/enterprise/entities/value-objects/my-progress-with-details'

export class HttpMyProgressUpdateWithDetails {
  static toHTTP(myProgress: MyProgressWithDetails) {
    return {
      id: myProgress.myProgressId.toString(),
      comment: myProgress.comment,
      photo: myProgress.photo,
      adminName: myProgress.adminName,
      adminPhoto: myProgress.adminPhoto,
      reply: myProgress.reply,
      createdAt: myProgress.createdAt,
    }
  }
}
