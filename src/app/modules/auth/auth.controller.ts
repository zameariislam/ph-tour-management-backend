import { catchAsync } from "../../utils/catchAsync";
  import {NextFunction, Request,Response} from 'express'
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";


import statusCode from 'http-status-codes';




const credentialLogin=catchAsync (async (req:Request, res:Response,next:NextFunction)=>{


         const token= await AuthServices.credentialLogin(req.body);
 
         sendResponse(res, {
            success:true,
            statusCode:statusCode.CREATED,
            message:'User Loggedin successfully',
            data:token

         } )

          

})





const getAllUsers=catchAsync (async (req:Request, res:Response,next:NextFunction)=>{



    const users= await AuthServices.getAllUsers()

   
  
         sendResponse(res, {
            success:true,
            statusCode:statusCode.CREATED,
            message:'All Users  Retrieved successfully',
            data:users

         } )

         

    

})




export const AuthController={
    credentialLogin,
    getAllUsers

}
