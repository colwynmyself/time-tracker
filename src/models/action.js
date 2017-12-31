module.exports = (sequelize, DataTypes) => {
  const Action = sequelize.define('Action', {
    description: {
      type: DataTypes.STRING,
    },
    hourBlock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Action.associate = (models) => {
    Action.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Action;
};
