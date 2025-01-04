import { InMemoryTrainingPlansRepository } from "test/repositories/in-memory-training-plans-repository"
import {  FetchTrainingPlanUseCase } from "./fetch-training-plan"
import { makeTrainingPlan } from "test/factories/make-training-plan"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryTrainingPlan: InMemoryTrainingPlansRepository
let sut: FetchTrainingPlanUseCase
describe('Fetch Training Plan', () => {

  beforeEach(() => {
    inMemoryTrainingPlan = new InMemoryTrainingPlansRepository()
    sut = new FetchTrainingPlanUseCase(inMemoryTrainingPlan)
  })

  it("should be able to fetch all student training plan", async () => {
    const trainingPlan = makeTrainingPlan({
      studentId: new UniqueEntityID('student-1')
    })
    inMemoryTrainingPlan.create(trainingPlan)

    const result = await sut.execute({
      studentId: 'student-1'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.trainingPlans).toHaveLength(1)
  })

})