import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface StudentProsp {
  name: string
}

export class Student extends Entity<StudentProsp> {
  get name() {
    return this.props.name
  }

  static create(props: StudentProsp, id?: UniqueEntityId) {
    const student = new Student(props, id)

    return student
  }
}
