import { HashComparer } from '@/domain/identity-management/applications/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/identity-management/applications/cryptography/hash-generator'
import { hash, compare } from 'bcryptjs'

export class BcryptHash implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return hash(plain, 8)
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
