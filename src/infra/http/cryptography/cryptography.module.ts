import { Encrypter } from '@/domains/forum/application/cryptography/encrypter'
import { Module } from '@nestjs/common'
import { JwrEcrypter } from './jwt-encrypter'
import { HashCompare } from '@/domains/forum/application/cryptography/hash-compare'
import { BcryptHasher } from './bcrypt-hasher'
import { HashGenerate } from '@/domains/forum/application/cryptography/hash-generate'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwrEcrypter,
    },
    {
      provide: HashCompare,
      useClass: BcryptHasher,
    },
    {
      provide: HashGenerate,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, HashCompare, HashGenerate],
})
export class CryptographyModule {}
