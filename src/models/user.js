module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
    },
    googleId: {
      unique: true,
      type: DataTypes.STRING,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Action, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return User;
};
