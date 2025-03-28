import { HashCompare } from '@/domains/forum/application/cryptography/hash-compare'
import { HashGenerate } from '@/domains/forum/application/cryptography/hash-generate'
import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'

@Injectable()
export class BcryptHasher implements HashCompare, HashGenerate {
  private HASH_SALT_LENGTH = 8

  hash(plain: string) {
    return hash(plain, this.HASH_SALT_LENGTH)
  }
  compare(plain: string, hashed: string) {
    return compare(plain, hashed)
  }
}
