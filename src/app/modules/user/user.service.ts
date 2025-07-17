import { AppError } from "../../errorHelper/AppError"
import { IAuthProvider, IUser } from "./user.interface"
import { User } from "./user.model"


import httpStatus from "http-status-codes"

const createUSer= async (payload:Partial<IUser>):Promise<IUser|null>=>{

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
    getAllUSers
}


