const { Sequelize, DataTypes } = require("sequelize");
const database = require("../configs/database");

const roleModel = require("./roleModel");

const userModel = database.define(
  "t_user",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    hooks: {
      afterSync: async (options) => {
        const users = await userModel.findAll();
        if (users.length === 0) {
          // Dapatkan ID role dari roleModel berdasarkan nama role
          const role = await roleModel.findOne({
            where: { name: "Super Admin" }
          });
          if (role) {
            await userModel.bulkCreate([
              {
                username: "admin",
                password: bcrypt.hashSync("admin", 10),
                roleId: role.id // Gunakan ID dari role yang ditemukan
              }
            ]);
          }
        }
      }
    }
  }
);

// Relasi
userModel.belongsTo(roleModel, { foreignKey: "roleId", as: "role" });
roleModel.hasMany(userModel, { foreignKey: "roleId", as: "users" }); // Perhatikan 'as' harus konsisten

module.exports = userModel;
