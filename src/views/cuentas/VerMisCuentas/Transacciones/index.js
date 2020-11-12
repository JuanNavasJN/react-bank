import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
} from "@coreui/react";

const fields = [
  {
    label: "Fecha",
    key: "date",
  },
  {
    label: "Descripción",
    key: "description",
  },
  {
    label: "Monto",
    key: "amount",
  },
];

// const items = [
//   {
//     date: "12/04/2020",
//     description: "Pago a tarjeta xxxxxxx",
//     amount: "100",
//   },
//   {
//     date: "13/04/2020",
//     description: "Transferencia a xxxxxxx",
//     amount: "14",
//   },
// ];

const Transacciones = () => {
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>Transacciones</CCardHeader>
          <CCardBody>
            <CDataTable
              sorter={true}
              items={[]}
              fields={fields}
              itemsPerPage={10}
              pagination
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Transacciones;
