const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken") ;

const User = require("../models/user");
const { request } = require("http");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "superkingsuniverse1@gmail.com",
        pass: "xnnlixaxjkikxbeb"
    }
});

exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
        pageTitle : "Login",
        path : "/login",
        errorMessage : req.flash("error"),
});
};

exports.getSignup = (req, res, next) =>{
    res.render("auth/signup", {
        pageTitle : "Sign Up",
        path : "/signup",
        errorMessage: req.flash("error"),
    });
};

exports.postSignup = async (req, res, next) =>{
    const {name, email, password} = req.body ;
    console.log(name, email, password);
    //const errors = validationResult(req);

   

    //1) check if the user already exists or not
    const user = await User.findOne({ email : email });
    // console.log(user);

    if(user){
        return res.status(409).json({ message : "User Already exists!" });
    }
    //2) Encrypt the password of the user
    let hashedPassword;
    try{
         hashedPassword = await bcrypt.hash(password, 12);
    } catch (err){
        return res.status(500).json({ message : err.message });
    }
   
    //3) Store the email and password in the database
    try {
        const users = await User.find();

        if(users.length == 0){
            const user = await User.create({
                name : name,
                email : email,
                password: hashedPassword,
                role: 'admin',
            });
        } else {
            const user = await User.create({
            name : name,
            email : email, 
            password: hashedPassword,
            role: 'customer',
         });
        }
    } catch(err){
        return res.status(500).json({ message : err.message });
    }

    return res.status(200).json({ message : "Account created sucessfully" });


    //4) Send the email to the user on successful login
    // try{
    //     const mailSent = await transporter.sendMail({
    //         from: "superkingsuniverse1@gmail.con",
    //         to: email,
    //         subject: "Signup Successfully",
    //         html: "<h1>You have successfully Signed Up</h1>",
    //     });
    //     if(mailSent){
    //         res.redirect("/login");
    //     }
    // } catch (err) {
    //     console.log("unable to send email", err);
    //     return next(err);
    // }

};

// 1:23:00  -->  video 1:53:30
// xnnlixaxjkikxbeb

exports.getReset = (req, res, next) => {
    res.render("auth/reset", {
        pageTitle: "Reset Password",
        path: "/login",
        errorMessage: req.flash("error"),
    });
};

exports.postReset = async (req, res, next) => {
    console.log("user") ;
    const email = req.body.email ;
    console.log(email);
    //1) Whether the email exists or not
    let user = await  User.findOne({ email: email });
    // console.log(user.email) ;
    if(!user){
        req.flash("error", "You don't have any account");
        return res.redirect("/reset");
    }
    //2) Generate a random token
    crypto.randomBytes(32, (err, buffer)=>{
        if(err){
            console.log(err);
            return;
        }
    const token = buffer.toString("hex");
    //3) Set the token and expiration in user instance
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;
    user
    .save()
    .then(() => {
        //4) Send mail to the user along with token
        return transporter.sendMail({
            from: "superkingsuniverse1@gmail.con",
            to: email,
            subject: "Reset Password",
            html: `<h1>Click on the link below to reset your password</h1>
            <a href="http://localhost:3000/reset/${token}">Reset Password</a>`,
        });
    }) 
    .then(() => {
        res.redirect("/reset");
    })
    .catch((err) => console.log(err));
});
};

exports.getNewPassword = async (req, res, next) => {

    const token = req.params.token ;
    const user = await User.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
    });

    if(!user){
        req.flash('error','Session Timeout');
        return res.redirect("/reset");
    }
    console.log(user._id.toString());

    res.render("auth/new-password", {
        pageTitle: "Update Password",
        path: "/login",
        token: token,
        userId: user._id,
        errorMessage: req.flash("error"),
    });
}

exports.postNewPassword = async (req, res, next) => {
    const {password, token, userId} = req.body ;
    const user = await User.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
    });
    if(!user){
        req.flash("error", "Session Timeout");
        return res.redirect("/reset");
    }
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    }catch(err){
        console.log("unable to encrypt password");
        return next(err);
    }

    try {
        await User.findByIdAndUpdate(userId, {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiration: null,
        });
        res.redirect("/login");
    } catch(err) {
        console.log("unable to update password");
        return next(err);
    }
}

// 1:53:34 dubara dekh 5 bgy


exports.postLogin = async (req, res, next) => {
    const {email, password} = req.body ;
    console.log(email, password);
    //1) check if the user already exists or not

   const user = await User.findOne({ email: email});
//    console.log(user);
   if(!user){
        return res.status(401).json({ message : "Invalid email or password" });
   }

   //2) Check if the password is correct or not
   try {
    const doMatches = await bcrypt.compare(password, user.password);
    if(doMatches){
        //Creating JWT
       const token = jwt.sign(
        { userId : user._id, role : user.role},
         process.env.JWT_KEY,
         {
             expiresIn : Date.now() + 3600000, 
         });
         res.status(200).json({token : token, role : user.role});
    } else {
    return res.status(401).json({ message : "Invalid email or password" });
    }
   }catch(e){
    return res.status(500).json({ message : err.message });
   }
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
            res.redirect("/login");
        });
}

//34:00