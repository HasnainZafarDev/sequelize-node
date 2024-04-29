module.exports = (sequelize, DataTypes, Model) => {
  class User extends Model {}
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isAlpha : true,
          isLowercase : {msg : "Choty Alphabets "},
          len : [3,10]
        },
        get(){
          const rawValue = this.getDataValue('firstName');
          return "Mr." + rawValue.toUpperCase();
        }
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: "Khan",
        set(value){
          this.setDataValue('lastName', value + '  ,Pakistani');
        }
      },
      // Virtual
      fullName : {
        type: DataTypes.VIRTUAL,
        get(){
          return this.getDataValue('firstName') + " " + this.getDataValue('lastName');
        },
        set(){
          throw new Error("Do not try to set the fullName value")
        }
      }
    },
    {
      sequelize,
      modelName: "users",
      timestamps: false,
    })
  return User;
};
