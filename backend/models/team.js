export default (sequelize, DataTypes) => {
  const Team = sequelize.define("team", {
    name: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Team name already in use"
      }
    }
  });

  Team.associate = models => {
    Team.belongsToMany(models.User, {
      through: models.Member,
      foreignkey: "teamId"
    });
    Team.belongsTo(models.User, {
      foreignkey: "owner"
    });
  };
  return Team;
};
