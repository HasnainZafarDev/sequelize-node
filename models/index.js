const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sequelize_db','root', '',{
    host: 'localhost',
    dialect:'mysql',
    logging:false
})
try {
    sequelize.authenticate();
    console.log("Connected to Sequelize")
} catch (error) {
    console.log("Unable To Connact : ",error)
}

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize,DataTypes,Model)
db.contact = require('./contact')(sequelize,DataTypes)
db.userContacts = require('./userContact')(sequelize,DataTypes,db.user,db.contact)

//One-to-one 
// db.user.hasOne(db.contact,{foreignKey: 'user_id',as: "Raabta"})
// db.contact.belongsTo(db.user)

// db.user.hasMany(db.contact,{foreignKey: 'user_id',as: "Raabta"})
// db.contact.belongsTo(db.user,{foreignKey: 'user_id'})

// ........1st-method......
// db.user.belongsToMany(db.contact,{through : 'user_contacts'})
// db.contact.belongsToMany(db.user,{through : 'user_contacts'})

// ........2nd-method......
// db.user.belongsToMany(db.contact,{through : db.userContacts})
// db.contact.belongsToMany(db.user,{through : db.userContacts})

db.sequelize.sync({force: false})
module.exports = db