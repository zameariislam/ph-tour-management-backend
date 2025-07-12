import  {  Request, Response } from 'express' ;
import http from 'http-status-codes';

 export const notFound= (req:Request, res:Response) => {
    res.status(http.NOT_FOUND).json({
      status:false,
      message:'Route Not Found'

    })
}