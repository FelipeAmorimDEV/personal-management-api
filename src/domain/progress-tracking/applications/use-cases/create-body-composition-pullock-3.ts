import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { BodyComposition } from '../../enterprise/entities/body-composition'
import { Either, right } from '@/core/either'
import { BodyCompositionsRepository } from '../repositories/body-compositions-repository'
import { Injectable } from '@nestjs/common'

interface CreateBodyCompositionPollock3UseCaseRequest {
  studentId: string
  age: number
  height: number
  weight: number
  gender: 'MALE' | 'FEMALE'
  chest: number
  abdominal: number
  thigh: number
  triceps: number
  suprailiac: number
  hip: number
  waist: number
}

interface BodyMeasures {
  chest: number
  abdominal: number
  thigh: number
  triceps: number
  suprailiac: number
  age: number
  gender: 'MALE' | 'FEMALE'
}

type CreateBodyCompositionPollock3UseCaseResponse = Either<
  null,
  { bodyComposition: BodyComposition }
>

@Injectable()
export class CreateBodyCompositionPollock3UseCase {
  constructor(private bodyCompositions: BodyCompositionsRepository) {}
  private calculateBodyDensity(measures: BodyMeasures) {
    const { abdominal, chest, suprailiac, thigh, triceps, age, gender } =
      measures
    const sum =
      gender === 'MALE'
        ? chest + abdominal + thigh
        : suprailiac + triceps + thigh
    if (gender === 'MALE') {
      return (
        1.10938 -
        0.0008267 * sum +
        0.0000016 * Math.pow(sum, 2) -
        0.0002574 * age
      )
    } else {
      return (
        1.0994921 -
        0.0009929 * sum +
        0.0000023 * Math.pow(sum, 2) -
        0.0001392 * age
      )
    }
  }

  private calculateBodyFatPercentage(bodyDensity: number) {
    return (4.95 / bodyDensity - 4.5) * 100
  }

  private calculateBMI(weight: number, height: number) {
    return weight / Math.pow(height / 100, 2)
  }

  private calculateWaistHipRatio(waist: number, hip: number): number {
    return waist / hip
  }

  private calculateLeanMassPercentage(bodyFatPercentage: number): number {
    return 100 - bodyFatPercentage
  }

  private calculateFatMassKg(
    bodyFatPercentage: number,
    weight: number,
  ): number {
    return (bodyFatPercentage * weight) / 100
  }

  private calculateLeanMassKg(fatMassKg: number, weight: number): number {
    return weight - fatMassKg
  }

  async execute({
    studentId,
    age,
    height,
    weight,
    gender,
    chest,
    abdominal,
    thigh,
    triceps,
    suprailiac,
    hip,
    waist,
  }: CreateBodyCompositionPollock3UseCaseRequest): Promise<CreateBodyCompositionPollock3UseCaseResponse> {
    const bodyDensityCalculation = this.calculateBodyDensity({
      abdominal,
      age,
      chest,
      gender,
      suprailiac,
      thigh,
      triceps,
    })
    const bodyFatPercentageCalculation = this.calculateBodyFatPercentage(
      bodyDensityCalculation,
    )
    const bmiCalculation = this.calculateBMI(weight, height)
    const waistHipRatioCalculation = this.calculateWaistHipRatio(waist, hip)
    const leanMassPercentageCalculation = this.calculateLeanMassPercentage(
      bodyFatPercentageCalculation,
    )
    const fatMassKgCalculation = this.calculateFatMassKg(
      bodyFatPercentageCalculation,
      weight,
    )
    const leanMassKgCalculation = this.calculateLeanMassKg(
      fatMassKgCalculation,
      weight,
    )

    const bodyComposition = BodyComposition.create({
      studentId: new UniqueEntityID(studentId),
      methodName: 'Pullock 3 Dobras',
      age,
      height,
      weight,
      gender,
      abdominal,
      suprailiac,
      chest,
      thigh,
      triceps,
      hip,
      waist,
      bmi: bmiCalculation,
      bodyDensity: bodyDensityCalculation,
      bodyFatPercentage: bodyFatPercentageCalculation,
      fatMassKg: fatMassKgCalculation,
      leanMassKg: leanMassKgCalculation,
      leanMassPercentage: leanMassPercentageCalculation,
      waistHipRatio: waistHipRatioCalculation,
    })

    this.bodyCompositions.create(bodyComposition)

    return right({ bodyComposition })
  }
}
