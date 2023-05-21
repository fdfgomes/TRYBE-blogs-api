const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoryModel = sequelize.define(
    'PostCategory',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: { type: DataTypes.STRING },
    },
    {
      tableName: 'categories',
    }
  );

  PostCategoryModel.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategoryModel,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.BlogPost.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategoryModel,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategoryModel;
};

module.exports = PostCategorySchema;
