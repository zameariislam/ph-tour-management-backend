
   import express,{NextFunction, Request,Response} from 'express'
import { validateRequest } from '../../middlewares/validateRequest'

import { AuthController } from '../auth/auth.controller'



   
   

   export const router= express.Router()


   
router.post('/login',AuthController.credentialLogin)










export const AuthRoutes=router