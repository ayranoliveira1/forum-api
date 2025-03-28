import { UseCaseError } from '@/core/@types/errors/use-case-errors'

export class StudentAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Student "${identifier}" already exists`)
  }
}
