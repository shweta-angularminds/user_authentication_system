import { log } from "console";
import { asyncHandler } from "../utils/aysncHandler.js";

const registerUser = asyncHandler(async(req,res)=>{
  
    res.status(200).json({
        message:"ok"
    })
})




export {registerUser}