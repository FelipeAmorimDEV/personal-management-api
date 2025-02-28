import { PaymentsRepository } from '@/domain/payments/applications/repositories/payments-repository'
import { Payment } from '@/domain/payments/enterprise/entities/payment'
import { PrismaPaymentMapper } from '../mappers/prisma-payment-mapper'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaPaymentRepository implements PaymentsRepository {
  constructor(private prisma: PrismaService) {}
  async findByInvoiceId(invoiceId: string): Promise<Payment | null> {
    const payment = await this.prisma.invoice.findFirst({
      where: {
        invoiceId,
      },
    })

    if (!payment) {
      return null
    }

    return PrismaPaymentMapper.toDomain(payment)
  }

  async findPaymentDue(): Promise<Payment | null> {
    const today = new Date()
    const sevenDaysFromNow = new Date()
    sevenDaysFromNow.setDate(today.getDate() + 7)

    const payment = await this.prisma.invoice.findFirst({
      where: {
        dueDate: {
          gte: today,
          lte: sevenDaysFromNow,
        },
      },
    })

    if (!payment) {
      return null
    }

    return PrismaPaymentMapper.toDomain(payment)
  }

  async create(payment: Payment): Promise<void> {
    const data = PrismaPaymentMapper.toPrisma(payment)
    await this.prisma.invoice.create({
      data,
    })
  }

  async findById(id: string): Promise<Payment | null> {
    const payment = await this.prisma.invoice.findUnique({
      where: {
        id,
      },
    })

    if (!payment) {
      return null
    }

    return PrismaPaymentMapper.toDomain(payment)
  }

  async findManyByStudentId(studentId: string): Promise<Payment[]> {
    const payments = await this.prisma.invoice.findMany({
      where: {
        studentId,
      },
    })

    return payments.map(PrismaPaymentMapper.toDomain)
  }

  async save(payment: Payment): Promise<void> {
    const data = PrismaPaymentMapper.toPrisma(payment)
    await this.prisma.invoice.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
