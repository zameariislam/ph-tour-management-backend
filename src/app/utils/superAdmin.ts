import { email } from "zod"
import { envVariable } from "../../server"
import { User } from "../modules/user/user.model"
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface"


export const seedSuperAdmin=async ()=>{


    
    try{

         const isSuperAdminExist=  await User.find({email:envVariable.SUPER_ADMIN_EMAIL})
        

    if(isSuperAdminExist.length){

        console.log('Super Admin already exist')

          return

    }
     console.log('Trying to create super admin')

    const authProvider:IAuthProvider={
        provider:'google',
        providerId:envVariable.SUPER_ADMIN_EMAIL
    }

    const payload:IUser={
        name:'Super Admin',
        email:envVariable.SUPER_ADMIN_EMAIL,
        role:Role.SUPER_ADMIN,
        auths:[authProvider],
        isVerified:true,
        password:envVariable.SUPER_ADMIN_PASSWORD
    }

    
        const superAdmin= await User.create(payload)


        console.log('Super admin created successfully !!')

        console.log(superAdmin)
      


    }catch(error){
        console.log(error)
        
    }


   



}