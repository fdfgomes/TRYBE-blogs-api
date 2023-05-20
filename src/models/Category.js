const CategorySchema = (sequelize, DataTypes) => {
  const CategoryModel = sequelize.define(
    'Category',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: { type: DataTypes.STRING },
    },
    {
      tableName: 'categories',
      timestamps: false,
    }
  );

  return CategoryModel;
};

module.exports = CategorySchema;
