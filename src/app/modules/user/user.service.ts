import { JwtPayload } from "jsonwebtoken"
import { AppError } from "../../errorHelper/AppError"
import { verifyToken } from "../../utils/jwt"
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface"
import { User } from "./user.model"
import bcrypt from 'bcrypt'


import httpStatus from "http-status-codes"
import { envVariable } from "../../../server"

const createUSer= async (  payload:Partial<IUser>):Promise<IUser|null>=>{

    const {email,...rest}=payload
      

    const isUserExist= await User.find({email});

    
    if(isUserExist.length){
     
        throw new AppError(httpStatus.BAD_REQUEST,'User is Already exist')
  
    }


     const authProvider:IAuthProvider={
        provider:"credential",
        providerId:email as string
     }
      
  

 

    const user= await User.create({
        email,
        auths:[authProvider],
        ...rest
    })
    return user

}


const updateUSer= async (userId:string, payload:Partial<IUser>, decodetoken:JwtPayload):Promise<IUser|null>=>{


    const isUserExist= await User.findById(userId);
       console.log('exist',isUserExist)
   

    if(!isUserExist){

        throw new AppError(httpStatus.NOT_FOUND,'User Not Found')

    }
    //  if(isUserExist.isDeleted|| isUserExist.isActive===IsActive.BLOCKED){

    //     throw new AppError(httpStatus.FORBIDDEN,'This user can nto be updated ')

    // }

    
    
    if(payload.role){
        if(decodetoken.role===Role.USER||decodetoken.role===Role.GUIDE){

            throw new AppError(httpStatus.BAD_REQUEST,'You are not Authorized')
        }

        if(payload.role===Role.SUPER_ADMIN&&Role.ADMIN){
             throw new AppError(httpStatus.BAD_REQUEST,'You are not Authorized')

        }
        if(payload.isActive|| payload.isDeleted||payload.isVerified){
           if(decodetoken.role===Role.USER||decodetoken.role===Role.GUIDE){

            throw new AppError(httpStatus.BAD_REQUEST,'You are not Authorized')
        }


        }

    }


    if(payload.password){
        payload.password = await bcrypt.hash(payload.password,Number( envVariable.BCRYPT_SALT_ROUND));
    }

 
    const updatedUser= await User.findByIdAndUpdate(userId,payload,{ 
        new:true,
        runValidators:true
    })


    return updatedUser

  
}







const getAllUSers= async ()=>{

    

    const users= await User.find()
    const total= await User.countDocuments()
    return {
        users,
        total
    }

}



export const UserServices={
    createUSer,
    getAllUSers,
    updateUSer
  
}


