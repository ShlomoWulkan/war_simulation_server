import userModel from "../models/userModel";
import organizationsModel, { IOrganization} from "../models/organizationsModel";
import { LoginDTO, registerDTO } from "../dto/userDTO";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const userLogin = async (user: LoginDTO) => {
   try {
    const existUser = await userModel.findOne({username: user.username}).lean()
    if(!existUser) throw new Error("No user found")
    const isMatch = await bcrypt.compare(user.password, existUser.password)
    if(!isMatch) throw new Error("Password does not match")

   const token = await jwt.sign({
      user_id: existUser._id,
      username: existUser.username,
      organization: existUser.organization
   }, 
   process.env.JWT_SECRET!,
   {
      expiresIn: "10m"
   })

   return {...existUser, token, password: "*******"}

   } catch (err) {
    console.log(err);
    throw new Error("Could not login user")
   }
};

export const createNewUser = async (user: registerDTO) => {
   try {
    if(!user.username || !user.password) throw new Error("Missing username or password")
    const encPass = await bcrypt.hash(user.password, 10)
    user.password = encPass
    let orgToSearch = ""
    if (user.organization === "IDF"){
        orgToSearch = user.organization
        orgToSearch += ` - ${user.area}`
    } else {
        orgToSearch = user.organization
    }

    const org: any = await organizationsModel.findOne({name: orgToSearch}).lean()
    if(!org) throw new Error("Organization not found")
      
    user.resources = org.resources
   
    const newUser = new userModel(user)
    return await newUser.save()
   } catch (err) {
    console.log(err);
    throw new Error("Could not create user")
   }
};
