const express = require("express");
const router = express.Router();
const fs = require("fs");

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

module.exports = router;
