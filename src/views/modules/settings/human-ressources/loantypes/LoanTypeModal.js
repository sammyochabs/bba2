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
  CRow,
} from "@coreui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { checkBeforeUpdate } from "src/actions/global";
import { addLoanType, updateLoanType } from "src/actions/loantypes";

const LoanTypeModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  selectedItem,
}) => {
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  var formData = new FormData();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    return console.log(data);
  };

  const handleSubmit = (e, type) => {
    switch (type) {
      case "Add":
        formData.append("loanType", data.loantype);
        dispatch(addLoanType(formData, userID));
        toggle();
        break;
      case "Update":
        formData.append("loanTypeID", currentValue);
        formData.append(
          "loantype",
          checkBeforeUpdate(data.loantype, selectedItem?.LOAN_TYPE)
        );
        dispatch(updateLoanType(formData, userID));
        toggle();
        break;

      default:
        break;
    }
  };
  return (
    <CModal show={modal} onClose={toggle} centered>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CRow>
          <CCol sm="12">
            <form onSubmit={handleSubmit}>
              <CFormGroup>
                <CLabel htmlFor="nf-loantype">Loan type</CLabel>
                <input
                  type="text"
                  id="nf-loantype"
                  name="loantype"
                  placeholder="Enter Loan type.."
                  onChange={handleInput}
                  className="form-control"
                  defaultValue={selectedItem?.LOAN_TYPE}
                  required={true}
                />
              </CFormGroup>
            </form>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="info" onClick={(e) => handleSubmit(e, type)}>
          {type}
        </CButton>{" "}
        <CButton color="secondary" onClick={toggle}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default LoanTypeModal;
