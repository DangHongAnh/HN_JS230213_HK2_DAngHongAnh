const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/api/v1/users", (req, res) => {
  try {
    let users = JSON.parse(fs.readFileSync("./data/players.json"));
    res.json({
      user: users,
      status: "success",
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

app.post("/api/v1/users", (req, res) => {
  let { username1, username2, username3, username4 } = req.body;
  let user = {
    id: Math.floor(Math.random() * 1000000000000000),
    username1,
    username2,
    username3,
    username4,
  };

  try {
    let players = JSON.parse(fs.readFileSync("./data/players.json"));
    players.push(user);
    fs.writeFileSync("./data/players.json", JSON.stringify(players));
    res.json({
      message: "Create player successfully",
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/public/homepage.html`);
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
