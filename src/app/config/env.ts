
import  dotenv from'dotenv' ;
dotenv.config()

interface IEnvVariable{
    PORT:string;
    DB_URL:string;
    NODE_ENV:string,
    JWT_ACCESS_SECRET:String;
    JWT_ACCESS_EXPIRES:string;
      JWT_REFRESH_SECRET:string;
     JWT_REFRESH_EXPIRES:string;
    SUPER_ADMIN_EMAIL:string;
    SUPER_ADMIN_PASSWORD:string;
    BCRYPT_SALT_ROUND:string;
   
}




   export const loadEnvVar=():IEnvVariable=>{

    const requiredEnvVar=['PORT','DB_URL','NODE_ENV','JWT_ACCESS_SECRET','JWT_ACCESS_EXPIRES','SUPER_ADMIN_EMAIL','SUPER_ADMIN_PASSWORD','BCRYPT_SALT_ROUND','JWT_REFRESH_SECRET','JWT_REFRESH_EXPIRES']

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
    JWT_ACCESS_SECRET:process.env. JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES:process.env.JWT_ACCESS_EXPIRES  as string,
    SUPER_ADMIN_EMAIL:process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD:process.env. SUPER_ADMIN_PASSWORD as string,
    BCRYPT_SALT_ROUND:process.env.BCRYPT_SALT_ROUND as string,
    JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET as string,
     JWT_REFRESH_EXPIRES:process.env.JWT_REFRESH_EXPIRES  as string

}




 }


