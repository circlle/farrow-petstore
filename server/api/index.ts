import { Router } from 'farrow-http'
import { service as GreetService } from './greet'
import { service as CategoryService } from './category'
import { service as UserService } from './user'

export const services = Router()

// attach greet service
services.route('/api/greet').use(GreetService)
services.route('/api/category').use(CategoryService)
services.route('/api/user').use(UserService)