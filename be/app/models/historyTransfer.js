const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('historyTransfer', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tokenId: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    addressFrom: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    addressTo: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'historyTransfer',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
