


import  jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'



 export const generateToken=(payload:JwtPayload ,secret:string,expiry:string)=>{


    


    const token= jwt.sign(payload,secret,{
        expiresIn:expiry
    } as SignOptions)
    
    return token


 }


 export  const verifyToken=(token:string, secret:string)=>{


    const varifiedToken= jwt.verify(token,secret)
    
    return varifiedToken
 }


