import jwt from "jsonwebtoken";
const generateToken = (res, userId) => {
  console.log(res)
  console.log(userId)
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    console.log(token)
    res.cookie("jwt_User",token,{
      httpOnly: false,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.log(error);
  }
};

export default generateToken;
