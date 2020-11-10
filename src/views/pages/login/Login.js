import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ip } from "../../../utility";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    success: "",
    loading: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.email === "" || this.state.password === "") {
      this.setState({
        error: "Debe completar el formulario para iniciar sesión.",
        success: "",
      });
    }
    {
      this.setState({ loading: true });
      let data = {
        email: this.state.email,
        password: this.state.password,
      };

      axios
        .post(`${ip}/auth/signin`, data)
        .then((res) => {
          this.setState({
            error: "",
            success: "",
            email: "",
            password: "",
            loading: false,
          });

          localStorage.setItem("token", res.data.token);

          this.props.history.push("/dashboard");
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data.error);
          } else {
            console.log(error);
          }
          let err = "Ha ocurrido un error";
          if (
            error.response &&
            error.response.data.error === "Incorrect email or password"
          ) {
            err = "Email o contraseña inválidos";
          }
          this.setState({
            error: err,
            success: "",
            loading: false,
          });
        });
    }
  };
  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={this.handleSubmit}>
                      <h1>Iniciar sesión</h1>
                      <p className="text-muted">Iniciar sesión en su cuenta</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>@</CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="email"
                          placeholder="Correo electrónico"
                          autoComplete="email"
                          id="email"
                          onChange={this.handleChange}
                          value={this.state.email}
                          disabled={this.state.loading}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Contraseña"
                          id="password"
                          onChange={this.handleChange}
                          value={this.state.password}
                          autoComplete="current-password"
                          disabled={this.state.loading}
                        />
                      </CInputGroup>
                      <CRow className="mb-4">
                        <CCol xs="6">
                          <CButton
                            color="primary"
                            className="px-4"
                            // onClick={() => this.handleSubmit()}
                            type="submit"
                          >
                            {this.state.loading ? (
                              <i
                                style={{ fontSize: "15px" }}
                                className="fas fa-spinner fa-pulse"
                              ></i>
                            ) : (
                              "Iniciar sesión"
                            )}
                          </CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <Link to="/register" disabled={this.state.loading}>
                            <CButton
                              color="link"
                              className="px-0"
                              disabled={this.state.loading}
                            >
                              ¿Olvidó su contraseña?
                            </CButton>
                          </Link>
                        </CCol>
                      </CRow>
                      {this.state.error && (
                        <CAlert color="danger">{this.state.error}</CAlert>
                      )}
                      {this.state.success && (
                        <CAlert color="success">{this.state.success}</CAlert>
                      )}
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>Regístrate</h2>
                      <p>
                        ¿Quieres formar parte de nuestra comunidad? solo llena
                        el siguiente formulario y podrás disfrutar de nuestros
                        beneficios!
                      </p>
                      <Link to="/register" disabled={this.state.loading}>
                        <CButton
                          color="primary"
                          disabled={this.state.loading}
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Regístrate ahora!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default Login;
