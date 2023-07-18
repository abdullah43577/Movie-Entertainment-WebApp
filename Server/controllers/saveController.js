const { response } = require("express")
const knex = require("../knex-db/knex")




exports.newBookmark = async (req, res) => {
    const { email, movie_id, movie_name, movie_url, movie_desc } = req.body
    
    try {
        const response = await knex("Bookmarks")
        .insert({ email, movie_id, movie_name, movie_url, movie_desc })
        res.send(response)
    } 
    catch (error) {
        res.status(500).send({message: "An internal error occured", err: error})
        console.log(error)
    }
}

exports.getBookmarks = async (req, res) => {
    const { email } = req.body

    try {
        const response = await knex("Bookmarks").where({ email })
        if(response = "" || !response) {
            res
            .status(404)
            .send({message: "Email found"})
        }
        else{
            let data = response
            console.log(data)
            res
            .status(200)
            .send({message: "Bookmarks retrieved successfully", data})
        }
    } 
    catch (error) {
        console.log(error)
        res
        .status(500)
        .send({message: "An internal error occured", error})
    }
}

exports.getBookmarkId = async (req, res) => {
    const id = req.params.id;

    try {
      let response = await knex ('Bookmarks').where ({id: id});
      // console.log (response);
      // res.send(response)
      if (response == '') {
        res.status (404).json ({
          status: 'Not found',
          message: "There's no bookmark with this id",
        });
        console.log ("There's no bookmark with this id");
      } else {
        res.status (200).json ({
          status: 'Success',
          message: 'Retrieved Bookmark successfully',
          response,
        });
        console.log (response);
      }
    } catch (err) {
      console.log (err);
      res
      .status (500)
      .json ({status: 'Sever Error', message: "Internal server error", err});
    }
}


exports.deleteBookmark = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.send ({message: "Thers's no bookmark "});
    } 
    else {
        try {
        let response = knex ('Bookmarks').where ({ id }).delete ();
        console.log (response);
        if (response == '') {
            res
            .status (404)
            .json ({
                status: 'Not found',
                message: "There's no id for this bookmark",
            });
        } else {
            res
            .status (200)
            .json ({
                status: 'Success',
                message: 'Bookmark removed succesfully',
                response,
            });
            console.log (response);
        }
        } catch (error) {
        console.log(error)
        res
        .status(500)
        .json({status: " Server Error", message: "Internal server error", error})
        }
    }
}