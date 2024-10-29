const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MarketItem', {
    tokenId: {
      type: DataTypes.STRING(250),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'myNFT',
        key: 'tokenId'
      }
    },
    seller: {
      type: DataTypes.STRING(250),
      allowNull: false,
      references: {
        model: 'User',
        key: 'idUser'
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'MarketItem',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tokenId" },
        ]
      },
      {
        name: "MarketItem_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "seller" },
        ]
      },
    ]
  });
};
