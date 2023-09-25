const notFount = (req,res,next)=>{
    const error = new Error(`Not Found - ${req.originalURL}`);
    res.status(404);
    next(error);
}

