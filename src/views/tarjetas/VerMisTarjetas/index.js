import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
} from "@coreui/react";
import Cards from "react-credit-cards";

import "react-credit-cards/es/styles-compiled.css";

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

const items = [
  {
    date: "23/08/2019",
    description: "Pago de xxxxxx",
    amount: 39,
  },
];

const VerMisTarjetas = () => {
  const [state, setState] = useState({
    cvc: 234,
    expiry: "12/23",
    focus: "",
    name: "John Doe",
    number: "4645123412341234",
  });

  const handleOver = (_) => {
    setState({ ...state, focus: "cvc" });
  };
  const handleLeave = (_) => {
    setState({ ...state, focus: "" });
  };

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>Mis Tarjetas</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs="12">
                <div onMouseOver={handleOver} onMouseLeave={handleLeave}>
                  <Cards
                    cvc={state.cvc}
                    expiry={state.expiry}
                    focused={state.focus}
                    name={state.name}
                    number={state.number}
                  />
                </div>
              </CCol>
            </CRow>
            <CRow className="mt-5 text-center">
              <CCol xs="12" md="6">
                <b>Saldo disponible: XXXXX</b>
              </CCol>
              <CCol xs="12" md="6">
                <b>Limite: XXXXX</b>
              </CCol>
            </CRow>
            <CRow className="mt-5 px-1 px-md-4">
              <CCol xs="12">
                <CDataTable
                  sorter={true}
                  items={items}
                  fields={fields}
                  itemsPerPage={10}
                  pagination
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default VerMisTarjetas;
