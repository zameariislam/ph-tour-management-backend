import { catchAsync } from "../../utils/catchAsync";
  import {NextFunction, Request,Response} from 'express'
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";


import statusCode from 'http-status-codes';
import { setAuthCookie } from "../../utils/setCookie";



const credentialLogin=catchAsync (async (req:Request, res:Response,next:NextFunction)=>{


         const loginInfo=  await  AuthServices.credentialLogin(req.body);

         // res.cookie('refreshToken',loginInfo.refreshToken,{
         //    httpOnly:true,
         //    secure:false

         // });

          setAuthCookie(res,loginInfo)
           res.cookie('accessToken',loginInfo.refreshToken,{
            httpOnly:true,
            secure:false

         })

         sendResponse(res, {
            success:true,
            statusCode:statusCode.CREATED,
            message:'User Loggedin successfully',
            data:loginInfo

         } )

          

})

const createNewAccessToken=catchAsync (async (req:Request, res:Response,next:NextFunction)=>{


    const refreshToken= req.cookies.refreshToken;

    console.log('refresh',refreshToken)

   

    const accessToken= await AuthServices.createNewAccessToken(refreshToken);

     res.cookie('accessToken',accessToken,{
            httpOnly:true,
            secure:false

         })


         sendResponse(res, {
            success:true,
            statusCode:statusCode.CREATED,
            message:'New Access token  Issued successfully',
            data:accessToken

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
    getAllUsers,
    createNewAccessToken

}
