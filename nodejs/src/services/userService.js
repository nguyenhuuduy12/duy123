import db from "../models/index";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }


    })
}
let handleUserLogin = (email, password)=>{
    return new Promise(async(resole, reject)=>{
        try{
            let userData= {};
            let isExit = await checkUserEmail(email);
            if(isExit){
                let user = await db.User.findOne({
                    attributes:['email', 'password', "roleId"],
                    where: {email : email},
                    raw: true
                    
                });
                if(user){
                    let check = await bcrypt.compareSync(password, user.password); // false
                    if(check){
                        userData.errCode= 0;
                        userData.errMessage="ok";
                        delete user.password;
                        userData.user= user
                    }else{
                        userData.errCode= 3;
                        userData.errMessage="Wrong password";
                    }
                }else{
                    userData.errCode = 2
                    userData.errMessage = `user's not found`
                }
            }else{
                userData.errCode= 1
                userData.errMessage = `Your's email isn't exit in system. Plz try other email`
                

            }
            resole(userData)
        }catch(e){
            reject(e)
        }
    })
}
let checkUserEmail = (userEmail)=>{
    return new Promise( async(resole, reject)=>{
        try{
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if (user){
                resole(true)
            }else{
                resole(false)
            }
        }catch(e){
            reject(e)
        }
    })
}
let getAllUsers = (userId)=>{
    return new Promise(async(resole,reject)=>{
        try{
            let users= ''
            if(userId=== 'ALL'){
                users = await db.User.findAll({
                    attributes:{
                        exclude: ['password']
                    }

                })
            }if( userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes:{
                        exclude: ['password']
                    }
                })
            }
            resole(users)
        }catch(e){
            reject(e)
        }
    })
}
let creatNewUser=()=>{
    return new Promise(async(resole, reject)=>{
        try{
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.firstName,
                password: hashPasswordFromBcrypt,
                lastName: data.lastName,
                email: data.email,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber,
            })
            resolve({
                errCode:0,
                message:'oke'
            })
        }catch(e){
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin:handleUserLogin,
    getAllUsers:getAllUsers,
    creatNewUser:creatNewUser
}