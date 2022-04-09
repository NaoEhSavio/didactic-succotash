import { Request, Response } from 'express'
import argon2 from 'argon2'

import userRepository from '../repositories/userRepository'

export const login = async (_: Request, response: Response) => {
  return response.status(200).json({ foo: 'bar' })
}

export const register = async (request: Request, response: Response) => {
  const { username, password } = request.body

  const verifyUsername = await userRepository.findByUsername(username)
  if (verifyUsername) {
    return response.status(400).json({ error: 'UsernameAlreadyUsed' })
  }

  const hashedPassword = await argon2.hash(password)

  const user = await userRepository.save({
    username,
    password: hashedPassword
  })

  return response.status(201).json(user)
}
