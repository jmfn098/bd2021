module.exports = (sequelize, Sequelize) => {
  const Temperatura = sequelize.define("temperatura", {
    temperatura: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  });

  return Temperatura;
};
