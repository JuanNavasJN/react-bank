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

class ForgotPassword extends Component {
  state = {
    email: "",
    loading:false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = () => {
    if(this.state.email === "" ){
     this.setState({error:'Debe completar el campo de correo contraseña.',success:''})
    }{
      this.setState({loading:true})
      let data = {
        email: this.state.email
      }
  
      axios.post(`${ip}/auth/recover`, data )
      .then(response => {
        this.setState({error:'',success:'El correo fue enviado a su bandeja de entrada satisfactoriamente.', loading:false
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
                      <CInput type="email" placeholder="Correo electrónico"
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

export default ForgotPassword
