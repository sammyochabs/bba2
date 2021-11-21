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
import { addgrade, updateGrade } from "../../../../../actions/grades";

const GradesModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  selectedItem,
}) => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  var formData = new FormData();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    return console.log(data);
  };

  const handleSubmit = (e, type) => {
    switch (type) {
      case "Add":
        formData.append("Grade", data.grade);
        formData.append("PayFrom", data.pay_scale_from);
        formData.append("PayTo", data.pay_scale_to);
        dispatch(addgrade(formData, userID));
        toggle();
        break;
      case "Update":
        formData.append("GradeID", currentValue);
        formData.append(
          "Grade",
          checkBeforeUpdate(data.grade, selectedItem?.GRADE)
        );
        formData.append(
          "PayFrom",
          checkBeforeUpdate(data.pay_scale_from, selectedItem?.PAY_SCALE_FROM)
        );
        formData.append(
          "PayTo",
          checkBeforeUpdate(data.pay_scale_to, selectedItem?.PAY_SCALE_TO)
        );
        dispatch(updateGrade(formData, userID));
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
            <CForm onSubmit={handleSubmit}>
              <CFormGroup>
                <CLabel htmlFor="nf-grade">Grade</CLabel>
                <CInput
                  className="p-0 col-12"
                  type="text"
                  name="grade"
                  placeholder="Grade"
                  onChange={handleInput}
                  defaultValue={selectedItem?.GRADE}
                  required
                />
              </CFormGroup>
              <CFormGroup>
                <div className="label-value">
                  <CLabel htmlFor="nf-pay-scale">Pay scale from</CLabel>
                  <span>{data.pay_scale_from}</span>
                </div>
                <CInput
                  className="p-0 col-12"
                  type="number"
                  name="pay_scale_from"
                  placeholder="0"
                  onChange={handleInput}
                  defaultValue={selectedItem?.PAY_SCALE_FROM}
                  required
                />
              </CFormGroup>
              <CFormGroup>
                <div className="label-value">
                  <CLabel htmlFor="nf-pay-scale">Pay scale to</CLabel>
                  <span>{data.pay_scale_to}</span>
                </div>
                <CInput
                  className="p-0 col-12"
                  type="number"
                  name="pay_scale_to"
                  placeholder="0"
                  onChange={handleInput}
                  defaultValue={selectedItem?.PAY_SCALE_TO}
                  required
                />
              </CFormGroup>
            </CForm>
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

export default GradesModal;
