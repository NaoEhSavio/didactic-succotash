import { User } from './user'

export interface Problem {
  id?: string
  description: string
  source: string
  test: string
  user: User[]
}
