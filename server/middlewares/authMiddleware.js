import jwt from  'jsonwebtoken' ;


const authMiddleware = async(req,res,next) => {
    const token = req.cookies.token;
    if(!token)
        return res.status(401).json({
        success : false ,
        message : "Unauthorized user!",
});

try {
    const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next() ;
    } catch (e) {
        console.log(e);
        res.status(401).json({
            success : false ,
            message : "Unauthorized access",
        })
    }
}

export default authMiddleware ;