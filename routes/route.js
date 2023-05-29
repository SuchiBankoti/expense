const express = require("express");
const route = express.Router();
const {
  getHome,
  getAllExpenses,
  postExpense,
  getExp,
  editExp,
  delExp,
} = require("../controllers/expenseCont");

route.get("/", getHome);
route.get("/expenses", getAllExpenses);
route.post("/expenses", postExpense);
route.get("/expenses/:id", getExp);
route.put("/expenses/:id", editExp);
route.delete("/expenses/:id", delExp);
module.exports = route;
