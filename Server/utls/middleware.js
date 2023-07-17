const jwt = require("jsonwebtoken")
const knex = require("../knex-db/knex")

// MERN Authentication -- Net Ninja
const requireAuth = async(req, res, next) => {

    // verifying authentication
    const { authorization } = req.headers

    if(!authorization) {
        console.log("Authorization token required")
        return res.status(401).json({error: "Authorization token required"})
    }

    const token = authorization.split(' ')[1]

    try{
     const { id } = jwt.verify(token, process.env.SECRET)
     req.user = await knex("User").where({ id })
     console.log(id)
     next()
    }
    catch (error) {
        // console.log(error)
        console.log("Request is not authorized")
        res.status(401).json({error: "Request is not authorized"})
    }
}

module.exports = requireAuth;