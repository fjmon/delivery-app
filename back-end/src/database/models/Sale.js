/* eslint-disable max-lines-per-function */
const SaleModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    { 
      id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
      userId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
      sellerId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
      totalPrice: { type: DataTypes.DECIMAL(9, 2), allowNull: false },
      deliveryAddress: { type: DataTypes.STRING, allowNull: false },
      deliveryNumber: { type: DataTypes.STRING, allowNull: false },
      saleDate: {
        type: DataTypes.DATE, 
        defaultValue: sequelize.fn('NOW'),
      },
      status: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: 'sales', timestamps: false, underscored: true },
  );
  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Sale.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller' });
  }; return Sale; 
};

module.exports = SaleModel;
