const SaleProductModel = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define(
    'SaleProduct',
    { quantity: { allowNull: false, type: DataTypes.INTEGER },
      saleId: { primaryKey: true, type: DataTypes.INTEGER, foreignKey: true, field: 'sale_id' },
      productId: { primaryKey: 1, type: DataTypes.INTEGER, foreignKey: true, field: 'product_id' },
    },
    { timestamps: false, tableName: 'sale_products', underscored: true },
  );
  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(
      models.Product,
      { as: 'products', through: SaleProduct, foreignKey: 'sale_id', otherKey: 'product_id' },
    );
    models.Product.belongsToMany(
      models.Sale,
      { as: 'sales', through: SaleProduct, foreignKey: 'product_id', otherKey: 'sale_id' },
    );
  }; return SaleProduct;
};

module.exports = SaleProductModel;
