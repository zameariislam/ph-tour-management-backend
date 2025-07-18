
   import express,{NextFunction, Request,Response} from 'express'
import { UserController } from './user.controller'



import { validateRequest } from '../../middlewares/validateRequest'
import { createUserZodSchema } from './user.validation'
import { AuthController } from '../auth/auth.controller'
import { checkAuth } from '../../middlewares/checkAuth'
import { Role } from './user.interface'



   
   

   export const router= express.Router()


   
router.post('/register',
 validateRequest (createUserZodSchema),
    UserController.createUser)
router.get('/', UserController.getUserAllUsers)
router.patch('/:id', checkAuth(...Object.values(Role)), UserController.updateUser)



export const UserRoutes=router