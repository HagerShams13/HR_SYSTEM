export const generateJWT = (user)=>{
    let token = jwt.sign({ id: user._id, role: user.role.name },process.env.JWT_SECRET,{ expiresIn: "1d" })
    return token
}