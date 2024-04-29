const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./models");
const userController = require("./controllers/userController");

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/addUser", userController.addUser);
app.get("/users", userController.getUsers);
app.get("/user/:id", userController.getUser);
app.post("/users", userController.postUsers);
app.delete("/user/:id", userController.deleteUser);
app.patch("/user/:id", userController.updateUser);

app.get("/query1", userController.queryUser1);
app.get("/query2", userController.queryUser2);
app.get("/query3", userController.queryUser3);
app.get("/query4", userController.queryUser4);
app.get("/query5", userController.queryUser5);

app.get("/finder", userController.finderUser);
app.get("/get-set-virtual", userController.getSetVirtualUser);
app.get("/validate", userController.validateUser);
app.get("/raw-queries1", userController.rawQueriesUser1);
app.get("/raw-queries2", userController.rawQueriesUser2);

app.get("/one-to-one1", userController.oneToOneUser1)
app.get("/one-to-one2", userController.oneToOneUser2)

app.get("/one-to-many", userController.oneToManyUser)

app.get("/many-to-many1", userController.manyToManyUser1)
app.get("/many-to-many2", userController.manyToManyUser2)

app.get("/transactions1", userController.transactionsUser1)
app.get("/transactions2", userController.transactionsUser2)



app.listen(3000, () => {
  console.log("App Running On 3000 Port");
});
