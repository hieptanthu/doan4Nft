const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    idUser: {
      type: DataTypes.STRING(250),
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(450),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(450),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'User',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUser" },
        ]
      },
    ]
  });
};
