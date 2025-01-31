import { Module } from '@nestjs/common'
import { HttpModule } from './http/http.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Env, envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { MulterModule } from '@nestjs/platform-express'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    MulterModule.registerAsync({
      useFactory: async (configService: ConfigService<Env, true>) => ({
        dest: configService.get('UPLOAD_FOLDER'),
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    HttpModule,
    AuthModule,
  ],
})
export class AppModule {}
