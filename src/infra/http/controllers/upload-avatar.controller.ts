import { v4 as uuidv4 } from 'uuid'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { UploadAvatarUseCase } from '@/domain/identity-management/applications/use-cases/upload-avatar'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import {
  BadRequestException,
  Controller,
  NotFoundException,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { HttpUserPresenter } from '../presenters/http-user-presenter'

@Controller('upload/avatar')
@UseGuards(JwtAuthGuard)
export class UploadAvatarController {
  constructor(private uploadAvatar: UploadAvatarUseCase) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          const originalFileName = file.originalname.split('.')[0] // Pegando o nome do arquivo enviado (sem a extensão)
          const sanitizedFileName = originalFileName.replace(/\s+/g, '-') // Substituindo os espaços por hífens
          const fileExtension = extname(file.originalname) // Pegando a extensão do arquivo
          const uniqueSuffix = uuidv4() // Gerando o UUID único
          const fileName = `${sanitizedFileName}-${uniqueSuffix}${fileExtension}` // Adicionando o UUID ao nome do arquivo
          callback(null, fileName) // Salvando o arquivo com o nome final
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Invalid file type'), false)
        }
        callback(null, true)
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // Limite de 5 MB
      },
    }),
  )
  async handle(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: UserPayload,
  ) {
    const fileName = file.filename // Agora o nome do arquivo contém o nome do usuário + UUID
    const studentId = user.sub

    const result = await this.uploadAvatar.execute({ fileName, studentId })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
    return HttpUserPresenter.toHTTP(result.value.user)
  }
}
