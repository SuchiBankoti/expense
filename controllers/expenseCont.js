const fs = require("fs");
const path = require("path");
const rootDir = path.dirname(require.main.filename);

const {
  getData,
  getDataById,
  postData,
  updateData,
  removeData,
} = require("../models/expenseModel");

const getHome = (req, res) => {
  const home = fs.readFileSync(
    path.join(rootDir, "views", "index.html"),
    "utf-8"
  );
  res.send(home);
};

const getAllExpenses = (req, res) => {
  getData(req, res);
};
const getExp = (req, res) => {
  const expId = req.params.id;
  getDataById(req, res, expId);
};
const postExpense = (req, res) => {
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  const obj = {
    amount,
    description,
    category,
  };
  postData(req, res, obj);
};
const editExp = (req, res) => {
  const expId = req.params.id;
  const updatedObj = req.body;
  updateData(req, res, updatedObj, expId);
};
const delExp = (req, res) => {
  const expId = req.params.id;
  removeData(req, res, expId);
};

module.exports = {
  getHome,
  getAllExpenses,
  postExpense,
  getExp,
  editExp,
  delExp,
};
