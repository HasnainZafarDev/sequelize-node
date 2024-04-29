module.exports = (sequelize,DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      permanentAdress: {
        type: DataTypes.STRING,
      },
      currentAddress: {
        type: DataTypes.STRING,
      },
      UserId :{
        type : DataTypes.INTEGER,
        allowNull: false
      }
      // user_id : DataTypes.INTEGER
    },
    {
      timestamps: false,
    })
    return Contact; 
};
