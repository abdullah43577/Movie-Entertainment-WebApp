const knex = require("../knex-db/knex")
const bcrypt = require("bcrypt")
const saltRounds = 10;
const { createToken, maxAge } = require("../utls/createToken")

// To register an Admin
exports.register = async (req, res) => {
    bcrypt.hash (req.body.password, saltRounds, async (err, hash) => {
      const {firstname, lastname, email} = req.body;
      const password = hash;
      if (firstname == '') {
        res.send ({message: 'Firstname field must not be empty'});
      } else if (firstname.length < 4) {
        res.send ({message: 'Firname, a minimum of 4 chracters'});
      } else if (lastname == '') {
        res.send ({message: 'Lastname field must not be empty'});
      } else if (lastname.length <= 4) {
        res.send ({message: 'Lastname, a minimum of 4 chracters'});
      } else if (email == '') {
        res.send ({meesage: 'Email field must not be empty'});
      } else if (password == '') {
        res.send ({message: 'Password field must not be empty'});
      } else if (password.length <= 4) {
        res.send ({message: 'A mininmum of 8 chracters is required'});
      } else {
        try {
          let user = await knex ('Admin').insert ({
            email,
            firstname,
            lastname,
            password,
          });
          const token = createToken (user.id);
  
          res.cookie ('jwt', token, {
            httpOnly: true,
            withCredentials: true,
            maxAge: maxAge * 1000,
          });
          
          res.status (200).json ({
            success: true,
            message: 'Registration was successful',
            status: 'success',
            User: user,
            token,
          });
          console.log (user);
        } 
        catch (error) {
          console.log (error);
          res
            .status (500)
            .json ({status: 'Server Error', message: 'There was a server error', error});
        }
      }
    });
};

// To login an Admin
exports.login = async (req, res) => {
    const {email, password} = req.body;
  
    try {
      let user = await knex ('Admin').where ({email}).first ();
  
      if (!user) {
        res.status (401).json ({message: 'Wrong email or passsword, try again'});
      } else {
        let hashedPassword = user.password;
        let isValid = await bcrypt.compare (password, hashedPassword);
        const token = createToken (user.id);
        if (!isValid) {
          res.status (401).json ({message: 'Wrong email or password, try again'});
        } else {
          // res.cookie("test", true)
          res.cookie ('jwts', token, {
            httpOnly: true,
            withCredentials: true,
            maxAge: maxAge * 1000,
          });
          console.log ({user: user, token});
          // console.log(user.id)
          res.status (200).json ({
            status: 'success',
            data: user,
            message: 'Logged in successfully',
            token,
          });
        }
      }
    } catch (error) {
      console.log (error);
      res.status(500).send({message: "Server error", error})
    }
};

// To edit info/details in a User
exports.deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const response = await knex("User").where({ id }).delete()
        res.send(response)
        console.log(response)
    } 
    catch (error) {
        console.log({err: error.message})
        res
        .status(500)
        .send({message: 'Internal server error', err: error})
    }
}



exports.getUsers = async (req, res) => {
    try {
        let data = await knex.select().from("Users")
        
        res.send({message: "Retrieved users succesfully", data})
        console.log(data)
    } 
    catch (error) {
        console.log(error)
        res
        .status(500)
        .send({message: "Internal server error", error})
    }
}


exports.getBookmarks = async (req, res) => {
    try {
        let response = await knex.select().from("Bookmarks")
        res.send(response)
        console.log(response)
    } 
    catch (error) {
        console.log(error)
        res
        .status(500)
        .send({message: "Internal server error", error})
    }
}