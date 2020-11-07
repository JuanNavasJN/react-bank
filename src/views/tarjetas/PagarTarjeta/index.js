import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CForm,
  CButton,
} from "@coreui/react";

const PagarTarjeta = () => {
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>Pagar tarjeta</CCardHeader>
          <CCardBody>
            <CForm>
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="account">Seleccionar cuenta</CLabel>
                    <CSelect custom name="account" id="account">
                      <option value="456543212">456543212</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="card">Seleccionar tarjeta</CLabel>
                    <CSelect custom name="card" id="card">
                      <option value="456543212">4645123412341234</option>
                    </CSelect>
                  </CFormGroup>
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
                    />
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12" className="text-center mt-2">
                  <CButton type="submit" color="primary">
                    Pagar
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
