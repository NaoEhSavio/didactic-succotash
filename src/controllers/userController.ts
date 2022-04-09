import { Request, Response } from 'express'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

import userRepository from '../repositories/userRepository'

export const login = async (request: Request, response: Response) => {
  const { username, password } = request.body

  const user = await userRepository.findByUsername(username)

  if (!user) {
    return response.status(404).json({ error: 'AccountNotExists' })
  }

  if (!(await argon2.verify(user.password, password))) {
    return response.status(401).json({ error: 'IncorrectPassword' })
  }

  const privateKey = process.env.PRIVATE_KEY as string
  const token = jwt.sign({ id: user.id }, privateKey)

  return response.status(200).json({ token })
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
