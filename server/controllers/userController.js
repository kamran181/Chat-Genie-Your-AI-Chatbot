import User from "../models/User.js";
import bcrypt from'bcryptjs';


export const postSignup = async (req,res)=>{
    const {username , email, password} = req.body;
    try {
        if(!username || !email || !password){
            res.status(404).json({error : 'Fill all fields'});
            
        }
        const existingEmail = await User.findOne({email :email});
        if(existingEmail){
            res.status(401).json({error : 'email already exists'});
           
        }
        const hashedPassword = await bcrypt.hash(password ,12);
        const user = new User({
            username,
            email,
            password : hashedPassword
        });

        await user.save();
        res.status(200).json({message : 'created'}) ;
    } catch (error) {
        console.log(error);
    }

}

export const postLogin = async (req, res) => {
    
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(404).json({error :'Fill all fields'});
            
        }
    
        const user = await User.findOne({ email: email });
        
    
        if (!user) {
            res.status(404).json({error:'invalid Credientials'});
             
        }
    
        
        if(user){
            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (!isCorrectPassword) {
                res.status(401).json({error:'Incorrect Username and/or Password'});
                
                }
                else{
                 
                   res.status(200).json({message : 'loggedIn successfully'})
                }
               
              
            }    
    }
    
    catch (error) {
        console.log(error);
    }

}