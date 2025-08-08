import { User } from "./database";

export async function user_details_getting (req : any , res : any, next : any){
    const {name , email } = req.body ;
    try { 
    const result = await User.findOne({
        name : name , 
        email : email
    }) ;

     if(result === null) {
        res.status(200).json({
            msg : "No Such Type of the User is Not present"
        })
     }
     else {
        const data : any = result.contest_information ; 
        res.status(200).json({
            name : name , 
            email : email , 
            contest : data 
        })
     }
} 
catch(error){
    res.status(404).json({
        err : error
    })
}

}