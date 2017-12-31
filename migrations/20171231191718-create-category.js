module.exports = {
  up: (queryInterface, Sequelize) => {
    const queries = [];

    queries.push(queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
          as: 'categoryId',
        },
        onDelete: 'CASCADE',
      },
    }));

    return Promise.all(queries);
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Categories'),
};
