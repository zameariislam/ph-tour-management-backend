import mongoose, { Schema } from "mongoose";
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface";

import bcrypt from 'bcrypt'


const authProviderSchema= new Schema<IAuthProvider>({
     provider:{ type:String,
        enum:['google','credential'],
        required:true
    },
     providerId:{type:String,required:true}
},
{
    _id:false,
    versionKey:false
}

)


const userSchema=new Schema< IUser>({
    name:{
        type:String,
        required:[true,'Please enter your name'],
        trim:true
    },
    email:{
        type:String,
          required:[true,'Please enter your emaill'],
          trim:true,
          unique:true,
          lowercase:true

    },
    password:{type:String},
    phone:{type:String},
    picture:{type:String},
    address:{type:String},
    isDeleted:{
        type:Boolean,
        default:false
    },

    isActive:{
        type:String,
        enum:Object.values(IsActive),
        default:IsActive.ACTIVE

    },
    isVerified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:Object.values(Role),
        default:Role.USER
    },
    auths:[authProviderSchema]
    

   
    },{
        timestamps:true,
        versionKey:false
    })



    userSchema.pre('save', async function(){
          console.log('form pre',this)

          this.password= await bcrypt.hash(this.password as string,10)
          

    })


  export  const User=  mongoose.model<IUser> ('User',userSchema)