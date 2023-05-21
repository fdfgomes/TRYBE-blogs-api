const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPostModel = sequelize.define(
    'BlogPost',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: { type: DataTypes.STRING },
      content: { type: DataTypes.STRING },
      userId: { type: DataTypes.INTEGER },
      published: { type: DataTypes.DATE },
      updated: { type: DataTypes.DATE },
    },
    {
      tableName: 'blog_posts',
      underscored: true,
      timestamps: true,
    }
  );

  BlogPostModel.associate = (models) => {
    BlogPostModel.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return BlogPostModel;
};

module.exports = BlogPostSchema;
