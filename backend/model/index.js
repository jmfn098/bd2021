const dbConfig = require("../config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.funcionario = require("./funcionario.model")(sequelize, Sequelize);
db.temperatura = require("./temperatura.model")(sequelize, Sequelize);
db.temperatura.belongsTo(db.funcionario, {
  foreignKey: "fk_funcionarioid",
});
db.funcionario.hasMany(db.temperatura, {
  foreignKey: "fk_funcionarioid",
});

module.exports = db;
