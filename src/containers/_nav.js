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
    route: "/cuentas",
    icon: "cil-bank",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Ver mis cuentas",
        to: "/cuentas/cuentas",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Realizar transferencia",
        to: "/cuentas/transferir",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Tarjetas",
    route: "/tarjetas",
    icon: "cil-credit-card",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Ver mis tarjetas",
        to: "/tarjetas/tarjetas",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Pagar tarjeta",
        to: "/tarjetas/pagar-tarjeta",
      },
    ],
  },
];
