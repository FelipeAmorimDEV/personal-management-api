import { HashComparer } from '@/domain/identity-management/applications/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/identity-management/applications/cryptography/hash-generator'

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
