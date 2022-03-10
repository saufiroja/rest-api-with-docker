const { Model, DataTypes } = require('sequelize');

const sequelize = require('../../utils/sequelize');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Post',
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = { Post };
