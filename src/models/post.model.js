const PostSchema = (sequelize, DataTypes) => {
  const PostModel = sequelize.define(
    'Post',
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

  PostModel.associate = (models) => {
    PostModel.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return PostModel;
};

module.exports = PostSchema;
