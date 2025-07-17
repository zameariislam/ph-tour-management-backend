import { envVariable } from "../../../server";
import { AppError } from "../../errorHelper/AppError";

import { IUser } from "../user/user.interface"
import { User } from "../user/user.model";
 import  jwt from 'jsonwebtoken'

import bcrypt from "bcrypt"

 
import httpStatus from "http-status-codes"
import { generateToken } from "../../utils/jwt";


 const credentialLogin=async (payload:Partial<IUser>)=>{
      const {email, password,...rest}=payload



      console.log('aim in cred')
  
    
   const isUserExist= await User.find({email});
      console.log('aim in cred',isUserExist)

         if(isUserExist.length==0){
     
        throw new AppError(httpStatus.BAD_REQUEST,'User  does not exist')
  
    }




 const isPasswordMatched= await bcrypt.compare(password as string,isUserExist[0].password as string );
  console.log('pass',isPasswordMatched)

  

    if(!isPasswordMatched){
        throw new AppError(httpStatus.BAD_REQUEST,'Wrong crediential')
    }


    const jwtPayload={
        userId:isUserExist[0].id as string,
        email:email as string,
        role:isUserExist[0].role
    }

    

    console.log('access',envVariable.JWT_ACCESS_SECRET)

  
    const token= generateToken(jwtPayload, envVariable.JWT_ACCESS_SECRET as string, envVariable.JWT_ACCESS_EXPIRES)

   
   
   console.log('token',token)

   

return token



 }


  const getAllUsers=async ():Promise<IUser[]>=>{


    console.log('i am from users auth service')


    const users=  await User.find({})

    
  

    return users




 }


 export const AuthServices={
    credentialLogin,
    getAllUsers
 }