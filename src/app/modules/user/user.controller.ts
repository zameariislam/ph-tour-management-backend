
  import {NextFunction, Request,Response} from 'express'
import { User } from './user.model'

import http from 'http-status-codes'
import { UserServices } from './user.service'
import { AppError } from '../../errorHelper/AppError'
import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { envVariable } from '../../../server'


const createUser=catchAsync (async (req:Request, res:Response,next:NextFunction)=>{
  console.log('data',req.body)

     
         const user= await UserServices.createUSer(req.body);

         
         sendResponse(res, {
            success:true,
            statusCode:http.CREATED,
            message:'User is created successfully',
            data:user

         } )

         

    

})



const updateUser=catchAsync (async (req:Request, res:Response,next:NextFunction)=>{
  console.log('from update user')

  

  const userId=req.params.id;
  const token=req.headers.authorization?.split(' ')[1] as string

  

 

  if(!token){
    throw new AppError(http.BAD_REQUEST,'You dont have access')
  }


   const verifyToken= jwt.verify(token ,envVariable.JWT_ACCESS_SECRET as string ) as JwtPayload

 
   const payload=req.body

  
     
         const user= await UserServices.updateUSer(userId,payload,verifyToken );

         
         sendResponse(res, {
            success:true,
            statusCode:http.CREATED,
            message:'User is Update successfully',
            data:user

         } )

         

    

})




const getUserAllUsers= catchAsync( async(req,res,next)=>{

    const users= await UserServices.getAllUSers();

    sendResponse(res,{
         success:true,
          statusCode:http.OK,
        message:'All Users are retrieved Successfully',
        data:users,
        
        meta:{
            total:users.total
        }
    })

    })

   






 export  const UserController={
    createUser,
    getUserAllUsers,
    updateUser
         

 }