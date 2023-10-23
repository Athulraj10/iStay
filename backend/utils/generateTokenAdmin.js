import jwt from "jsonwebtoken";
const generateTokenAdmin = (res,admin_id)=>{
    const token = jwt.sign({admin_id},process.env.JWT_SECRET,{
        expiresIn:'14d'
    });

    res.cookie('jwt_Admin', token ,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite : 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })
}
export default generateTokenAdmin;