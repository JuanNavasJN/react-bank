import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CInput,
  // CSelect,
  CForm,
  CButton,
  CAlert,
  CInputGroupText
} from "@coreui/react";
import { ip } from "../../../utility";
import axios from "axios";

const PagarTarjeta = ({ history }) => {
  const [account, setAccount] = useState("");
  const [card, setCard] = useState("");
  const [amount, setAmount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect((_) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return history.push("/login");
    }

    axios
      .get(`${ip}/accounts`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        // console.log(res.data);
        setAccounts(res.data);
        setAccount(res.data[0].nro);
      });

    axios
      .get(`${ip}/cards`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        // console.log(res.data);
        setCards(res.data);
        setCard(res.data[0].number);
      });
    // eslint-disable-next-line
  }, []);

  const currencyFormat = (e) => {
    let x = e.target.value;
    x = x.replace(/[^0-9]/gi, "");
    let y = "";
    if (x.length > 5) {
      let nuevaLong = x.length - 2;
      let start = nuevaLong % 3;
      if (start !== 0) {
        start = 3 - start;
      }
      for (var i = 0; i < nuevaLong; i++) {
        y += x[i];
        start++;
        if (start === 3 && i !== nuevaLong - 1) {
          y += ".";
          start = 0;
        }
      }
      y += ",";
      y += x[x.length - 2];
      y += x[x.length - 1];
      setAmount(y);
    } else {
      if (x !== "00") {
        x = (x / 100).toFixed(2);
        let y = String(x).split(".").join(",");
        setAmount(y);
      } else {
        setAmount("");
      }
    }
  };

  const showFormat = (e) => {
    let x = e;
    x = x.replace(/[^0-9]/gi, "");
    let y = "";
    if (x.length > 5) {
      let nuevaLong = x.length - 2;
      let start = nuevaLong % 3;
      if (start !== 0) {
        start = 3 - start;
      }
      for (var i = 0; i < nuevaLong; i++) {
        y += x[i];
        start++;
        if (start === 3 && i !== nuevaLong - 1) {
          y += ".";
          start = 0;
        }
      }
      y += ",";
      y += x[x.length - 2];
      y += x[x.length - 1];
      return y;
    } else {
      if (x !== "00") {
        x = (x / 100).toFixed(2);
        let y = String(x).split(".").join(",");
        return y;
      } else {
        return "";
      }
    }
  };


  // const showFormat = (num) => {
	// 	return String(num).split(".").join(",").replace(/(\d)(?=(\d{3})+(?!\d))/g, '.')
	// }

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      return history.push("/login");
    }

    const data = {
      fromAccount: account,
      toCard: card,
      amount: Number(amount.split(".").join("").split(",").join(".")),
    };

    setLoading(true);
    setError(null);
    setSuccess(null);

    axios
      .post(`${ip}/pay-card`, data, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setLoading(false);
        setSuccess("El pago se realizó exitosamente.");
        
        let aux =
        parseFloat(
          accounts[0].available
        ).toFixed(2) -
        parseFloat(
          amount.split(".").join("").split(",").join(".")
        );

        let aux2 = accounts
        aux2[0].available = aux.toFixed(2)

        setAccounts(aux2)
        setAmount("");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.log(error.response.data.msg);
          if (error.response.data.msg === "Invalid account number") {
            setError("Número de cuenta o número de tarjeta inválido.");
          } else if (error.response.data.msg === "Insufficient balance") {
            setError("Balance insuficiente en la cuenta.");
          } else {
            setError("Ha ocurrido un error.");
          }
        }
      });
  };

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>Pagar tarjeta</CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol xs="12">
                    <div style={{ marginBottom: "8px" }}>
                      <span>Cuenta a debitar</span>
                      <CInputGroupText>{accounts && accounts[0] && accounts[0].nro }</CInputGroupText>
                      <span style={{ color: "#4d54d4" }}>
                        Saldo disponible: {accounts && accounts[0] && showFormat(accounts[0].available)}
                      </span>
                    </div>
                  {/* <CFormGroup>
                    <CLabel htmlFor="account">Seleccionar cuenta</CLabel>
                    <CSelect
                      custom
                      name="account"
                      id="account"
                      onChange={(e) => setAccount(e.target.value)}
                    >
                      {accounts.map((a) => (
                        <option value={a.nro} key={a.nro}>
                          {a.nro}
                        </option>
                      ))}
                    </CSelect>
                  </CFormGroup> */}
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="12">
                  {/* <CFormGroup>
                    <CLabel htmlFor="card">Seleccionar tarjeta</CLabel>
                    <CSelect
                      custom
                      name="card"
                      id="card"
                      onChange={(e) => setCard(e.target.value)}
                    >
                      {cards.map((c) => (
                        <option value={c.number} key={c.number}>
                          {c.number}
                        </option>
                      ))}
                    </CSelect>
                  </CFormGroup> */}
                  <div style={{ marginBottom: "8px" }}>
                    <span>Tarjeta a pagar</span>
                    <CInputGroupText>{cards && cards[0] && cards[0].number }</CInputGroupText>
                    <span style={{ color: "#4d54d4" }}>
                      Saldo disponible: {cards && cards[0] && showFormat(cards[0].available) }
                    </span>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="amount">Monto a pagar</CLabel>
                    <CInput
                      id="amount"
                      placeholder="Ingrese monto a pagar"
                      required
                      value={amount}
                      onChange={currencyFormat}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12" className="text-center mt-2">
                  {error && <CAlert color="danger">{error}</CAlert>}
                  {success && <CAlert color="success">{success}</CAlert>}
                  <CButton type="submit" color="primary">
                    {loading ? (
                      <i
                        style={{ fontSize: "15px" }}
                        className="fas fa-spinner fa-pulse"
                      ></i>
                    ) : (
                      "Pagar"
                    )}
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default PagarTarjeta;
