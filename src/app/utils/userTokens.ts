import { JwtPayload } from "jsonwebtoken"
import { envVariable } from "../../server"
import { IsActive, IUser } from "../modules/user/user.interface"
import { generateToken, verifyToken } from "./jwt"
import { User } from "../modules/user/user.model"
import { AppError } from "../errorHelper/AppError"
import httpStatus from 'http-status-codes'
import { promises } from "dns"


 export const  createUserTokens=(user:Partial<IUser>)=>{



      const jwtPayload={
        userId: user._id,
        email:user.email as string,
        role:user.role
    }

    
        const accessToken= generateToken(jwtPayload, envVariable.JWT_ACCESS_SECRET as string, envVariable.JWT_ACCESS_EXPIRES)
        const refreshToken= generateToken(jwtPayload, envVariable.JWT_REFRESH_SECRET as string, envVariable.JWT_REFRESH_EXPIRES)


        return{
            accessToken,
            refreshToken
        }

 }



 export const  createAccessTokenWithRefreshToken= async (refreshToken:string)=>{



    const verifiedRefreshToken=verifyToken(refreshToken, envVariable.JWT_REFRESH_SECRET) as JwtPayload;




const isUserExist= await User.find({email:verifiedRefreshToken.email })

if(!isUserExist){
   throw new AppError (httpStatus.BAD_REQUEST,'User Does not Exist')
}



if(isUserExist[0].isActive===IsActive.BLOCKED || isUserExist[0].isActive===IsActive.INACTIVE){
    throw new AppError(httpStatus.BAD_REQUEST,`User id ${isUserExist[0].isActive}`)

}
if(isUserExist[0].isDeleted){
    throw new AppError(httpStatus.BAD_REQUEST,`User is Deleted`)

}

const payload={
      _id:isUserExist[0]._id,
      email :isUserExist[0].email ,
      role:isUserExist[0].role
     }

      const  accessToken= generateToken(payload,envVariable.JWT_ACCESS_SECRET as string,envVariable.JWT_ACCESS_EXPIRES);


      return accessToken



 }