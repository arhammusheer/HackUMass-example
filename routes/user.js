const express = require("express");
const router = express.Router();
const fs = require("fs");

// @route   GET /user
// @desc    Get all users
// @access  Public
router.get("/", (req, res) => {
  const name = req.query.name; // get the name from the query string
  let users = fs.readdirSync("./data/users"); // get all the users from the data folder

  if (name) {
    // if the name is not empty
    let userList = []; // create an empty array
    users.find((user) => {
      // find the user in the users array
      user.includes(name) ? userList.push(user.slice(0, -5)) : null; // if the user is found, push the name into the array
    });

    if (userList !== []) {
      // if the array is not empty
      return res.json({
        // return the array
        users: userList,
      });
    } else {
      return res.json({
        // if the array is empty, return an error
        error: "User not found",
      });
    }
  }
  users = users.map((users) => {
    return users.slice(0, -5); // slice the users to remove the .json extension
  });
  return res.json({ users }); // if the name is empty, return all the users
});

// @route   GET /user/:id
// @desc    Get a user
// @access  Public
router.get("/:name", (req, res) => {
  const name = req.params.name; // get the id from the params
  try {
    let user = fs.readFileSync(`./data/users/${name}.json`); // get the user from the data folder
    user = JSON.parse(user); // parse the user to JSON
    return res.json({ user }); // return the user
  } catch (error) {
    // if the user is not found
    return res.json({
      error: "User not found", // return an error
    });
  }
});

// @route   POST /user
// @desc    Create a user
// @access  Public
router.post("/", (req, res) => {
  const name = req.body.name; // get the name from the body
  const message = req.body.message; // get the message from the body

  if (name && message) {
    // if the name and message are not empty
    try {
      if (fs.existsSync(`./data/users/${name}.json`)) {
        // if the user already exists
        throw "User already exists";
      }
      fs.writeFileSync(
        `./data/users/${name}.json`,
        JSON.stringify({
          // write the user to the data folder
          name,
          message,
        })
      ); // write the message to the user file
      return res.json({
        // return a success message
        message: "User created",
        user: {
          name,
          message,
        },
      });
    } catch (error) {
      // if the user already exists
      return res.json({
        // return an error
        error: "User already exists",
      });
    }
  } else {
    // if the name or message is empty
    return res.json({
      // return an error
      error: "Please enter a name and message",
    });
  }
});

// @route   PATCH /user/:id
// @desc    Update a user
// @access  Public
router.patch("/:name", (req, res) => {
  const name = req.params.name; // get the id from the params
  const message = req.body.message; // get the message from the body

  if (name && message) {
    // if the name and message are not empty
    try {
      let user = fs.readFileSync(`./data/users/${name}.json`); // get the user from the data folder
      user = JSON.parse(user); // parse the user to JSON
      user.message = message; // update the message
      fs.writeFileSync(`./data/users/${name}.json`, JSON.stringify(user)); // write the user to the data folder
      return res.json({
        // return a success message
        message: "User updated",
        user: {
          name,
          message,
        },
      });
    } catch (error) {
      // if the user is not found
      return res.json({
        // return an error
        error: "User not found",
      });
    }
  } else {
    // if the name or message is empty
    return res.json({
      // return an error
      error: "Please enter a name and message",
    });
  }
});

// @route   DELETE /user/:id
// @desc    Delete a user
// @access  Public
router.delete("/:name", (req, res) => {
  const name = req.params.name; // get the id from the params

  if (name) {
    // if the name is not empty
    try {
      fs.unlinkSync(`./data/users/${name}.json`); // delete the user from the data folder
      return res.json({
        // return a success message
        message: "User deleted",
      });
    } catch (error) {
      // if the user is not found
      return res.json({
        // return an error
        error: "User not found",
      });
    }
  } else {
    // if the name is empty
    return res.json({
      // return an error
      error: "Please enter a name",
    });
  }
});

module.exports = router;
