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

@Controller('upload/myprogress')
@UseGuards(JwtAuthGuard)
export class UploadMyProgressPhotoController {
  @Post()
  @UseInterceptors(
    FileInterceptor('my-progress', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9)
          const extension = extname(file.originalname)
          callback(null, `${file.fieldname}-${uniqueSuffix}${extension}`)
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
