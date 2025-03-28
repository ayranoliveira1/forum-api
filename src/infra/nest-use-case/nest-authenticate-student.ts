import { Encrypter } from '@/domains/forum/application/cryptography/encrypter'
import { HashCompare } from '@/domains/forum/application/cryptography/hash-compare'
import { StudentRepository } from '@/domains/forum/application/repositories/student-repository'
import { AuthenticateStudentUseCase } from '@/domains/forum/application/use-case/authenticate-student'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestAuthenticateStudentUseCase extends AuthenticateStudentUseCase {
  constructor(
    studentRepository: StudentRepository,
    hashCompare: HashCompare,
    encrypter: Encrypter,
  ) {
    super(studentRepository, hashCompare, encrypter)
  }
}
