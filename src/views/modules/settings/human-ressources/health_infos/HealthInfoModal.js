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
import { addHealthInfo, updateHealthInfo } from "src/actions/healthinfo";

const HealthInfoModal = ({
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
        formData.append("HealthInfo", data.healthinfo);
        dispatch(addHealthInfo(formData, userID));
        toggle();
        break;
      case "Update":
        formData.append("HealthInfoID", currentValue);
        formData.append(
          "HealthInfo",
          checkBeforeUpdate(data.healthinfo, selectedItem?.HealthInfo)
        );
        dispatch(updateHealthInfo(formData, userID));
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
                <CLabel htmlFor="nf-grade">Health information</CLabel>
                <CInput
                  className="p-0 col-12"
                  type="text"
                  name="healthinfo"
                  placeholder="Health information"
                  onChange={handleInput}
                  defaultValue={selectedItem?.HealthInfo}
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

export default HealthInfoModal;
