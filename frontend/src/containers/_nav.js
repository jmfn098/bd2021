import React from "react";
import { CIcon } from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    style: { fontSize: "small", fontWieght: "bold" },
    name: "Home",
    to: "/",
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    style: { fontSize: "small", fontWieght: "bold" },
    name: "Funcionarios",
    to: "/funcionarios",
    icon: <CIcon name="cil-people" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    style: { fontSize: "small", fontWieght: "bold" },
    name: "Temperaturas",
    to: "/temperaturas",
    icon: <CIcon name="cil-graph" customClasses="c-sidebar-nav-icon" />,
  },

  // {
  //   _tag: "CSidebarNavItem",
  //   style: { fontSize: "large", fontWieght: "bold" },
  //   name: "Compras",
  //   to: "/compras",
  //   icon: <CIcon name="cil-dollar" customClasses="c-sidebar-nav-icon" />,
  // },
];
export default _nav;
