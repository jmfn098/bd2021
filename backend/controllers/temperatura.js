const temperaturaRouter = require("express").Router();
const db = require("../model");
const Temperatura = db.temperatura;
const Funcionario = db.funcionario;

temperaturaRouter.get("/", async (req, res) => {
  const temperaturas = await Temperatura.findAll({
    include: { all: true, attributes: ["nombre", "apellido", "cedula"] },
  });
  res.send(temperaturas);
});
temperaturaRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  Temperatura.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "No existe un temperatura con cedula " + id,
      });
    });
});
temperaturaRouter.post("/", async (req, res) => {
  const funcionario = await Funcionario.findByPk(req.body.cedula, {
    raw: true,
  });

  if (funcionario) {
    const temperatura = {
      temperatura: 37.1,
      fk_funcionarioid: parseInt(req.body.cedula),
    };
    Temperatura.create(temperatura)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial.",
        });
      });
  } else {
    res.send({
      message: "No existe el funcionario",
    });
  }
});
temperaturaRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const temperatura = req.body;
  delete temperatura["cedula"];

  Temperatura.update(req.body, {
    where: { cedula: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Temperatura actualizado.",
        });
      } else {
        res.send({
          message: `No se pudo actualizar el Temperatura con cedula ${id}. Probablemente no hubo cambios.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
});
temperaturaRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  Temperatura.destroy({
    where: { cedula: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Temperatura eliminado",
        });
      } else {
        res.send({
          message: `Probablemente no existe un temperatura con esa cedula.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "No se pudo eliminar el temperatura con cedula" + id,
      });
    });
});
module.exports = temperaturaRouter;
