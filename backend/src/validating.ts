import jwt from 'jsonwebtoken';


require('dotenv').config();
export async function validating(req : any , res : any){
    const secret_key : any = process.env.JWT_SECRET ; 
    const {authtoken} = req.body ; 
    try {
        const result = jwt.verify(authtoken , secret_key) ;
        res.status(200).json({
            msg : "Valid Auth"
        })
    }
    catch(err) {
        res.status(404).json({
            msg : "Not A Valid Auth" 
        })
    }
}

