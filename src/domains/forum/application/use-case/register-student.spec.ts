import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-repository'
import { RegisterStudentUseCase } from './register-student'
import { FakerHasher } from 'test/cryptography/faker-hasher'
import { Student } from '../../enterprise/entities/student'

let inMemoryStudentRepository: InMemoryStudentRepository
let fakerHash: FakerHasher
let sut: RegisterStudentUseCase

describe('Register Student', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository()
    fakerHash = new FakerHasher()
    sut = new RegisterStudentUseCase(inMemoryStudentRepository, fakerHash)
  })

  it('should be able to register a student', async () => {
    const student = Student.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    })

    const result = await sut.execute(student)

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: inMemoryStudentRepository.items[0],
    })
  })

  it('should hash student password upon  registration', async () => {
    const student = Student.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    })

    const result = await sut.execute(student)

    const hashedPassword = await fakerHash.hash('any_password')

    expect(result.isRight()).toBe(true)
    expect(inMemoryStudentRepository.items[0].password).toEqual(hashedPassword)
  })
})
