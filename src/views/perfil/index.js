import React, { Component } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow, CInputGroup, CInputGroupPrepend, CInputGroupText, CInput, CButton, CAlert, CForm} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import { ip } from "../../utility";

class Perfil extends Component{
  state = {
    fullName: "",
    password_confirmation: "",
    email: "",
    password: "",
    birthdate: "",
    business: "",
    phoneNumber: "",
    address: "",
    dni: "",
    error: "",
    success: "",
    loading: false,
    apikey:"",
    loadingUpdate:false,
    show:''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault()
    {
      this.setState({ loading: true });
      let data = {
        fullName: this.state.fullName,
        email: this.state.email,
        birthdate: this.state.birthdate,
        business: this.state.business,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        dni: this.state.dni
      };
      axios
      .put(`${ip}/profile/update`, data,{headers: {Authorization: localStorage.getItem("token")}})
      .then((res) => {
        this.setState({
          error: "",
          success: "Tu perfil se ha actualizado satisfactoriamente.",
          loading: false,
          show:'profile'
        });

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
          show:'profile'
        });
      });
    }
  }

  handlePassword = (e) => {
    e.preventDefault()
    if (this.state.password_confirmation !== this.state.password) {
      this.setState({ error: "Las contraseñas no coinciden.", success: "", show:'password' });
    }else if (!this.state.password_confirmation.trim("")) {
      this.setState({ error: "Por favor introduzca la contraseña de confirmacion.", success: "", show:'password' });
    }else if (!this.state.password.trim("")) {
      this.setState({ error: "Por favor introduzca la contraseña nueva.", success: "", show:'password' });
    } else if (
      !this.state.password ||
      !this.state.password.length ||
      this.state.password.length < 7
    ) {
      this.setState({
        error: "La contraseña debe tener al menos 7 caracteres.", success: "", show:'password'
      });
    } else if (
      // eslint-disable-next-line
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.state.password)
    ) {
      this.setState({
        error:
          "Debe utilizar al menos 1 carácter especial como !@#$%^&*() En su contraseña.",
           success: "", show:'password'
      });
    } else if (!/[0-9]/.test(this.state.password)) {
      this.setState({ error: "La contraseña debe incluir al menos 1 número.", success: "", show:'password' });
    } else if (/\s/.test(this.state.password)) {
      this.setState({ error: "La contraseña no puede contener espacios.", success: "", show:'password' });
    }else{
      this.setState({ loadingUpdate: true });
      let data = {
        password: this.state.password
      };
      axios
      .put(`${ip}/profile/password/update`, data,{headers: {Authorization: localStorage.getItem("token")}})
      .then((res) => {
        this.setState({
          error: "",
          password:"",
          password_confirmation:"",
          success: "Tu contraseña se ha actualizado satisfactoriamente.",
          loadingUpdate: false,
          show:'password'
        });
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
          loadingUpdate: false,
          show:'password'
        });
      });
    }
  }

  componentDidMount = () =>{
    axios
    .get(`${ip}/profile/show`,{headers: {Authorization: localStorage.getItem("token")}})
    .then((res) => {
      let aux = res.data.user
      this.setState({
        fullName: aux.fullName ? aux.fullName : this.state.fullName,
        email: aux.email ? aux.email : this.state.email,
        birthdate: aux.birthdate ? aux.birthdate : this.state.birthdate,
        business: aux.business ? aux.business : this.state.business,
        phoneNumber: aux.phoneNumber ? aux.phoneNumber : this.state.phoneNumber,
        address: aux.address ? aux.address : this.state.address,
        dni: aux.dni ? aux.dni : this.state.dni,
        apikey: aux.apikey ? aux.apikey : this.state.apikey
      });
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

  render(){
    return (
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>Actualizar datos del perfil</CCardHeader>
            <CCardBody>
              <CForm onSubmit={this.handleSubmit}>
                <CRow>
                  <CCol md="6" lg="6" xl="6">
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Nombre completo"
                        autoComplete="fullname"
                        id="fullName"
                        onChange={this.handleChange}
                        value={this.state.fullName}
                        disabled={this.state.loading}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <i className="fas fa-id-card"></i>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Número de identificación"
                        autoComplete="identification_number"
                        id="dni"
                        onChange={this.handleChange}
                        value={this.state.dni}
                        disabled={this.state.loading}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <i className="fas fa-map-marker-alt"></i>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Dirección"
                        autoComplete="address"
                        id="address"
                        onChange={this.handleChange}
                        value={this.state.address}
                        disabled={this.state.loading}
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol md="6" lg="6" xl="6">
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
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <i className="fas fa-birthday-cake"></i>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="date"
                        placeholder="Fecha de nacimiento"
                        autoComplete="birthdate"
                        id="birthdate"
                        onChange={this.handleChange}
                        value={this.state.birthdate}
                        disabled={this.state.loading}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <i className="fas fa-phone"></i>
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Número de teléfono"
                        autoComplete="phone_number"
                        id="phoneNumber"
                        onChange={this.handleChange}
                        value={this.state.phoneNumber}
                        disabled={this.state.loading}
                      />
                    </CInputGroup>
                    <CButton
                      color="success"
                      type="submit"
                      block
                      className="mb-3"
                    >
                      {this.state.loading ? (
                        <i
                          style={{ fontSize: "15px" }}
                          className="fas fa-spinner fa-pulse"
                        ></i>
                      ) : (
                        "Guardar Cambios"
                      )}
                    </CButton>
                  </CCol>
                </CRow>
                {this.state.error &&
                this.state.show === 'profile' &&
                  <CAlert color="danger" >
                    {this.state.error}
                  </CAlert>
                }
                {this.state.success &&
                this.state.show === 'profile' &&
                  <CAlert color="success">
                    {this.state.success}
                  </CAlert>
                }
              </CForm>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardHeader>Actualizar contraseña</CCardHeader>
            <CCardBody>
              <CForm onSubmit={this.handlePassword}>
                <CRow>
                  <CCol md="6" lg="6" xl="6">
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="new-password"
                        id="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        disabled={this.state.loadingUpdate}
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol md="6" lg="6" xl="6">
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Repita la contraseña"
                        autoComplete="new-password"
                        id="password_confirmation"
                        onChange={this.handleChange}
                        disabled={this.state.loadingUpdate}
                        value={this.state.password_confirmation}
                      />
                    </CInputGroup>
                    <CButton
                      color="success"
                      type="submit"
                      block
                      className="mb-3"
                    >
                      {this.state.loadingUpdate ? (
                        <i
                          style={{ fontSize: "15px" }}
                          className="fas fa-spinner fa-pulse"
                        ></i>
                      ) : (
                        "Guardar Cambios"
                      )}
                    </CButton>
                  </CCol>
                </CRow>
                {this.state.error &&
                this.state.show === 'password' &&
                  <CAlert color="danger">
                    {this.state.error}
                  </CAlert>
                }
                {this.state.success &&
                this.state.show === 'password' &&
                  <CAlert color="success">
                    {this.state.success}
                  </CAlert>
                }
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    );
  }
}

export default Perfil;
