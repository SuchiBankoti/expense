const Sequelize = require("sequelize");

const sequelize = new Sequelize("new_schema", "root", "s_qs@ym_i#22", {
  host: "localhost",
  dialect: "mysql",
});

const Expenses = sequelize.define("expenses", {
  amount: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => console.log("expenses table created successfully."))
  .catch((error) => console.log(`Error creating expenses table: ${error}`));

// Expenses.create({ amount: 400, description: "shopping", category: "main" })
//   .then((data) => console.log(data.dataValues))
//   .catch((e) => console.log(e));

module.exports = Expenses;
