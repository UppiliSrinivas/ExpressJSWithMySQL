const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const env = require("dotenv").config();

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: process.env.USER_TB,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    }
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: process.env.POST_TB,
  }
);
// Export the User model
module.exports = Post;
