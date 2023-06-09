import userService from "../services/userService"
let handleLogin = async (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password ){
        return res.status(500).json({
            errCode: 1,
            message: "Missing input parameter!"
        })
    }
    let userData =  await userService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUsers = async (req, res)=>{
    let id = req.query.id;
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users
    })
}
let handleCreateNewUser= async(req,res) => {
    let message=await userService.creatNewUser(req.body)
}
module.exports = {
    handleLogin:handleLogin,
    handleGetAllUsers:handleGetAllUsers,
    handleCreateNewUser:handleCreateNewUser

}