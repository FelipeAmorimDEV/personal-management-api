import { Entity } from '@/core/entities/entities'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MethodPayment } from '../../applications/enums/method-payment'
import { PaymentStatus } from '../../applications/enums/payment-status'
import { Optional } from '@/core/types/optional'

type PaymentProps = {
  studentId: UniqueEntityID
  methodPayment?: MethodPayment | null
  dueDate: Date
  paymentDate?: Date | null
  description: string
  paymentStatus: PaymentStatus
  checkoutUrl?: string | null
  invoiceId?: string | null
  price: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Payment extends Entity<PaymentProps> {
  get studentId() {
    return this.props.studentId
  }

  get methodPayment() {
    return this.props.methodPayment
  }

  get dueDate() {
    return this.props.dueDate
  }

  get paymentDate() {
    return this.props.paymentDate
  }

  set paymentDate(paymentDate: Date | undefined | null) {
    this.props.paymentDate = paymentDate
  }

  get description() {
    return this.props.description
  }

  get paymentStatus() {
    return this.props.paymentStatus
  }

  set paymentStatus(paymentStatus: PaymentStatus) {
    this.props.paymentStatus = paymentStatus
  }

  get price() {
    return this.props.price
  }

  get checkoutUrl() {
    return this.props.checkoutUrl
  }

  get invoiceId() {
    return this.props.invoiceId
  }

  set checkoutUrl(checkoutUrl: string | undefined | null) {
    this.props.checkoutUrl = checkoutUrl
  }

  set invoiceId(invoiceId: string | undefined | null) {
    this.props.invoiceId = invoiceId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<PaymentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const payment = new Payment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return payment
  }
}
