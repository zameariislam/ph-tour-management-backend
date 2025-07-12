 
 import { NextFunction,Response,Request } from "express";
import { envVariable } from "../../server"
import { AppError } from "../errorHelper/AppError";

 
 export const globalErrorHandler=( err:any,req:Request,res:Response,next:NextFunction)=>{
   

    let statusCode=500;
    let message='Something Went Wrong ...!!!!'

    if(err instanceof AppError){
        statusCode=err.statusCode;
        message=err.message
    } else if(err instanceof Error){
        message=err.message
    }

    res.status(statusCode).json({
         success:false,
         message,
         err,
         stack:envVariable.NODE_ENV==='development'? err.stack:null
    })

   }

