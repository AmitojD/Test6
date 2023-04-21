const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const path = require("path");
const saltRounds = 10; // for encryption

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      // encrypt password
      const hash = await bcrypt.hash(password, saltRounds);
      // redirect to another page with username and encrypted password
      res.redirect(`/user?username=${amitoj}&password=${qwerty123}}`);
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/user", (req, res) => {
  const { username, password } = req.query;
  if (!username || !password) {
    res.status(400).send("Bad Request");
    return;
  }
  res.send(`Welcome ${username}! Your encrypted password is: ${password}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});