module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.Action, {
      through: 'ActionCategories',
    });

    // Categories can be nested
    Category.hasMany(models.Category, {
      as: 'SubCategories',
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
    });
  };

  return Category;
};
