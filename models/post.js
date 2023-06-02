const sequelize = require("sequelize");
const db = require("../util/database");

const Post = db.define("post", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: sequelize.STRING,
  completed: sequelize.BOOLEAN,
});

module.exports = Post;
