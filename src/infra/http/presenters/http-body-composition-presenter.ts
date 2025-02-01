import { BodyComposition } from '@/domain/progress-tracking/enterprise/entities/body-composition'

export class HttpBodyCompositionPresenter {
  static toHTTP(bodyComposition: BodyComposition) {
    return {
      id: bodyComposition.id.toString(),
      methodName: bodyComposition.methodName,
      createdAt: bodyComposition.createdAt,
    }
  }
}

/* 
  id: bodyComposition.id.toString(),
      studentId: bodyComposition.studentId.toString(),
      age: bodyComposition.age,
      height: bodyComposition.height,
      weight: bodyComposition.weight,
      gender: bodyComposition.gender,
      abdominal: bodyComposition.abdominal,
      bmi: bodyComposition.bmi,
      bodyDensity: bodyComposition.bodyDensity,
      bodyFatPercentage: bodyComposition.bodyFatPercentage,
      chest: bodyComposition.chest,
      fatMassKg: bodyComposition.fatMassKg,
      hip: bodyComposition.hip,
      leanMassKg: bodyComposition.leanMassKg,
      leanMassPercentage: bodyComposition.leanMassPercentage,
      methodName: bodyComposition.methodName,
      suprailiac: bodyComposition.suprailiac,
      thigh: bodyComposition.thigh,
      triceps: bodyComposition.triceps,
      waist: bodyComposition.waist,
      waistHipRatio: bodyComposition.waistHipRatio,
      createdAt: bodyComposition.createdAt,
*/
