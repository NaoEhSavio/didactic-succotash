import { Problem } from './problem'

export interface User {
  id?: string
  username: string
  password: string
  problemsSolved?: Problem[]
}
