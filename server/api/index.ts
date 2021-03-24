import { Router } from 'farrow-http'
import { service as GreetService } from './greet'
import { service as CategoryService } from './category'

export const services = Router()

// attach greet service
services.route('/api/greet').use(GreetService)
services.route('/api/category').use(CategoryService)
