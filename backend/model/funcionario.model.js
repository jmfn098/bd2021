module.exports = (sequelize, Sequelize) => {
  const Funcionario = sequelize.define("funcionario", {
    nombre: {
      type: Sequelize.STRING,
    },

    apellido: {
      type: Sequelize.STRING,
    },

    cedula: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cargo: {
      type: Sequelize.STRING,
    },
    departamento: {
      type: Sequelize.STRING,
    },
    rfid: {
      type: Sequelize.STRING,
    },
  });

  return Funcionario;
};
