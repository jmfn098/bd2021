const authRouter = require("express").Router();
const db = require("../model/");
const Funcionario = db.funcionario;
const _ = require("lodash");
const jwt = require("jsonwebtoken");
//const enviarMail = require("../utils/mailer");

authRouter.post("/signin", async (req, res) => {
  const funcionario = await Funcionario.findByPk(req.body.cedula);
  console.log(req.body);
  if (funcionario) {
    const isValidPassword = funcionario.password === req.body.password;

    if (isValidPassword) {
      const token = jwt.sign(
        { ..._.omit(funcionario, ["createdAt", "updatedAt", "password"]) },
        process.env.SECRET,
        {
          expiresIn: 60 * 60 * 24, // 24 hours
        }
      );
      res.send({ id: funcionario.cedula, token: token });
    } else {
      res.status(401).send({ message: "Contraseña equivocada" });
    }
  } else {
    res.status(404).send({ message: "Funcionario no registrado" });
  }
});

module.exports = authRouter;
