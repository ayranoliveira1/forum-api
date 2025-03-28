import { Either, left, right } from '@/core/either'
import { Encrypter } from '../cryptography/encrypter'
import { HashCompare } from '../cryptography/hash-compare'
import { StudentRepository } from '../repositories/student-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

type AuthenticateStudentUseCaseResponse = Either<
  InvalidCredentialsError,
  {
    token: string
  }
>

export class AuthenticateStudentUseCase {
  constructor(
    private studentRepository: StudentRepository,
    private hashCompare: HashCompare,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentRepository.findByEmail(email)

    if (!student) {
      return left(new InvalidCredentialsError())
    }

    const passwordMatch = await this.hashCompare.compare(
      password,
      student.password,
    )

    if (!passwordMatch) {
      return left(new InvalidCredentialsError())
    }

    const token = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })

    return right({
      token,
    })
  }
}
