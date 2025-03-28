import { DomainEvents } from '@/core/events/domain-events'
import { StudentRepository } from '@/domains/forum/application/repositories/student-repository'
import { Student } from '@/domains/forum/enterprise/entities/student'

export class InMemoryStudentRepository implements StudentRepository {
  public items: Student[] = []

  async findByEmail(email: string) {
    const student = this.items.find((item) => item.email === email)

    if (!student) {
      return null
    }

    return student
  }

  async create(student: Student) {
    this.items.push(student)

    DomainEvents.dispatchEventsForAggregate(student.id)
  }
}
