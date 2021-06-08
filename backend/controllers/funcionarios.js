const funcionarioRouter = require("express").Router();
const db = require("../model");
const Funcionario = db.funcionario;
funcionarioRouter.get("/", async (req, res) => {
  console.log("op");
  console.log(req.query.name);
  const funcionarios = await Funcionario.findAll();
  res.send(funcionarios);
});
funcionarioRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  Funcionario.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "No existe un funcionario con cedula " + id,
      });
    });
});
funcionarioRouter.post("/", async (req, res) => {
  console.log(req.body);
  const funcionario = req.body;
  Funcionario.create(funcionario)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
});
funcionarioRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const funcionario = req.body;
  delete funcionario["cedula"];

  Funcionario.update(req.body, {
    where: { cedula: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Funcionario actualizado.",
        });
      } else {
        res.send({
          message: `No se pudo actualizar el Funcionario con cedula ${id}. Probablemente no hubo cambios.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
});
funcionarioRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  Funcionario.destroy({
    where: { cedula: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Funcionario eliminado",
        });
      } else {
        res.send({
          message: `Probablemente no existe un funcionario con esa cedula.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "No se pudo eliminar el funcionario con cedula" + id,
      });
    });
});
module.exports = funcionarioRouter;
