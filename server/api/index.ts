import { Router } from 'farrow-http'
import { service as CategoryService } from './category'
import { service as UserService } from './user'
import { service as PetService } from './pet'
import { service as OrderService } from "./order"

export const services = Router()

services.route('/api/category').use(CategoryService)
services.route('/api/user').use(UserService)
services.route('/api/pet').use(PetService)
services.route('/api/order').use(OrderService)