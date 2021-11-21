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
import { addOvertime, updateOvertime } from "src/actions/overtime";

const OvertimeModal = ({
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
        formData.append("OvertimeType", data.overtime);
        formData.append("HourlyRate", data.hourly_rate);
        dispatch(addOvertime(formData, userID));
        toggle();
        break;
      case "Update":
        formData.append("OvertimeID", currentValue);
        formData.append(
          "OvertimeType",
          checkBeforeUpdate(data.overtime, selectedItem?.OverTime)
        );
        formData.append(
          "HourlyRate",
          checkBeforeUpdate(data.hourly_rate, selectedItem?.HourlyRate)
        );
        dispatch(updateOvertime(formData, userID));
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
                <CLabel htmlFor="nf-overtime">Overtime type</CLabel>
                <CInput
                  className="p-0 col-12"
                  type="text"
                  name="overtime"
                  onChange={handleInput}
                  defaultValue={selectedItem?.OverTime}
                  required
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-rate">Hourly rate</CLabel>
                <CInput
                  className="p-0 col-12"
                  type="number"
                  name="hourly_rate"
                  onChange={handleInput}
                  defaultValue={selectedItem?.HourlyRate}
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

export default OvertimeModal;
