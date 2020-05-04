export default (sequelize, DataTypes) => {
  const Message = sequelize.define("message", {
    text: DataTypes.STRING
  });

  Message.associate = models => {
    Message.belongsTo(models.Channel, {
      foreignkey: "ChannelId"
    });
    Message.belongsTo(models.User, {
      foreignkey: "userId"
    });
  };
  return Message;
};
