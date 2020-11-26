import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CButton,
} from "@coreui/react";
import Cards from "react-credit-cards";
import { useHistory } from "react-router-dom";
import "react-credit-cards/es/styles-compiled.css";
import axios from "axios";
import { ip } from "../../../utility";

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
  {
    label: "Ref",
    key: "ref",
  },
];

// const items = [
//   {
//     date: "23/08/2019",
//     description: "Pago de xxxxxx",
//     amount: 39,
//     ref: "0001"
//   },
// ];
//new Date(t.createdAt).toLocaleDateString("es-VE"),

const VerMisTarjetas = () => {
  const history = useHistory();
  const [state, setState] = useState({
    cvc: 0,
    expiry: "",
    focus: "",
    name: "",
    number: "",
    available: 0,
    limit: 0,
  });
  const [items, setItems] = useState([]);

  useEffect((_) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return history.push("/login");
    }

    axios
      .get(ip + "/cards", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res.data);

        const card = res.data[0];

        setState({
          ...state,
          cvc: card.cvv,
          name: card.name,
          expiry: card.expiration,
          number: card.number,
          available: card.available,
          limit: card.limit,
        });

        setItems(
          card.transactions.map((t) => ({
            ...t,
            date: new Date(t.date).toLocaleString(),
          }))
        );
      });
    // eslint-disable-next-line
  }, []);

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
              <CCol xs="12" className="text-right">
                <div onMouseOver={handleOver} onMouseLeave={handleLeave}>
                  <Cards
                    cvc={state.cvc}
                    expiry={state.expiry}
                    focused={state.focus}
                    name={state.name}
                    number={state.number}
                  />
                  <CButton className="mr-5" color="dark">
                    Ver CVC
                  </CButton>
                </div>
              </CCol>
            </CRow>
            <CRow className="mt-5 text-center">
              <CCol xs="12" md="6">
                <b>Saldo disponible: {state.available}</b>
              </CCol>
              <CCol xs="12" md="6">
                <b>Limite: {state.limit}</b>
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
                  scopedSlots={{
                    amount: (item) => (
                      <td>
                        {item.credit ? (
                          <span className="text-success">+ {item.amount}</span>
                        ) : (
                          <span className="text-danger">- {item.amount}</span>
                        )}
                      </td>
                    ),
                  }}
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
