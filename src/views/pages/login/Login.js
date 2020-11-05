import React, { Component } from 'react';
import { Link } from 'react-router-dom'
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
import CIcon from '@coreui/icons-react'

class Login extends Component {
  state = {
    email: "",
    password: "",
    error:"",
    success:"",
    loading:false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = () => {
    if(this.state.email === "" ||
    this.state.password === "" ){
     this.setState({error:'You must complete the form for Login.',success:''})
    }{
      this.setState({loading:true})
      let data = {
        email: this.state.email,
        password: this.state.password
      }
  
      axios.post(`${ip}/auth/signin`, data )
      .then(response => {
        this.setState({error:'',success:'Logged successfully!',
          email: "",
          password: "", 
          loading:false
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
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          @
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Email"
                        autoComplete="email" id='email' 
                        onChange={this.handleChange}
                        value={this.state.email}
                        disabled={this.state.loading}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" id='password' 
                            onChange={this.handleChange}
                            value={this.state.password} autoComplete="current-password" disabled={this.state.loading}/>
                    </CInputGroup>
                    <CRow className="mb-4">
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={()=>this.handleSubmit()}>{this.state.loading ? <i style={{fontSize:'15px'}} className="fas fa-spinner fa-pulse"></i> : "Login"}</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0" disabled={this.state.loading}>Forgot password?</CButton>
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
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Do you want to be part of our community? just fill out the following form and you can enjoy our benefits!</p>
                    <Link to="/register" disabled={this.state.loading}>
                      <CButton color="primary" disabled={this.state.loading} className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )}
}

export default Login
