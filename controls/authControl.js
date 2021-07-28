const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const User = require('../schemas/userSchema')

const login = async (req, res) => {
    // Getting the access token from the client-side Google login to verify it
    const { token }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const { name, email } = ticket.getPayload();
    // If the user already exists in the DB the data is sent as a response
    User.findOne({ username: email }, async function(err, user) {
        if (err) return console.error(err)
        else if (user) { res.status(201).json({ user: user }) }
        // If the user doesn't exist in the DB, it will be created with the data received from the Google login
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