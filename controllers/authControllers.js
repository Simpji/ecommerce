const User = require('../models/user');
const bcrypt = require('bcryptjs')
const dotenv = require("dotenv")
const email = require("../config/email")
const { validateUser } = require("../validators");



exports.register = async (req, res) => {
    const { firstName, lastName, password, confirmPassword, phone, email, role } = req.body;

    if (password !== confirmPassword) {
            return res.status(400).json({ message: "password do not match"})
        }

        let { error } =  validateUser(req.body)
        if (error){
            return res.status(400).json({ message: error.details[0].message})
        }

    try {
        let user = await User.findOne({ email })
        if(user){
            return res.status(400).json({ message: "user already exist!...." })
        }

         user = new User({ firstName, lastName, password, confirmPassword, phone, email, role });
         const salt = await bcrypt.genSalt(10)
         user.password = await bcrypt.hash(user.password, salt);
        await user.save()
        res.json(user)


        // const info = await transporter.sendMail({
        //     from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        //     to: "bar@example.com, baz@example.com", // list of receivers
        //     subject: "Hello ✔", // Subject line
        //     text: "Hello world?", // plain text body
        //     html: "<b>Hello world?</b>", // html body
        // });

        // const token = user.generateAuthToken () 
        // res.header("auth-token", token).json(user)


    } catch (error) {
       console.log({message: error.message}); 
       return res.status(500).json({ message: "Server error, something went wrong!..."})
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
    if(!user) {
        return res.status(400).json({ message: "Invalid username" })
    }

    const validatePassword = await bcrypt.compare(password, user.password)
    if (!validatePassword) {
        return res.status(400).json({message: "Invalid password" });
    }

    const token = user.generateAuthToken()
    res.header("auth-token", token).json({ token })

    } catch (error) {
        console.log({ message: error.message });
        return res.status(500).json({message: "server error, something went wrong!..."})
    }
}
