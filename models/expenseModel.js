const Expenses = require("../util/database");

const getData = (req, res) => {
  Expenses.findAll({
    attributes: ["id", "amount", "description", "category"],
  })
    .then((data) => {
      if (data.length === 0) {
        res.json([]);
      } else {
        const dataJson = data.map((apt) => apt.toJSON());
        res.json(dataJson);
      }
    })
    .catch((e) => console.log(e));
};

const getDataById = (req, res, id) => {
  Expenses.findOne({
    where: {
      id: id,
    },
  })
    .then((exp) => {
      if (exp) {
        const oneExp = exp.toJSON();
        res.json(oneExp);
      } else {
        console.log(`Appointment with ID ${id} not found.`);
      }
    })
    .catch((e) => console.log(e));
};

const postData = (req, res, obj) => {
  Expenses.create(obj)
    .then((exp) => {
      const oneExp = exp.toJSON();
      res.json(oneExp);
    })
    .catch((e) => console.log(e));
};

const updateData = (req, res, obj, id) => {
  Expenses.update(obj, {
    where: { id: id },
  })
    .then((data) => res.json(data))
    .catch((e) => console.log(e));
};
const removeData = (req, res, id) => {
  Expenses.destroy({
    where: {
      id: id,
    },
  })
    .then((data) => console.log("expense deleted"))
    .catch((e) => console.log(e));
};

module.exports = { getData, getDataById, postData, updateData, removeData };
