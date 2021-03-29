/**
 * This file was generated by farrow-api
 * Don't modify it manually
 */

import { createApiPipelineWithUrl } from 'farrow-api-client'

/**
 * {@label LoginInput}
 */
export type LoginInput = {
  username: string
  password: string
}

/**
 * {@label LoginOutput}
 */
export type LoginOutput = {
  data: LoginSuccess | UserNotFound | PasswordError
}

/**
 * {@label LoginSuccess}
 */
export type LoginSuccess = {
  __typename: 'LOGIN_SUCCESS'
  token: string
}

/**
 * {@label UserNotFound}
 */
export type UserNotFound = {
  __typename: 'USER_NOT_FOUND'
  message: string
  username: string
}

/**
 * {@label PasswordError}
 */
export type PasswordError = {
  __typename: 'PASSWORD_ERROR'
  message: string
}

/**
 * {@label CreateUserInput}
 */
export type CreateUserInput = {
  username: string
  email: string | null | undefined
  password: string
  avatar: string | null | undefined
}

/**
 * {@label CreateUserOutput}
 */
export type CreateUserOutput = {
  data: CreatedUserSuccess | CreateUserFailed
}

/**
 * {@label CreatedUserSuccess}
 */
export type CreatedUserSuccess = {
  user: MaskUser
}

/**
 * {@label CreateUserFailed}
 */
export type CreateUserFailed = {
  message: string
}

/**
 * {@label MaskUser}
 */
export type MaskUser = {
  id: number
  username: string
  email: string | null | undefined
  avatar: string | null | undefined
  createdAt: string
}

export const url = 'http://localhost:3003/api/user'

export const apiPipeline = createApiPipelineWithUrl(url)

export const api = {
  /**
   * @remarks login with username and password
   */
  login: (input: LoginInput) => apiPipeline.invoke({ path: ['login'], input }) as Promise<LoginOutput>,
  /**
   * @remarks create an new user
   */
  createUser: (input: CreateUserInput) =>
    apiPipeline.invoke({ path: ['createUser'], input }) as Promise<CreateUserOutput>,
}
