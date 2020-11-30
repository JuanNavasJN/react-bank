import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const ReportPDF = React.lazy(() => import("./views/dashboard/ReportPDF"));

//----------------- Tarjetas -----
const VerMisTarjetas = React.lazy(() =>
  import("./views/tarjetas/VerMisTarjetas")
);
const PagarTarjeta = React.lazy(() => import("./views/tarjetas/PagarTarjeta"));

//----------------- Tarjetas -----

const RealizarTransferencia = React.lazy(() =>
  import("./views/cuentas/RealizarTransferencia")
);
const VerMisCuentas = React.lazy(() => import("./views/cuentas/VerMisCuentas"));
const TransaccionesCuenta = React.lazy(() =>
  import("./views/cuentas/VerMisCuentas/Transacciones")
);

//----------------- Perfil -----

const Perfil = React.lazy(() => import("./views/perfil"));

const routes = [
  { path: "/", exact: true, name: "Inicio" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/report-pdf", name: "Reporte", component: ReportPDF },
  {
    path: "/cuentas/transferir",
    name: "Transferir",
    component: RealizarTransferencia,
    exact: true,
  },
  {
    path: "/cuentas/cuentas",
    name: "Cuentas",
    component: VerMisCuentas,
    exact: true,
  },
  {
    path: "/cuentas/cuentas/:cuentaNro",
    name: "Transacciones",
    component: TransaccionesCuenta,
    exact: true,
  },
  {
    path: "/tarjetas/tarjetas",
    name: "Tarjetas",
    component: VerMisTarjetas,
    exact: true,
  },
  {
    path: "/tarjetas/pagar-tarjeta",
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
