import { User } from '../models/user'
import prisma from '../database'

const save = (user: User): Promise<User> =>
  prisma.user.create({ data: user })

const findByUsername = (username: string): Promise<User | null> =>
  prisma.user.findUnique({ where: { username } })

export default { save, findByUsername }
