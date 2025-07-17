
import  dotenv from'dotenv' ;
dotenv.config()

interface IEnvVariable{
    PORT:string;
    DB_URL:string;
    NODE_ENV:string,
    JWT_ACCESS_SECRET:String,
    JWT_ACCESS_EXPIRES:string

}




   export const loadEnvVar=():IEnvVariable=>{

    const requiredEnvVar=['PORT','DB_URL','NODE_ENV','JWT_ACCESS_SECRET','JWT_ACCESS_EXPIRES']

    requiredEnvVar.forEach((key)=>{

        if(!process.env[key]){

            throw new Error(`value of ${key} is not given`)
            console.log('error')

        }

  
})

       return {
    PORT:process.env.PORT  as string,
    DB_URL:process.env.DB_URL as string,
    NODE_ENV:process.env.NODE_ENV as string,
    JWT_ACCESS_SECRET:process.env.JWT_ACEESS_SECRET as string,
    JWT_ACCESS_EXPIRES:process.env.JWT_ACCESS_EXPIRES  as string


}




 }


