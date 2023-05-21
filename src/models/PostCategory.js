const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoryModel = sequelize.define(
    'PostCategory',
    {
      postId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'posts_categories',
      timestamps: false,
      underscored: true,
    }
  );

  PostCategoryModel.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategoryModel,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategoryModel,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategoryModel;
};

module.exports = PostCategorySchema;
