
   import express,{NextFunction, Request,Response} from 'express'


import { AuthController } from '../auth/auth.controller'
 import  jwt, { JwtPayload } from 'jsonwebtoken'
import { AppError } from '../../errorHelper/AppError'
import { Role } from '../user/user.interface'
import { verifyToken } from '../../utils/jwt'
import { envVariable } from '../../../server'
import { checkAuth } from '../../middlewares/checkAuth'
export const router= express.Router()


   
router.post('/login',AuthController.credentialLogin)





router.get('/all-users',checkAuth(Role.ADMIN,Role.SUPER_ADMIN)
    , AuthController.getAllUsers)

    
router.post('/refresh-token',
     AuthController.createNewAccessToken)










export const AuthRoutes=router