export default (sequelize, DataTypes) => {
  const Channel = sequelize.define("channel", {
    name: DataTypes.STRING,
    public: DataTypes.BOOLEAN
  });

  Channel.associate = models => {
    Channel.belongsTo(models.Team, {
      foreignkey: "TeamId"
    });
    Channel.belongsToMany(models.User, {
      through: "channel_member",
      foreignkey: "ChannelId"
    });
  };
  return Channel;
};
