import React from "react";
const Funcionarios = React.lazy(() =>
  import("./components/Funcionarios/Funcionarios")
);
const Home = React.lazy(() => import("./components/Home/Home"));
const Temperaturas = React.lazy(() =>
  import("./components/Temperaturas/Temperaturas")
);
const routes = [
  {
    path: "/funcionarios",
    exact: true,
    name: "Funcionarios",
    component: Funcionarios,
  },
  {
    path: "/temperaturas",
    exact: true,
    name: "Temperatura",
    component: Temperaturas,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];
export default routes;
