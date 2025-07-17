
  import {NextFunction, Request,Response} from 'express'
import { User } from './user.model'

import http from 'http-status-codes'
import { UserServices } from './user.service'
import { AppError } from '../../errorHelper/AppError'
import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'


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
    getUserAllUsers
         

 }