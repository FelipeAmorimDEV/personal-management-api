import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { v4 as uuidv4 } from 'uuid'

@Controller('upload/myprogress')
@UseGuards(JwtAuthGuard)
export class UploadMyProgressPhotoController {
  @Post()
  @UseInterceptors(
    FileInterceptor('my-progress', {
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
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async handle(@UploadedFile() file: Express.Multer.File) {
    const fileName = file.filename

    return { myProgressImage: fileName }
  }
}
