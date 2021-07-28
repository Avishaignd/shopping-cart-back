const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const mongoose = require("mongoose");
const User = require('../schemas/userSchema')

const login = async (req, res) => {
    const { token }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const { name, email } = ticket.getPayload();
    User.findOne({ username: email }, async function(err, user) {
        if (err) return console.error(err)
        else if (user) { res.status(201).json({ user: user }) }
        else {
            const user = new User({
                username: email,
                name: name,
                cart: [],
                isAdmin: false,
              })
            await user.save(function (err, user) {
                if (err) return console.error(err)
                else {
                    res.status(202).json({ user: user }) 
                }
            })
        }
    })
}

module.exports = { login }