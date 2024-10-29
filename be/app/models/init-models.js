var DataTypes = require("sequelize").DataTypes;
var _Auction = require("./Auction");
var _Category = require("./Category");
var _MarketItem = require("./MarketItem");
var _User = require("./User");
var _comment = require("./comment");
var _historyAuction = require("./historyAuction");
var _historyTransfer = require("./historyTransfer");
var _myNFT = require("./myNFT");

function initModels(sequelize) {
  var Auction = _Auction(sequelize, DataTypes);
  var Category = _Category(sequelize, DataTypes);
  var MarketItem = _MarketItem(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var historyAuction = _historyAuction(sequelize, DataTypes);
  var historyTransfer = _historyTransfer(sequelize, DataTypes);
  var myNFT = _myNFT(sequelize, DataTypes);

  myNFT.belongsTo(Category, { as: "category", foreignKey: "category_id"});
  Category.hasMany(myNFT, { as: "myNFTs", foreignKey: "category_id"});
  Auction.belongsTo(User, { as: "seller_User", foreignKey: "seller"});
  User.hasMany(Auction, { as: "Auctions", foreignKey: "seller"});
  MarketItem.belongsTo(User, { as: "seller_User", foreignKey: "seller"});
  User.hasMany(MarketItem, { as: "MarketItems", foreignKey: "seller"});
  myNFT.belongsTo(User, { as: "owner_User", foreignKey: "owner"});
  User.hasMany(myNFT, { as: "myNFTs", foreignKey: "owner"});
  Auction.belongsTo(myNFT, { as: "token", foreignKey: "tokenId"});
  myNFT.hasOne(Auction, { as: "Auction", foreignKey: "tokenId"});
  MarketItem.belongsTo(myNFT, { as: "token", foreignKey: "tokenId"});
  myNFT.hasOne(MarketItem, { as: "MarketItem", foreignKey: "tokenId"});

  return {
    Auction,
    Category,
    MarketItem,
    User,
    comment,
    historyAuction,
    historyTransfer,
    myNFT,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
