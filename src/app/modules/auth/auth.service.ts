import { envVariable } from "../../../server";
import { AppError } from "../../errorHelper/AppError";

import { IsActive, IUser, Role } from "../user/user.interface"
import { User } from "../user/user.model";
 import  jwt, { JwtPayload } from 'jsonwebtoken'

import bcrypt from "bcrypt"

 
import httpStatus from "http-status-codes"
import { generateToken, verifyToken } from "../../utils/jwt";
import { createAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens";


 const credentialLogin=async (payload:Partial<IUser>)=>{
      const {email, password,_id,role}=payload

    console.log('aim in cred')
  
    
   const isUserExist= await User.find({email})


         if(isUserExist.length==0){
     
        throw new AppError(httpStatus.BAD_REQUEST,'User  does not exist')
  
    }




 const isPasswordMatched= await bcrypt.compare(password as string,isUserExist[0].password as string );
 

  

    if(!isPasswordMatched){
        throw new AppError(httpStatus.BAD_REQUEST,'Wrong crediential')
    }



   //  const jwtPayload={
   //      userId:isUserExist[0].id as string,
   //      email:email as string,
   //      role:isUserExist[0].role
   //  }
     const user:Partial<IUser>={
      _id:isUserExist[0]._id,
      email :isUserExist[0].email ,
      role:isUserExist[0].role
     }

     const userTokens=createUserTokens(user)

    
   //  const accessToken= generateToken(jwtPayload, envVariable.JWT_ACCESS_SECRET as string, envVariable.JWT_ACCESS_EXPIRES)
   //  const refreshToken= generateToken(jwtPayload, envVariable.JWT_REFRESH_SECRET as string, envVariable.JWT_REFRESH_EXPIRES)


    
      

  


   const {password:pass,...rest}=isUserExist[0].toObject()

 
   console.log('hello before token')

  

   
   
   // console.log('token',accessToken)

   

return {
   ...userTokens,
   user:{
      ...rest
   }

}



 }


 const createNewAccessToken=async (token:string)=>{

     


//  const verifiedRefreshToken=verifyToken(token, envVariable.JWT_REFRESH_SECRET) as JwtPayload;




// const isUserExist= await User.find({email:verifiedRefreshToken.email })

//  if(!isUserExist){
//    throw new AppError(httpStatus.BAD_REQUEST,'User Does not Exist')
//  }



// if(isUserExist[0].isActive===IsActive.BLOCKED || isUserExist[0].isActive===IsActive.INACTIVE){
//     throw new AppError(httpStatus.BAD_REQUEST,`User id ${isUserExist[0].isActive}`)

//  }
//  if(isUserExist[0].isDeleted){
//     throw new AppError(httpStatus.BAD_REQUEST,`User is Deleted`)

//  }

// const payload={
//       _id:isUserExist[0]._id,
//      email :isUserExist[0].email ,
//      role:isUserExist[0].role
//      }


//  const  accessToken= generateToken(payload,envVariable.JWT_ACCESS_SECRET as string,envVariable.JWT_ACCESS_EXPIRES);

 const accessToken=await createAccessTokenWithRefreshToken(token)

  console.log('accessToken', accessToken)



return {
   accessToken
}

 


 }



  const getAllUsers=async ():Promise<IUser[]>=>{


    console.log('i am from users auth service')


    const users=  await User.find({})

    
  

    return users




 }


 export const AuthServices={
    credentialLogin,
    getAllUsers,
    createNewAccessToken
    
 }