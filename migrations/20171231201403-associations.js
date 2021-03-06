module.exports = {
  up: (queryInterface, Sequelize) => {
    const queries = [];

    queries.push(queryInterface.addColumn('Actions', 'userId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
      onDelete: 'CASCADE',
    }));

    queries.push(queryInterface.createTable('ActionCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      actionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Actions',
          key: 'id',
          as: 'actionId',
        },
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Categories',
          key: 'id',
          as: 'categoryId',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }));

    return Promise.all(queries);
  },

  down: (queryInterface, Sequelize) => {
    const queries = [];

    queries.push(queryInterface.removeColumn('Actions', 'userId'));
    queries.push(queryInterface.dropTable('ActionCategories'));

    return Promise.all(queries);
  },
};
