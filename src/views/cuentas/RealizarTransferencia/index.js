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

const RealizarTransferencia = () => {
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>Transferir</CCardHeader>
          <CCardBody>
            <CForm>
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="from">Seleccionar cuenta a debitar</CLabel>
                    <CSelect custom name="from" id="from">
                      <option value="456543212">456543212</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="to">Cuenta a transferir</CLabel>
                    <CInput
                      id="to"
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
                      placeholder="Ingrese monto a transferir"
                      required
                    />
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12" className="text-center mt-2">
                  <CButton type="submit" color="primary">
                    Transferir
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

export default RealizarTransferencia;
