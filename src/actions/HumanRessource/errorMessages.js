import {
    CButton,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CRow,CSelect
  } from "@coreui/react";
const ErrorMessage = ({modal,toggle,responseCode}) => {
    var data = {        
    "ERR1": "Inactif user",
    "ERR2": "Internal error",
    "VAL1": "Validation with success ",
    "VAL2": "Update successfully done ",
    "VAL3": "Delete successfully done",
    "ERR3": "Record used",
    "ERR4": "Invalid value",
    "EMP1": "Promotion date is less than the last promotion date",
    "EMP2": "Promotion date is greater than the today's date",
    "LOAN1": "Action not allowed for this loan",
    "LEAVE1": "Action not allowed for this leave",
    "OVERTIME1": "Action not allowed for this overtime",
}
return (
<CModal show={modal} onClose={toggle} centered id="errorModal">
    <CModalHeader closeButton>Alert</CModalHeader>
    <CModalBody>
    <CRow>
        <CCol sm="12">
        <CForm>
            <CFormGroup>
            {data[responseCode]}
            </CFormGroup>
        </CForm>
        </CCol>
    </CRow>
    </CModalBody>
</CModal>
);
}

export default ErrorMessage;