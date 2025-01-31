import { ReplyTrainingFeedbacksRepository } from '@/domain/progress-tracking/applications/repositories/reply-training-feedbacks-repository'
import { TrainingFeedbackReply } from '@/domain/progress-tracking/enterprise/entities/training-feedback-reply'
import { PrismaService } from '../prisma.service'
import { PrismaReplyTrainingFeedbackMapper } from '../mappers/prisma-reply-training-feedback-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaReplyTrainingFeedbacksRepository
  implements ReplyTrainingFeedbacksRepository
{
  constructor(private prisma: PrismaService) {}

  async findByFeedbackId(
    feedbackId: string,
  ): Promise<TrainingFeedbackReply | null> {
    const trainingFeedbackReply =
      await this.prisma.trainingFeedbackReply.findFirst({
        where: {
          trainingFeedbackId: feedbackId,
        },
      })

    if (!trainingFeedbackReply) {
      return null
    }

    return PrismaReplyTrainingFeedbackMapper.toDomain(trainingFeedbackReply)
  }

  async findById(id: string) {
    const trainingFeedbackReply =
      await this.prisma.trainingFeedbackReply.findUnique({
        where: {
          id,
        },
      })

    if (!trainingFeedbackReply) {
      return null
    }

    return PrismaReplyTrainingFeedbackMapper.toDomain(trainingFeedbackReply)
  }

  async create(trainingFeedbackReply: TrainingFeedbackReply) {
    const data = PrismaReplyTrainingFeedbackMapper.toPrisma(
      trainingFeedbackReply,
    )
    await this.prisma.trainingFeedbackReply.create({
      data,
    })
  }

  async save(trainingFeedbackReply: TrainingFeedbackReply) {
    const data = PrismaReplyTrainingFeedbackMapper.toPrisma(
      trainingFeedbackReply,
    )
    await this.prisma.trainingFeedbackReply.update({
      data,
      where: {
        id: data.id,
      },
    })
  }
}
