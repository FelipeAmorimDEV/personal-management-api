import { CreateAnamnesisUseCase } from './create-anamnesis'
import { InMemoryAnamnesisRepository } from 'test/repositories/in-memory-anamnesis-repository'

let sut: CreateAnamnesisUseCase
let inMemoryAnamnesisRepository: InMemoryAnamnesisRepository
describe('Create Anamnesis PARQ', () => {
  beforeEach(() => {
    inMemoryAnamnesisRepository = new InMemoryAnamnesisRepository()
    sut = new CreateAnamnesisUseCase(inMemoryAnamnesisRepository)
  })

  it('should be able to create a anamnesis parq', async () => {
    const result = await sut.execute({
      studentId: 'student-1',
      fullName: 'John Doe',
      age: 29,
      hadChestPainInLastMonth: false,
      hasBalanceProblems: true,
      hasBoneOrJointProblem: false,
      hasChestPainDuringActivity: true,
      hasHeartProblem: false,
      hasOtherHealthIssues: false,
      takesBloodPressureMedication: true,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryAnamnesisRepository.items[0]).toEqual(
      expect.objectContaining({
        fullName: 'John Doe',
      }),
    )
  })
})
