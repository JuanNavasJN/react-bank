import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import {ip} from '../../../utility'
import {
  CButton,
  CCard,
  CCardBody,
  // CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

class Register extends Component {
  state = {
    fullName: "",
    password_confirmation:"",
    email: "",
    password: "",
    birthdate: "",
    business: false,
    phoneNumber: "",
    address: "",
    dni: "",
    error:"",
    success:"",
    businessName:"",
    loading:false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleRegister = () => {
    if(this.state.fullName === "" ||
    this.state.password_confirmation === "" ||
    this.state.email === "" ||
    this.state.password === "" ||
    this.state.birthdate === "" ||
    this.state.phoneNumber === "" ||
    this.state.address === "" ||
    this.state.dni === ""){
     this.setState({error:'You must complete the form to create an account.',success:''})
    }else if(this.state.password_confirmation !== this.state.password){
      this.setState({error:'Passwords do not match.',success:''})
    }else if(this.state.business && this.state.businessName === ''){
      this.setState({error:'You must specify the name of the Business.',success:''})
    }else if (!(this.state.password).trim('')) {
      this.setState({error:'Please enter the Password.'})
    }else if ( !this.state.password || !this.state.password.length || this.state.password.length < 8 ) {
      this.setState({error:'The password must be at least 8 characters long.'})
    }else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.state.password)) {
      this.setState({error:'You must use at least 1 special character like !@#$%^&*() in your password.'})
    }else if (!/[0-9]/.test(this.state.password)) {
      this.setState({error:'The password must include at least 1 number.'})
    }else if ( /\s/.test(this.state.password)) {
      this.setState({error:'The password can not contain spaces.'})
    }else{
      this.setState({loading:true})
      let data = {
        fullName: this.state.fullName,
        email: this.state.email,
        password: this.state.password,
        birthdate: this.state.birthdate,
        business:  this.state.business ? this.state.businessName : '',
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        dni: this.state.dni,
        country:'Venezuela'
      }
  
      axios.post(`${ip}/auth/signup`, data )
      .then(response => {
        this.setState({error:'',success:'Your account has been created successfully!',
          fullName: "",
          password_confirmation:"",
          email: "",
          password: "",
          birthdate: "",
          business: false,
          phoneNumber: "",
          businessName:"",
          address: "",
          dni: "",
          loading:false
        })
      })
      .catch(error => {
        this.setState({error:error.response.data.error,success:'',
        loading:false})
      })
    }
  }

  render() { 
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Register</h1>
                    <p className="text-muted">Create an account on React Bank</p>
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
                            placeholder="Fullname"
                            autoComplete="fullname"
                            id='fullName' 
                            onChange={this.handleChange}
                            value={this.state.fullName}
                            disabled={this.state.loading}
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText><i class="fas fa-id-card"></i></CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder="Identification Number" autoComplete="identification_number" id='dni' 
                            onChange={this.handleChange}
                            value={this.state.dni}
                            disabled={this.state.loading}/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            <i class="fas fa-map-marker-alt"></i>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder="Address" autoComplete="address" id='address' 
                            onChange={this.handleChange}
                            value={this.state.address}
                            disabled={this.state.loading}/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            id='password' 
                            onChange={this.handleChange}
                            value={this.state.password}
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
                            type="text"
                            placeholder="Email"
                            autoComplete="email"
                            id='email' 
                            onChange={this.handleChange}
                            value={this.state.email}
                            disabled={this.state.loading}
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            <i class="fas fa-birthday-cake"></i>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="date" placeholder="Birth of Date" autoComplete="birthdate" 
                          id='birthdate' 
                          onChange={this.handleChange}
                          value={this.state.birthdate}
                          disabled={this.state.loading}/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                            <i class="fas fa-phone"></i>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder="Phone Number" autoComplete="phone_number" id='phoneNumber' 
                          onChange={this.handleChange}
                          value={this.state.phoneNumber}
                          disabled={this.state.loading}/>
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            placeholder="Repeat password"
                            autoComplete="new-password"
                            id='password_confirmation' 
                            onChange={this.handleChange}
                            disabled={this.state.loading}
                            value={this.state.password_confirmation}
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <input style={{cursor:'pointer'}} type="checkbox" id="business" name="business" checked={this.state.business} defaultChecked={this.state.business} onChange={()=>this.setState({business:!this.state.business})} value="business"/>
                    <label for="business" className="pl-2"> Is it Business?</label>
                    {this.state.business &&
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                          <i class="fas fa-industry"></i>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          placeholder="Business Name"
                          autoComplete="business-name"
                          id='businessName' 
                          onChange={this.handleChange}
                          value={this.state.businessName}
                        />
                      </CInputGroup>
                    }
                    <CButton color="success" block onClick={()=>this.handleRegister()}>
                    {this.state.loading ? <i style={{fontSize:'15px'}} className="fas fa-spinner fa-pulse"></i> : "Create Account"}
                    </CButton>
                    <Link to="/login" disabled={this.state.loading}>
                      <CButton color="link" active tabIndex={-1} disabled={this.state.loading}>Are you already part of React Bank? Login</CButton>
                    </Link>
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
                {/* <CCardFooter className="p-4">
                  <CRow>
                    <CCol xs="12" sm="6">
                      <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                    </CCol>
                    <CCol xs="12" sm="6">
                      <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                    </CCol>
                  </CRow>
                </CCardFooter> */}
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default Register;
