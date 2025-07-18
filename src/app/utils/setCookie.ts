import { Response } from "express";



export interface IAuthToken{
     accessToken?:string;
     refreshToken?:string
}


 export  const setAuthCookie=(res:Response, tokenInfo:IAuthToken)=>{

    if(tokenInfo.accessToken){

          res.cookie('accessToken',tokenInfo.refreshToken,{
            httpOnly:true,
            secure:false

         });
                
    } else{
        res.cookie('refreshToken',tokenInfo.refreshToken,{
            httpOnly:true,
            secure:false

         })

    }




 }