export default (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: "The username can only contain letters and numbers"
        },
        len: {
          args: [3, 40],
          msg: "The username needs to be between 3 to 40 character long"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email"
        }
      }
    },
    password: DataTypes.STRING
  });

  User.associate = models => {
    User.belongsToMany(models.Team, {
      through: "member",
      foreignkey: "userId"
    });
  };
  return User;
};
