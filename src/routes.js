import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const VerMisTarjetas = React.lazy(() =>
  import("./views/tarjetas/VerMisTarjetas")
);
const PagarTarjeta = React.lazy(() => import("./views/tarjetas/PagarTarjeta"));

const RealizarTransferencia = React.lazy(() =>
  import("./views/cuentas/RealizarTransferencia")
);
const VerMisCuentas = React.lazy(() => import("./views/cuentas/VerMisCuentas"));

const Perfil = React.lazy(() => import("./views/perfil"));

const routes = [
  { path: "/", exact: true, name: "Inicio" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/transferir",
    name: "Transferir",
    component: RealizarTransferencia,
    exact: true,
  },
  { path: "/cuentas", name: "Cuentas", component: VerMisCuentas, exact: true },
  {
    path: "/tarjetas",
    name: "Tarjetas",
    component: VerMisTarjetas,
    exact: true,
  },
  {
    path: "/pagar-tarjeta",
    name: "Pagar tarjeta",
    component: PagarTarjeta,
    exact: true,
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: Perfil,
    exact: true,
  },
];

export default routes;
