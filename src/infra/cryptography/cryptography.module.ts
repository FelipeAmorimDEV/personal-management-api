import { HashGenerator } from '@/domain/identity-management/applications/cryptography/hash-generator'
import { Module } from '@nestjs/common'
import { BcryptHash } from './bcrypt-hash'
import { Encrypter } from '@/domain/identity-management/applications/cryptography/encrypter'
import { JwtEncrypter } from './jwt-encrypter'
import { HashComparer } from '@/domain/identity-management/applications/cryptography/hash-comparer'

@Module({
  providers: [
    {
      provide: HashGenerator,
      useClass: BcryptHash,
    },
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashComparer,
      useClass: BcryptHash,
    },
  ],
  exports: [HashGenerator, Encrypter, HashComparer],
})
export class CryptographyModule {}
