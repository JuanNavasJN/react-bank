import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CDataTable,
  CCardHeader,
  CLink
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { ip } from "../../utility";
import axios from "axios";

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

const Dashboard = () => {
  const history = useHistory();
  const [items, setItems] = useState([]);

  useEffect((_) => {
    const token = localStorage.getItem("token");

    if (!token) {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return history.push("/login");
    }

    axios
      .get(ip + "/transactions", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setItems(
          res.data.map((t) => ({
            ...t,
            date: new Date(t.date).toLocaleString(),
          }))
        );
      });
    // eslint-disable-next-line
  }, []);

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>Transacciones <CLink to='report-pdf'><i class="fas fa-download"></i></CLink></CCardHeader>
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
      <CCol xs="12" sm="6" md="4">
        <CCard
          color="primary"
          className="text-white"
          onClick={(_) => history.push("/cuentas/cuentas")}
        >
          <CCardBody>
            <h3>Ver mis cuentas</h3>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" sm="6" md="4">
        <CCard
          color="info"
          className="text-white"
          onClick={(_) => history.push("/tarjetas/tarjetas")}
        >
          <CCardBody>
            <h3>Ver mis tarjetas</h3>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );

};

export default Dashboard;
