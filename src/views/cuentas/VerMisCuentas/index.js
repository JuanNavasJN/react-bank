import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
} from "@coreui/react";
import { useHistory } from "react-router-dom";

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
];

const items = [
  {
    nro: 456543212,
    type: "Corriente",
    available: 20000,
  },
];

const VerMisCuentas = () => {
  const history = useHistory();

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
                history.push("/cuentas/cuentas/" + data.nro)
              }
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default VerMisCuentas;
