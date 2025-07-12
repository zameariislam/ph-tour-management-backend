
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { loadEnvVar } from "./app/config/env";

 
 let server:Server;
 
export const envVariable=loadEnvVar()
//  console.log(envVariable)

  const startServer=async()=>{

    try{

        
    await mongoose.connect(`${envVariable.DB_URL}`);
   
  console.log('database is connected')

        server = app.listen(envVariable.PORT, () => {
            console.log(` server is listening on port ${envVariable.PORT}`)
        })

       

    }catch(error:any){

        console.log(error.message)

    }

   

  }

   startServer()


   process.on('unhandledRejection',(err)=>{
     console.log('unhandle rejection detected, server is shutting down',err)

    if(server){
      server.close(()=>{
        process.exit(1)
      })
    }

    process.exit(1)



   })
   

   process.on('uncaughtException',(err)=>{
     console.log('uncaughtException detected, server is shutting down',err)

    if(server){
      server.close(()=>{
        process.exit(1)
      })
    }

    process.exit(1)



   })



   
   process.on('SIGTERM',()=>{
     console.log('sigterm signal received... server shutting down ...')

    if(server){
      server.close(()=>{
        process.exit(1)
      })
    }

    process.exit(1)



   })


  //  process.on('SIGINT',()=>{
  //    console.log('sigterm signal received... server shutting down ...')

  //   if(server){
  //     server.close(()=>{
  //       process.exit(1)
  //     })
  //   }

  //   process.exit(1)



  //  })
  //  throw new Error('local Error')


  //  Promise.reject('I forgot to catch promise')



   