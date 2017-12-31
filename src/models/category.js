module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
    },
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.Action, {
      through: 'ActionCategories',
    });
  };

  return Category;
};
