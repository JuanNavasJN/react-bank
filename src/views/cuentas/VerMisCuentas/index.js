import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ip } from "../../../utility";

const fields = [
  {
    label: "Nro",
    key: "nro",
  },
  {
    label: "Tipo",
    key: "type",
  },
  {
    label: "Saldo disponible",
    key: "available",
  },
  {
    label: "",
    key: "opt",
  },
];

// const items = [
//   {
//     nro: 456543212,
//     type: "Corriente",
//     available: 20000,
//   },
// ];

const VerMisCuentas = () => {
  const history = useHistory();

  const [items, setItems] = useState([]);

  useEffect((_) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return history.push("/login");
    }

    axios
      .get(ip + "/accounts", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setItems(
          res.data.map((e) => ({
            ...e,
            type: e.type === "checking" ? "Corriente" : "Ahorro",
            opt: "Ver transacciones",
          }))
        );
      });
    // eslint-disable-next-line
  }, []);

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>Mis Cuentas</CCardHeader>
          <CCardBody>
            <CDataTable
              sorter={true}
              items={items}
              fields={fields}
              itemsPerPage={10}
              pagination
              clickableRows={true}
              onRowClick={(data) =>
                history.push("/cuentas/cuentas/" + data.nro, {
                  items: data.transactions,
                })
              }
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default VerMisCuentas;
