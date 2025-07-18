import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";



export const router=Router()
 
 const moduleRoutes=[

    { path:'/user', route:UserRoutes},
      { path:'/auth', route:AuthRoutes},
     
 ]


 moduleRoutes.forEach((singleRoute)=>{
    router.use(singleRoute.path,singleRoute.route)
 })
 


