const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/test", (req, res) => {
  res.status(200).send({
    code: "0001",
    action: "/test",
    msg: "測試",
    data: null,
  });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const { account, password } = req.body;

  if (account === "jacky" && password === "jacky777") {
    res.status(200).send({
      code: "0001",
      action: "/login",
      msg: "成功",
      data: null,
    });
  }

  res.status(200).send({
    code: "0002",
    action: "/login",
    msg: "帳號密碼有誤",
    data: null,
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
