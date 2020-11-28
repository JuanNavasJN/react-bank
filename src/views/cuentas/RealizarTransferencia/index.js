import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CInput,
  CForm,
  CButton,
  CInputGroupText,
  CAlert
} from "@coreui/react";
import axios from "axios";
import { ip } from "../../../utility";

class RealizarTransferencia extends Component{
  state = {
    nro:'',
    type:'',
    available:0,
    to:'',
    amount:'',
    maximum_reached:false,
    loading:false,
    success:'',
    error:''
  };

  currencyFormat = (e) => {
    let x = e.target.value;
    x = x.replace(/[^0-9]/gi,"");
    let y = "";
    if(x.length > 5){
      let nuevaLong = x.length - 2;
      let start = nuevaLong % 3;
      if ( start !== 0 ){
        start = 3 - start;
      }
      for (var i = 0; i < nuevaLong; i++){
        y += x[i];
        start++;
        if ( start === 3 && i !== nuevaLong-1 ){
          y += ".";
          start=0;
        }
      }
      y += ",";
      y += x[x.length-2];
      y += x[x.length-1];
      this.setState({[e.target.id]: y})
    }else{
      if( x !== '00' ){
        x = (x/100).toFixed(2);
        let y = String(x).split('.').join(',')
        this.setState({[e.target.id]: y})
      }else{
        this.setState({[e.target.id]:''})
      }
    }	
  }

  componentDidMount = () =>{
    axios
    .get(`${ip}/accounts`,{headers: {Authorization: localStorage.getItem("token")}})
    .then((res) => {
      let aux = res.data[0]
      this.setState({
        nro: aux.nro ? aux.nro : this.state.nro,
        type: aux.type ? aux.type : this.state.type
      });
      if(aux.available){
        let e={
          target:{
            value:aux.available,
            id:'available'
          }
        }
        this.currencyFormat(e)
      }
    })
  }

  componentDidUpdate = (prevProps, prevState) =>{
    if(prevState.amount !== this.state.amount){
      if(parseInt(this.state.amount.replace(/[^0-9]/gi,"")) > parseInt(this.state.available.replace(/[^0-9]/gi,""))){
        this.setState({maximum_reached:true})
      }else{
        this.setState({maximum_reached:false})
      }
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) =>{
    e.preventDefault()
    let data = {
      fromAccount: this.state.nro,
      toAccount: this.state.to,
      amount: parseFloat(this.state.amount.split('.').join('').split(',').join('.')).toFixed(2)
    }
    axios
    .post(`${ip}/transfer`, data, {headers: {Authorization: localStorage.getItem("token")}})
    .then((res) => {
      let aux = (parseFloat(this.state.available.split('.').join('').split(',').join('.')).toFixed(2)) - (parseFloat(this.state.amount.split('.').join('').split(',').join('.')).toFixed(2))
      let aux2 = {
        target:{
          value:String(aux.toFixed(2)),
          id:'available'
        }
      }
      this.currencyFormat(aux2)
      this.setState({
        loading:false,
        amount:'',
        to:'',
        success:'La transferencia se realizo exitosamente.'
      });
    })
    .catch((error) => {
      this.setState({
        error: error.response.data.msg,
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
            <CCardHeader>Transferir</CCardHeader>
            <CCardBody>
              <CForm onSubmit={this.handleSubmit} style={{marginBottom:'8px'}}>
                <CRow>
                  <CCol xs="12">
                    <div style={{marginBottom:'8px'}}>
                      <span>Cuenta a debitar</span>
                      <CInputGroupText>
                        {this.state.nro}
                      </CInputGroupText>
                      <span  style={{color:'#4d54d4'}}>Saldo disponible: {this.state.available} bs</span>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="to">Cuenta a transferir</CLabel>
                      <CInput
                        id="to"
                        value={this.state.to}
                        onChange={(e)=>this.handleChange(e)}
                        placeholder="Ingrese número de cuenta"
                        required
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="amount">Monto a transferir</CLabel>
                      <CInput
                        id="amount"
                        value={this.state.amount}
                        onChange={(e)=>this.currencyFormat(e)}
                        placeholder="Ingrese monto a transferir"
                        required
                      />
                      {this.state.maximum_reached &&
                         <span style={{color:'red'}}>El monto excede el saldo disponible.</span>
                      }
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" className="text-center mt-2">
                    <CButton disabled={this.state.maximum_reached} type="submit" color="primary">
                      {this.state.loading ? 
                        <i
                          style={{ fontSize: "15px" }}
                          className="fas fa-spinner fa-pulse"
                        ></i>
                       : 
                        "Transferir"
                      }
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
              {this.state.error && (
                <CAlert color="danger">{this.state.error}</CAlert>
              )}
              {this.state.success && (
                <CAlert color="success">{this.state.success}</CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
   );
  }
}

export default RealizarTransferencia;
