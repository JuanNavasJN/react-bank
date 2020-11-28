import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
} from "@coreui/react";
import axios from "axios";
import { ip } from "../../../../utility";

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

const Transacciones = ({ history, match }) => {
  const [items, setItems] = useState([]);

  useEffect((_) => {
    const { cuentaNro } = match.params;
    const token = localStorage.getItem("token");

    if (!token) {
      return history.push("/login");
    }

    axios
      .get(ip + "/account/" + cuentaNro + "/transactions", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setItems(
          res.data.map((t) => ({
            ...t,
            date: new Date(t.date).toLocaleString(),
          }))
        );
      });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const data = history.location.state.items;
    setItems(
      data.map((t) => ({
        ...t,
        date: new Date(t.date).toLocaleString(),
      }))
    );
    // eslint-disable-next-line
  }, [history]);

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>Transacciones</CCardHeader>
          <CCardBody>
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Transacciones;
