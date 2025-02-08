import { Either, left, right } from '@/core/either'
import { UsersRepository } from '../repositories/users-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Student } from '../../enterprise/entities/student'
import { Injectable } from '@nestjs/common'
import { join } from 'node:path'
import { unlinkSync } from 'node:fs'

interface UploadAvatarUseCaseRequest {
  studentId: string
  fileName: string
}

type UploadAvatarUseCaseResponse = Either<
  ResourceNotFoundError,
  { user: Student }
>

@Injectable()
export class UploadAvatarUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    fileName,
    studentId,
  }: UploadAvatarUseCaseRequest): Promise<UploadAvatarUseCaseResponse> {
    const user = await this.usersRepository.findById(studentId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }
    if (user.avatar) {
      try {
        // Ajuste do caminho para garantir que o diretório 'uploads' seja correto
        const oldAvatarPath = join(
          process.cwd(), // Usar o diretório de trabalho atual
          'uploads',
          user.avatar, // Nome do arquivo do avatar
        )

        console.log('oldAvatarPath:', oldAvatarPath)

        // Tenta remover o arquivo antigo
        unlinkSync(oldAvatarPath)
      } catch (error) {
        // Caso falhe ao remover o avatar antigo, logue ou trate de maneira apropriada
        console.error('Error removing old avatar:', error)
      }
    }

    // Atualiza o avatar com o novo nome do arquivo
    user.avatar = fileName

    // Salva o usuário com o novo avatar
    await this.usersRepository.save(user)

    return right({ user })
  }
}
