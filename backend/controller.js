require("dotenv").config();
const Sequelize = require("Sequelize");

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(
        `
            drop table if exists lists;
            drop table if exists items;

            create table list (
                id serial primary key, 
                name varchar,
                type varchar,
                date varchar,
                location varchar
            );

            create table items (
                id serial primary key, 
                name varchar,
                link varchar,
                price number
                list_id integer not null references lists(id)
            );

            
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },

  getList: (req, res) =>
    sequelize.query("select * from list;").then((dbRes) => {
      res.status(200).send(dbRes[0]);
    }),

  createItem: (req, res) => {
    const { name, rating, id } = req.body;
    return sequelize
      .query(
        `insert into item (name, link, id)
                            values ('${name}', '${link}', ${price}, '${list_id}');`
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      });
  },

  getItem: (req, res) =>
    sequelize
      .query(
        `select list_id, item.name as item, link, list.id, list.name as list
         from item
         join list
         on item.id = list.id;`
      )
      .then((dbRes) => {
        res.status(200).send(dbRes[0]);
      }),

};
