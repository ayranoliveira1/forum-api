import { Either, left, right } from '@/core/either'
import { StudentRepository } from '../repositories/student-repository'
import { Student } from '../../enterprise/entities/student'
import { StudentAlreadyExistsError } from './errors/student-already-exists-error'
import { HashGenerate } from '../cryptography/hash-generate'

interface RegisterStudentUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  { student: Student }
>

export class RegisterStudentUseCase {
  constructor(
    private studentRepository: StudentRepository,
    private hashGenerate: HashGenerate,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const studentAlreadyExists = await this.studentRepository.findByEmail(email)

    if (studentAlreadyExists) {
      return left(new StudentAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerate.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.studentRepository.create(student)

    return right({ student })
  }
}
