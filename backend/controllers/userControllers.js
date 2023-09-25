import asyncHnadler from 'express-async-handler'

const authUser =asyncHnadler(async (req,res)=>{
    res.status(200).json({message:"Auth user"})
});

export {
    authUser
}