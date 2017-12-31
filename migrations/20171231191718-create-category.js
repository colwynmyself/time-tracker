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
    }));

    return Promise.all(queries);
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Categories'),
};
