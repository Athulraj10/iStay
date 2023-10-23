import jwt from "jsonwebtoken";
const generateTokenSeller = (res, sellerId) => {
  const token = jwt.sign({ sellerId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt_Seller", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
export default generateTokenSeller;
