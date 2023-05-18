const UserSchema = (sequelize, DataTypes) => {
  const UserModel = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      displayName: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      image: { type: DataTypes.STRING },
    },
    {
      tableName: 'users',
      timestamps: false,
      underscored: true,
    }
  );

  return UserModel;
};

module.exports = UserSchema;
