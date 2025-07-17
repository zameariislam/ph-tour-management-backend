import { envVariable } from "../../../server";
import { AppError } from "../../errorHelper/AppError";

import { IUser } from "../user/user.interface"
import { User } from "../user/user.model";
 import  jwt from 'jsonwebtoken'

import bcrypt from "bcrypt"

 
import httpStatus from "http-status-codes"


 const credentialLogin=async (payload:Partial<IUser>)=>{
      const {email, password,...rest}=payload

  
    
   const isUserExist= await User.find({email});
      

         if(isUserExist.length==0){
     
        throw new AppError(httpStatus.BAD_REQUEST,'User  does not exist')
  
    }




 const isPasswordMatched= await bcrypt.compare(password as string,isUserExist[0].password as string );

  

    if(!isPasswordMatched){
        throw new AppError(httpStatus.BAD_REQUEST,'Wrong crediential')
    }


    const jwtPayload={
        userId:isUserExist[0].id as string,
        email,
        role:isUserExist[0].role
    }



const generateToken=(payload:typeof jwtPayload,secret:string,expiresIn:string)=>{


//     const token=  jwt.sign(payload,secret,{
//         expiresIn
//     })

//     return token


// }


// const token= generateToken(jwtPayload,envVariable.JWT_ACCESS_SECRET as string,envVariable.JWT_ACCESS_EXPIRES)

      
    const token=  jwt.sign({name:'Zameari'},'secret',{
        expiresIn:'1hr'
    })
   
   
   console.log('token',token)

   

return token

    


 }

  const token=  jwt.sign(jwtPayload,
  'secret',
  {
    expiresIn:'1hr'
  }
)
   
   
   console.log('token',token)

   

return token



 }


 export const AuthServices={
    credentialLogin
 }