/**
 * This file was generated by farrow-api
 * Don't modify it manually
 */

import { createApiPipelineWithUrl, ApiInvokeOptions } from 'farrow-api-client'

/**
 * {@label CreatePetInput}
 */
export type CreatePetInput = {
  name: string
  price: number
  description: string
  costPrice: number
  categoryId: number
}

/**
 * {@label PetExist}
 */
export type PetExist = {
  type: 'PET_EXIST'
  message: string
}

/**
 * {@label CreatePetSuccess}
 */
export type CreatePetSuccess = {
  type: 'CREATE_PET_SUCCESS'
  pet: MaskPet
}

/**
 * {@label MaskPet}
 */
export type MaskPet = {
  id: number
  name: string
  price: number
  description: string
  categoryId: number | null | undefined
  category: Category | null | undefined
  photos: PetPhoto[]
  status: 'AVAILABLE' | 'PENDING' | 'SOLD' | null | undefined
}

/**
 * {@label Category}
 */
export type Category = {
  /**
   * @remarks The id of category
   */
  id: number
  /**
   * @remarks The name of category
   */
  name: string
  /**
   * @remarks category description
   */
  description: string
  /**
   * @remarks category photo
   */
  image: string
}

/**
 * {@label PetPhoto}
 */
export type PetPhoto = {
  id: number
  petId: number
  url: string
}

/**
 * {@label GetPetListInput}
 */
export type GetPetListInput = {
  pageIndex: number | null | undefined
  pageSize: number | null | undefined
  categoryId: number | null | undefined
  status: 'AVAILABLE' | 'PENDING' | 'SOLD' | null | undefined
}

/**
 * {@label GetPetListOutput}
 */
export type GetPetListOutput = {
  list: MaskPet[]
  pagination: Pagination
}

/**
 * {@label Pagination}
 */
export type Pagination = {
  total: number
  count: number
  pageSize: number
  pageIndex: number
}

/**
 * {@label GetPetByIdInput}
 */
export type GetPetByIdInput = {
  id: number
}

/**
 * {@label PetNotFound}
 */
export type PetNotFound = {
  type: 'PET_NOT_FOUND'
  message: string
  petId: number
}

/**
 * {@label GetPetByIdSuccess}
 */
export type GetPetByIdSuccess = {
  type: 'GET_PET_BY_ID_SUCCESS'
  pet: MaskPet
}

export const url = 'http://localhost:3003/api/pet'

export const apiPipeline = createApiPipelineWithUrl(url)

export const api = {
  /**
   * @remarks create a new pet
   */
  createPet: (input: CreatePetInput, options?: ApiInvokeOptions) =>
    apiPipeline.invoke({ type: 'Single', path: ['createPet'], input }, options) as Promise<PetExist | CreatePetSuccess>,
  /**
   * @remarks get pet list by filter
   */
  getPetList: (input: GetPetListInput, options?: ApiInvokeOptions) =>
    apiPipeline.invoke({ type: 'Single', path: ['getPetList'], input }, options) as Promise<GetPetListOutput>,
  /**
   * @remarks get pet by id
   */
  getPetById: (input: GetPetByIdInput, options?: ApiInvokeOptions) =>
    apiPipeline.invoke({ type: 'Single', path: ['getPetById'], input }, options) as Promise<
      PetNotFound | GetPetByIdSuccess
    >,
}
