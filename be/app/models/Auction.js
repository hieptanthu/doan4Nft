const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Auction', {
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
      allowNull: true,
      references: {
        model: 'User',
        key: 'idUser'
      }
    },
    startingPrice: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    highestBid: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    highestBidder: {
      type: DataTypes.CHAR(250),
      allowNull: true
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Auction',
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
        name: "Auction_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "seller" },
        ]
      },
    ]
  });
};
