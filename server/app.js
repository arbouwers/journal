require("dotenv").config();
let express = require('express');
let app = express();
const sequelize = require("./db");

let journal = require("./controllers/journalController")
let user = require("./controllers/userController")

sequelize.sync();

app.use(require('./middleware/headers'))

app.use(express.json());

// app.use("/test", function(req, res) {
//   res.send("This is a message from the test endpoint on the server.")
// })

// app.use("/amanda", function(req, res) {
//   res.send("My name is Amanda and I am 25 years old.")
// })

app.use("/journal", journal)
app.use("/user", user)


app.listen(3000, function() {
  console.log("App is listening on port 3000")
});