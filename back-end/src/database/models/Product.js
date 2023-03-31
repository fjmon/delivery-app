const ProductModel = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
      name: { type: DataTypes.STRING },
      price: { type: DataTypes.DECIMAL(4,2) },
      urlImage: { type: DataTypes.STRING, field: 'url_image' },
    },
    { timestamps: false, tableName: 'products', underscored: true },
  );
  return Product;
};

module.exports = ProductModel;
