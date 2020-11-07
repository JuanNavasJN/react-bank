import React, { Component } from 'react';
import axios from 'axios';
import {ip} from '../../../utility'
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
  CAlert
} from '@coreui/react'
import { of } from 'core-js/fn/array';

class NewPassword extends Component {
  state = {
    email: "",
    loading:false,
    password_confirmation: "",
    token:''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  componentDidMount = () =>{
    console.log('this.props.history.location', this.props.history.location)
    // if(){
    //   this.setState({token:this.props.history.location})
    // }
  }

  handleSubmit = () => {
    if(this.state.email === "" ){
     this.setState({error:'Debe completar el campo de contraseña.',success:''})
    }else if (this.state.password_confirmation === ''){
      this.setState({error:'Debe completar el campo de confirmación de contraseña.',success:''})
    } else if (this.state.password_confirmation !== this.state.password) {
      this.setState({ error: "Las contraseñas no coinciden.", success: "" });
    } else if (
      !this.state.password ||
      !this.state.password.length ||
      this.state.password.length < 7
    ) {
      this.setState({
        error: "La contraseña debe tener al menos 7 caracteres.",
      });
    } else if (
      // eslint-disable-next-line
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.state.password)
    ) {
      this.setState({
        error:
          "Debe utilizar al menos 1 carácter especial como !@#$%^&*() en su contraseña.",
      });
    } else if (!/[0-9]/.test(this.state.password)) {
      this.setState({ error: "La contraseña debe incluir al menos 1 número." });
    } else if (/\s/.test(this.state.password)) {
      this.setState({ error: "La contraseña no puede contener espacios." });
    }else{
      this.setState({loading:true})
      let data = {
        password: this.state.password,
        token:this.state.token
      }
  
      axios.post(`${ip}/auth/new-password`, data )
      .then(response => {
        this.setState({error:'',success:'La contraseña se ha cambiado exitosamente.', loading:false
        })
      })
      .catch(error => {
        this.setState({error:error.response.data.error,success:'', loading:false})
      })
    }
  }
  render() { 
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Recuperar contraseña</h1>
                    <p className="text-muted">¿Olvidaste tu contraseña? Proporciona el correo electrónico asociado a tu cuenta para recuperarla, solo espera a que llegue el correo!</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          @
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Correo electrónico"
                        autoComplete="email" id='email' 
                        onChange={this.handleChange}
                        value={this.state.email}
                        disabled={this.state.loading}/>
                    </CInputGroup>
                    <CRow className="mb-4">
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={()=>this.handleSubmit()}>{this.state.loading ? <i style={{fontSize:'15px'}} className="fas fa-spinner fa-pulse"></i> : "Enviar"}</CButton>
                      </CCol>
                    </CRow>
                    {this.state.error &&
                      <CAlert color="danger">
                        {this.state.error}
                      </CAlert>
                    }
                    {this.state.success &&
                      <CAlert color="success">
                        {this.state.success}
                      </CAlert>
                    }
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )}
}

export default NewPassword
