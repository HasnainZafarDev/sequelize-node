const db = require("../models/index.js");
const User = db.user;
const Contact = db.contact;
const { Sequelize, Op, where, QueryTypes } = require("sequelize");

const addUser = async (req, res) => {
  //   const User1 = User.build({ firstName: "Hasnain", lastName: "Ahmad" });
  //   await User1.save();
  const User1 = await User.create({ firstName: "Hasnain", lastName: "Ahmad" });
  res.status(200).send(User1.toJSON());
};

const getUsers = async (req, res) => {
  const data = await User.findAll({});
  res.status(200).send(data);
};

const getUser = async (req, res) => {
  const data = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send(data);
};
const postUsers = async (req, res) => {
  const postData = req.body;
  if (req.body.length > 1) {
    var data = await User.bulkCreate(postData);
  } else {
    var data = await User.create(postData);
  }
  res.status(200).send(data);
};

const deleteUser = async (req, res) => {
  const data = await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send("Deleted Success");
};

const updateUser = async (req, res) => {
  var updatedData = req.body;
  const data = await User.update(updatedData, {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send(data);
};
// ............Queries..........

const queryUser1 = async (req, res) => {
  const data = await User.create(
    {
      firstName: "DOn",
      lastName: "2",
    },
    { fields: ["firstName"] }
  );
  res.status(200).send(data);
};

const queryUser2 = async (req, res) => {
  // const data = await User.findAll({
  //   attributes: ["id","firstName"]
  // })
  const data = await User.findAll({
    attributes: [
      "id",
      ["firstName", "PehlaNaam"],
      [Sequelize.fn("COUNT", Sequelize.col("firstName")), "count"],
    ],
  });
  res.status(200).send(data);
};

const queryUser3 = async (req, res) => {
  const data = await User.findAll({
    attributes: { exclude: ["firstName"] },
  });
  res.status(200).send(data);
};
const queryUser4 = async (req, res) => {
  const data = await User.findAll({
    // where: {
    //   id : 12
    // }
    // where: {
    //   id: {
    //     [Op.eq]: 12,
    //   },
    // where: {
    //     [Op.and]: [
    //       {id: 12},
    //       {"firstName" : "Umar"}
    //     ]
    // }
    where: {
      [Op.or]: [{ id: 3 }, { id: 12 }],
    },
  });
  res.status(200).send(data);
};
const queryUser5 = async (req, res) => {
  const data = await User.findAll({
    // order : [
    //   ['id', 'DESC']
    // ],
    group: ["firstName"],
    // limit: 1,
  });
  res.status(200).send(data);
};
const finderUser = async (req, res) => {
  // const data = await User.findOne({
  //   where: {
  //     lastName: 'khan'
  //   }
  // const data = await User.findByPk(5);
  // res.status(200).send(data);
  // const [user,created] = await User.findOrCreate({
  //   where: {firstName: "Nawab"},
  //   defaults: {
  //     lastName: "shah",
  //   },
  // });
  const { count, rows } = await User.findAndCountAll({
    where: { lastName: "Khan" },
  });
  res.status(200).send({ rows, count });
};
const getSetVirtualUser = async (req, res) => {
  const data = await User.findAll({});

  // const data = await User.create({
  //   firstName: "Hassan",
  //   lastName: "Shah",
  // })
  res.status(200).send(data);
};
const validateUser = async (req, res) => {
  var data = {};
  var messages = {};
  try {
    data = await User.create({
      firstName: "RRR",
      lastName: "Football",
    });
  } catch (e) {
    let message;
    e.errors.forEach((error) => {
      switch (error.validatorKey) {
        case "isAlpha":
          message = "Only Alphabets are allowed";
          break;
        case "isLowercase":
          message = error.message;
          break;
        case "len":
          message = "Firstname should be gt than 3 and smaller than 6";
          break;
      }
      messages[error.path] = message;
    });
  }
  res.status(200).send({ data, messages });
};
const rawQueriesUser1 = async (req, res) => {
  const data = await db.sequelize.query("SELECT * from `users`", {
    type: QueryTypes.SELECT,
    model: User,
    mapToModel: true,
    // plain: false
  });
  res.status(200).send(data);
};
const rawQueriesUser2 = async (req, res) => {
  // const data = await db.sequelize.query('SELECT * FROM Users WHERE firstName = ?',
  // {
  //   replacements:[`samim`],
  //   type: QueryTypes.SELECT
  // } )

  // const data = await db.sequelize.query('SELECT * FROM Users WHERE id = :id',
  // {
  //   replacements:{id: `2`},
  //   type: QueryTypes.SELECT
  // } )

  // const data = await db.sequelize.query('SELECT * FROM Users WHERE id IN(:id)',
  // {
  //   replacements:{id: [`1`,`2`]},
  //   type: QueryTypes.SELECT
  // } )

  // const data = await db.sequelize.query('SELECT * FROM Users WHERE firstName LIKE :search_name',
  // {
  //   replacements:{ search_name: "umar%"},
  //   type: QueryTypes.SELECT
  // } )

  const data = await db.sequelize.query("SELECT * FROM Users WHERE id=$id", {
    bind: { id: "4" },
    type: QueryTypes.SELECT,
  });
  res.status(200).send(data);
};
//...................................... Relationship ...................................//
const oneToOneUser1 = async (req, res) => {
  const data = await User.create({
    firstName: "abc",
    lastName: "zyx",
  });
  if (data && data.id) {
    await Contact.create({
      permanentAdress: "nsr",
      currentAddress: "hak",
      user_id: data.id,
    });
  }
  res.status(200).send(data);
};

const oneToOneUser2 = async (req, res) => {
  const data = await User.findAll({
    // include: Contact
    attributes: ["firstName"],

    include: [
      {
        model: Contact,
        as: "Raabta",
        attributes: ["permanentAdress"],
      },
    ],
  });
  res.status(200).send(data);
};
const oneToManyUser = async (req, res) => {
  //  const data = await Contact.create({permanentAdress: 'Delhi', currentAddress: 'Dubai',
  //  user_id: 1
  // })
  //........one to many
  const data = await User.findAll({
    attributes: ["firstName"],
    include: [
      {
        model: Contact,
        as: "Raabta",
        attributes: ["permanentAdress"],
      },
    ],
  });
  //........many to one

  // const data = await Contact.findAll({
  //   attributes: ['permanentAdress'],
  //   include: [{
  //     model: User,
  //     attributes: ['firstName'],
  //   }]
  // })
  res.status(200).send(data);
};
var manyToManyUser1 = async (req, res) => {
  const data = await User.create({
    firstName: "sahim",
    lastName: "khan",
  });
  if (data && data.id) {
    await Contact.create({
      permanentAdress: "Nsr",
      currentAddress: "dheri",
    });
  }
  res.status(200).send(data);
};
var manyToManyUser2 = async (req, res) => {
  // const data = await Contact.findAll({
  //   attributes: ['permanentAdress'],
  //   include: [{
  //     model: User,
  //     attributes: ['firstName'],
  //   }]
  // })
  const data = await User.findAll({
    attributes: ["firstName"],
    include: [
      {
        model: Contact,
        attributes: ["permanentAdress"],
      },
    ],
  });
  res.status(200).send(data);
};
//    unmanaged transaction
var transactionsUser1 = async (req, res) => {
  const t = await db.sequelize.transaction();
  const data = await User.create({ firstName: "saheem", lastName: "Zafar" });
  try {
    if (data && data.id) {
      await Contact.create({
        permanentAdress: "hakimabad",
        currentAddress: "nsr",
        UserId: null,
      });
      await t.commit();
    }
  } catch (error) {
    await t.rollback();
    await User.destroy({
      where: {
        id: data.id,
      },
    });
  }
  res.status(200).send(data);
};
//    managed transaction
var transactionsUser2 = async (req, res) => {
  const data = await User.create({ firstName: "ayan", lastName: "hayat" });
  try {
    const result = await db.sequelize.transaction(async (t) => {
      var contact = await Contact.create(
        {
          permanentAdress: "hakimabad",
          currentAddress: "nsr",
          UserId: null,
        },
        { transaction: t }
      );
    });
  } catch (error) {
    await User.destroy({ where: { id: data.id } });
  }

  res.status(200).send(data);
};

module.exports = {
  addUser,
  getUsers,
  getUser,
  postUsers,
  deleteUser,
  updateUser,
  queryUser1,
  queryUser2,
  queryUser3,
  queryUser4,
  queryUser5,
  finderUser,
  getSetVirtualUser,
  validateUser,
  rawQueriesUser1,
  rawQueriesUser2,
  oneToOneUser1,
  oneToOneUser2,
  oneToManyUser,
  manyToManyUser1,
  manyToManyUser2,
  transactionsUser1,
  transactionsUser2,
};
