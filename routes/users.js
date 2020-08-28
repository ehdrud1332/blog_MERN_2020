const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userModel = require('../models/users');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY)

// SIGN UP
// @route POST http://localhost:5000/users/signup
// @desc user SignUp / send email
// @access Public
router.post('/signup', (req, res) => {

    const {name, email, password} = req.body;

    userModel
        .findOne({email})
        .then(user => {
            if(user) {
                return res.status(400).json({
                    errors: "Email is taken"
                })
            } else {
                const payload = {name, email, password};
                const token = jwt.sign(
                    payload,
                    process.env.JWT_ACCOUNT_ACTIVATION,
                    {expiresIn: "20m"}
                )

                const emailData = {
                    from: process.env.EMAIL_FROM,
                    to: email,
                    subject: "Account activation link",
                    html: `
                        <h1>Please use the following to activate your account</h1>
                        <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                        <hr />
                        <p>This email may containe sensetive information</p>
                        <p>${process.env.CLIENT_URL}</p>
                    `
                }

                sgMail
                    .send(emailData)
                    .then(() => {
                        res.status(200).json({
                            message: `Email has been sen to ${email}`
                        })
                    })
                    .catch(err => {
                        res.status(404).json({
                            errors: err
                        })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        })


});

// LOGIN
// @route POST http://localhost:5000/users/signup
// @desc user login / return jwt
// @access Public
router.post('/login', (req, res) => {

});

module.exports = router;




