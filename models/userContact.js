module.exports = (sequelize, DataTypes,User,Contact) => {
  const userContacts = sequelize.define("userContacts", {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    contactId: {
      type: DataTypes.INTEGER,
      references: {
        model: Contact,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);
  return userContacts;
};
