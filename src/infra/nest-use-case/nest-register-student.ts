import { HashGenerate } from '@/domains/forum/application/cryptography/hash-generate'
import { StudentRepository } from '@/domains/forum/application/repositories/student-repository'
import { RegisterStudentUseCase } from '@/domains/forum/application/use-case/register-student'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestRegisterStudentUseCase extends RegisterStudentUseCase {
  constructor(
    studentRepository: StudentRepository,
    hashGenerate: HashGenerate,
  ) {
    super(studentRepository, hashGenerate)
  }
}
