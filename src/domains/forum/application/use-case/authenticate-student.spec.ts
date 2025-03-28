import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-repository'
import { FakerHasher } from 'test/cryptography/faker-hasher'
import { AuthenticateStudentUseCase } from './authenticate-student'
import { FakerEncrypter } from 'test/cryptography/faker-encrypter'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { makeStudent } from 'test/factories/make-student'

let inMemoryStudentRepository: InMemoryStudentRepository
let fakerHash: FakerHasher
let fakerEcrypter: FakerEncrypter
let sut: AuthenticateStudentUseCase

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository()
    fakerHash = new FakerHasher()
    fakerEcrypter = new FakerEncrypter()
    sut = new AuthenticateStudentUseCase(
      inMemoryStudentRepository,
      fakerHash,
      fakerEcrypter,
    )
  })

  it('should be able to Authenticate a student', async () => {
    const student = makeStudent({
      password: await fakerHash.hash('any_password'),
    })

    await inMemoryStudentRepository.create(student)

    const result = await sut.execute({
      email: student.email,
      password: 'any_password',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      token: expect.any(String),
    })
  })

  it('should hash student password upon authenticate', async () => {
    const student = makeStudent()

    await inMemoryStudentRepository.create(student)

    const result = await sut.execute({
      email: student.email,
      password: 'any_password1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })
})
