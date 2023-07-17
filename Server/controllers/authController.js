const express = require("express")
const bcrypt = require("bcrypt")
const app = express ();
const knex = require("../knex-db/knex")
const saltRounds = 10;
const { createToken, maxAge } = require("../utls/createToken")


//Registering merchant
exports.register = async (req, res) => {
    bcrypt.hash (req.body.password, saltRounds, async (err, hash) => {
      const {firstname, lastname, email, username} = req.body;
      const password = hash;
    //   let emailCheck = await knex ('Merchants').where ({email}).first ();
      // let emailCheck = await knex("").where({email: email})
      if (firstname == '') {
        res.send ({message: 'Firstname field must not be empty'});
      } else if (firstname.length < 4) {
        res.send ({message: 'Firname, a minimum of 4 chracters'});
      } else if (lastname == '') {
        res.send ({message: 'Lastname field must not be empty'});
      } else if (lastname.length <= 4) {
        res.send ({message: 'Lastname, a minimum of 4 chracters'});
      } else if (username == '') {
        res.send ({message: 'Username field must not be empty'});
      } else if (username.length < 2) {
        res.send ({message: 'Username field must have a minimum of 2 characters'});
      } else if (email == '') {
        res.send ({meesage: 'Email field must not be empty'});
      } else if (password == '') {
        res.send ({message: 'Password field must not be empty'});
      } else if (password.length <= 4) {
        res.send ({message: 'A mininmum of 8 chracters is required'});
      } else {
        try {
          let user = await knex ('Users').insert ({
            email,
            firstname,
            lastname,
            password,
            username
            // token,
          });
          const token = createToken (user.id);
  
          // else{
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
  
  //To Login a Merchant
exports.login = async (req, res) => {
    const {email, password} = req.body;
  
    try {
      let user = await knex ('Users').where ({email}).first ();
  
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


// To update user info
exports.update = async (req, res) => {
    const { image, email } = req.body
  
    try {
      let user = await knex("Users")
        .where({email: email})
        // .first()
        
        if (!user || user === "") {
          res.status(404).send({ message: "Can't update, user not found" });
          console.log("Can't update, user not found");
        } else {
          await knex("Users")
            .where({ email: email })
            .update({ profile_img: image });
        
          res.status(200).send({ message: "Updated successfully", status: "success", user })
          console.log(user)
        }
        
    } 
    catch (error) {
      res
      .status(500)
      .send({message: "Internal Server error", err: error.message})
      console.log("There was a server error")
      console.log(error.message)
    }
}
  // To Reset Merchant's Password
exports.passwordForgot = async (req, res) => {
    const email = req.body.email;
  
    try {
      let user = await knex ('Merchants').where ({email: email}).first ();
  
      if (user) {
        res.json ({status: 'Success', message: 'Email was found', data: user});
      } else {
        res.json ({status: 'Failed', message: 'Email was not found'});
      }
    } catch (error) {
      console.log (error);
      res.json ({status: 'Error', message: 'There was an an error', err: error});
    }
};
  
  // To Update Merchant's Password
exports.passwordReset = async (req, res) => {
    bcrypt.hash (req.body.password, saltRounds, async (err, hash) => {
      const password = hash;
      const email = req.body.email;
  
      try {
        let user = await knex ('Merchants')
          .where ({email: email})
          .first ()
          .update ({password: password});
  
        if (user) {
          res.send ({
            status: 'Success',
            message: 'Email found and password updated successfully',
          });
        } else if (user == '') {
          res.send ({
            status: 'failed',
            message: "Email found but password can't be empty",
          });
        } else {
          res.send ({
            status: 'Failed',
            message: 'Email not found and password was not updated',
          });
        }
      } catch (error) {
        console.log (error);
        res.send ({status: 'Error', message: 'An error occured'});
      }
    });
};