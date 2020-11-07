import React from "react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";
React.icons = { ...React.icons, ...freeSet };

// eslint-disable-next-line
export default [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    // badge: {
    //   color: "info",
    //   text: "NEW",
    // },
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Cuentas",
    // route: "/dashboard",
    icon: "cil-bank",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Ver mis cuentas",
        to: "/cuentas",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Realizar transferencia",
        to: "/transferir",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Tarjetas",
    // route: "/dashboard",
    icon: "cil-credit-card",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Ver mis tarjetas",
        to: "/tarjetas",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Pagar tarjeta",
        to: "/pagar-tarjeta",
      },
    ],
  },
];
