
   import express,{NextFunction, Request,Response} from 'express'
import { AppError } from '../errorHelper/AppError';
import { verifyToken } from '../utils/jwt';

import { JwtPayload } from 'jsonwebtoken';
import { envVariable } from '../../server';

export const checkAuth=(...authRoles:string[])=> async (req:Request, res:Response,next:NextFunction)=>{



try{
   
    console.log('i am here')

    
        const token= req.headers.authorization?.split(' ')[1];

        console.log('ftoken',token)

    if(!token){
         throw new AppError(403,'No Token received')
    }

    const verifiedToken= verifyToken(token, String(envVariable.JWT_ACCESS_SECRET)) as JwtPayload
   

   
    if(!verifiedToken){
          throw new AppError(403,`You are not Authorized ${verifiedToken}`)
    }

  
  

    if(!authRoles.includes(verifiedToken.role)){

        throw new AppError(404,'You are not allowed to view this doc')

    }
    
    next()
}
catch(error){

    next(error)

}



  


}