let express = require('express');
let app = express();

let bodyParser = require('body-parser');

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}))

// Logger middleware
app.use((req,res,next) => {
  console.log(`${req.method} ${req.path} -  ${req.ip}`);
  next();
})

// Homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
})

// JSON endpoint
app.get("/json", (req, res) => { 
  if (process.env["MESSAGE_STYLE"] == "uppercase"){
    res.json({"message": "HELLO JSON"})
  } else {
    res.json({"message": "Hello json"})
  }
})

// Time middleware
app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({"time": req.time});
})

// Route params
app.get("/:word/echo", (req, res) => {
  res.json({echo: req.params.word});
})

// Query string
app.get("/name", (req, res) => {
  res.json({name: req.query.first + " " + req.query.last});
})

// POST request
app.post("/name", (req, res) => {
  const firstName = req.body.first;
  const lastName = req.body.last;

  res.json({
    name: firstName + " " + lastName
  });
});

module.exports = app;
