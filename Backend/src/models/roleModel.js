const { Sequelize, DataTypes } = require("sequelize");
const database = require("../configs/database");

const roleModel = database.define(
  "t_role",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    hooks: {
      afterSync: async (options) => {
        const roles = await roleModel.findAll();
        if (roles.length === 0) {
          await roleModel.bulkCreate([
            { name: "Super Admin" },
            { name: "Admin" },
            { name: "User" }
          ]);
        }
      }
    }
  }
);

module.exports = roleModel;
