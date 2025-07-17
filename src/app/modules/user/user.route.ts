
   import express,{NextFunction, Request,Response} from 'express'
import { UserController } from './user.controller'



import { validateRequest } from '../../middlewares/validateRequest'
import { createUserZodSchema } from './user.validation'
import { AuthController } from '../auth/auth.controller'



   
   

   export const router= express.Router()


   
router.post('/register',
 validateRequest (createUserZodSchema),
    UserController.createUser)
router.get('/', UserController.getUserAllUsers)



export const UserRoutes=router