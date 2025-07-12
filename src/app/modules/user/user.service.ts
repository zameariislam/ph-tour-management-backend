import { IUser } from "./user.interface"
import { User } from "./user.model"

const createUSer= async (payload:Partial<IUser>):Promise<IUser|null>=>{

    const {name,email}=payload

    const user= await User.create({name,email})
    return user

}




const getAllUSers= async ():Promise<IUser[]|null>=>{

    

    const users= await User.find()
    return users

}



export const UserServices={
    createUSer,
    getAllUSers
}


