const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('myNFT', {
    tokenId: {
      type: DataTypes.STRING(250),
      allowNull: false,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Category',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(450),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(450),
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING(250),
      allowNull: false,
      references: {
        model: 'User',
        key: 'idUser'
      }
    },
    show: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(600),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'myNFT',
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
        name: "category_id",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
      {
        name: "myNFT_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "owner" },
        ]
      },
    ]
  });
};
