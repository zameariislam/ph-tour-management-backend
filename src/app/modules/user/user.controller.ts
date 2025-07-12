
  import {NextFunction, Request,Response} from 'express'
import { User } from './user.model'

import http from 'http-status-codes'
import { UserServices } from './user.service'
import { AppError } from '../../errorHelper/AppError'
import { catchAsync } from '../../utils/catchAsync'

const createUser=catchAsync (async (req:Request, res:Response,next:NextFunction)=>{


    

        //  throw  new AppError('something fake happened',400)
        // throw new Error('Error from regular Error')
         const user= await UserServices.createUSer(req.body)

         res.status(http.CREATED).json({
            message:'User is ceated',
            user
         })

    

})

const getUserAllUsers= catchAsync( async(req,res,next)=>{

    const users= await UserServices.getAllUSers();

    res.status(http.OK).json({
        success:true,
        message:' All Users are retrieved Successfully',
        users
    })



})



 export  const UserController={
    createUser,
    getUserAllUsers
         

 }