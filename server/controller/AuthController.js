import User from "../models/User";
import bcrypt from "bcrypt";

class AuthController {

    static register = async (req, res) => {
        try {

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                userName: req.body.userName,
                email: req.body.email,
                password: hashPassword
            });

            const user = await newUser.save();
            res.status(200).json(user)

        } catch (error) {
            res.status(500).json(error)

        }

    };

    static login = async (req, res) => {
        
        try {

            const user=await User.findOne({userName:req.body.userName});
            !user &&  res.status(400).json("wrong credentionals!");
            const validatePassword = await  bcrypt.compare(req.body.password,user.password);
            !validatePassword && res.status(400).json("invalid paassword!");
           const{password,...others}=user
            res.status(200).json(others)


        } catch (error) {

            res.status(500).json(error)

        }


    };

};

export default AuthController