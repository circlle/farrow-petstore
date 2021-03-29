import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken'
import { JWT_KEY } from '../config'
import { option } from 'fp-ts'
import { User } from '@prisma/client'
import { Option } from 'fp-ts/lib/Option'

export type JWTInfo = Pick<User, "id" | "username" | "email"> & { exp: number }

export const sign = (input: User): string => {
  const today = new Date()
  const exp = new Date()
  exp.setDate(today.getDate() + 60)

  const jwtInfo: JWTInfo = {
    id: input.id,
    username: input.username,
    email: input.email,
    exp: exp.getTime() / 1000
  }
  return jwtSign(jwtInfo, JWT_KEY)
}

export const verify = async (token: string) => {
  try {
    const decoded = await jwtVerify(token, JWT_KEY) as JWTInfo
    return option.some(decoded)
  } catch (error) {
    return option.none
  }
}



