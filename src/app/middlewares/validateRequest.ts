import { z, ZodObject } from "zod";

import { Request,Response,NextFunction } from "express";




    export const validateRequest= (zodSchema:ZodObject)=> async (req:Request,res:Response,next:NextFunction)=>{

        try{

            console.log('vali',req.body)

              
         req.body=await  zodSchema.parseAsync(req.body)
         next()

    

        } catch(error){
            next(error)

        } 
    

}