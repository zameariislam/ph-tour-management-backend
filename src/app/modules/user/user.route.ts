
   import express,{request,response} from 'express'
import { UserController } from './user.controller'

   
   

   export const router= express.Router()


   
router.post('/register',UserController.createUser)
router.get('/',UserController.getUserAllUsers)


export const UserRoutes=router