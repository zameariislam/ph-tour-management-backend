
import { log } from 'console';
import  express, { Application,NextFunction,Request,Response } from 'express' ;


const app:Application=express()

app.get('/', async (req:Request,res:Response)=>{


    throw new Error('hello')


  
    try{

      
         res.status(200).json({
      message:'Welcome to tour management system'
    })

    }catch(error:any){
         res.status(500).json({
      message:'hello from error'
    })

    }

   

   })





   app.use(( err:any,req:Request,res:Response,next:NextFunction)=>{
    console.log('hello from middle')

    res.status(401).json({
        message:err.message
    })

   })


   export default app