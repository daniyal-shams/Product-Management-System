import express from 'express' ;
import { loginUser, logout, registerUser } from '../../controllers/auth/authController.js' 
import authMiddleware from '../../middlewares/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser );
authRouter.post('/logout', logout );
authRouter.get('/check-auth', authMiddleware, (req, res) => {
    const user = req.user ;
    res.status(200).json({
        success : true,
        message : 'Authenticated user!',
        user
    });
});

// 

export default authRouter ; 