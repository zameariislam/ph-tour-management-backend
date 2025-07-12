import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";



export const router=Router()
 
 const moduleRoutes=[

    { path:'/user', route:UserRoutes}
 ]


 moduleRoutes.forEach((singleRoute)=>{
    router.use(singleRoute.path,singleRoute.route)
 })
 


