require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const getListById = async (id) => {
  if (isNaN(Number(id))) {
    throw new Error("List not found");
  }

  const lists = (
    await sequelize.query(`select * from lists where id = ${id} limit 1;`)
  )[0];

  if (lists.length === 0) {
    throw new Error("List not found");
  }

  const list = lists[0];

  const items = (
    await sequelize.query(`select * from items where list_id = ${id};`)
  )[0];

  return {
    ...list,
    items: items.map((item) => ({ ...item, list_id: undefined })),
  };
};

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(
        `
        drop table if exists items;
        drop table if exists lists;

          create table lists (
              id serial primary key, 
              name text,
              type text,
              date integer,
              location text
          );

          create table items (
              id serial primary key, 
              name text,
              link text,
              price float,
              list_id integer not null references lists(id)
          );
        `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },

  getAllLists: (req, res) =>
    sequelize.query("select * from lists;").then((dbRes) => {
      res.status(200).send(dbRes[0]);
    }),

  getList: async (req, res) => {
    const { id } = req.params;

    try {
      const list = await getListById(id);
      res.status(200).json(list);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createList: async (req, res) => {
    const { name, date, type, location, items } = req.body;

    const list = (
      await sequelize.query(
        `insert into lists (name, date, type, location)
                            values ('${name}', ${date}, '${type}', '${location}')
                            returning id;`
      )
    )[0][0];

    const listId = list.id;

    const values = items
      .map(
        (item) => `('${item.name}', '${item.link}', ${item.price}, ${listId})`
      )
      .join(", ");
    await sequelize.query(
      `insert into items (name, link, price, list_id)
                          values ${values};`
    );

    const fetchedList = await getListById(listId);
    res.status(200).json(fetchedList);
  },
};
