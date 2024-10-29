const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment', {
    TokenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    addressUser: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    value: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'comment',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TokenId" },
        ]
      },
    ]
  });
};
