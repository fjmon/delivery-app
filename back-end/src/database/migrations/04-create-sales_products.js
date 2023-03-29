'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('sales_products', {
        quantity: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        saleId: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          field: 'sale_id',
          references: {
            model: 'sales',
            key: 'id',
          },
        },
        productId: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          field: 'product_id',
          references: {
            model: 'products',
            key: 'id',
          },
        },
      }
    );
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('sales_products');
  }
};
