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
  CSelect,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addLeave, updateLeave } from "src/actions/leaves";
import { setActiveOption, checkBeforeUpdate } from "src/actions/global";

const LeavesModal = ({
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
  useEffect(() => {
    setData(selectedItem);
  }, [selectedItem]);
  const handleSubmit = (e, type) => {
    switch (type) {
      case "Add":
        formData.append("Leave", data.leave_type);
        formData.append("DayPerYear", data.days_per_year);
        data.days_per_year > 365
          ? alert("Please make sure the days per year are lower than 365")
          : dispatch(addLeave(formData, userID));
        toggle();
        break;
      case "Update":
        formData.append("LeaveID", currentValue);
        formData.append(
          "Leave",
          checkBeforeUpdate(data.leave_type, selectedItem?.LEAVE_TYPE)
        );
        formData.append(
          "DayPerYear",
          checkBeforeUpdate(data.days_per_year, selectedItem?.DAYS_PER_YEAR)
        );
        data.days_per_year > 365
          ? alert("Please make sure the days per year are lower than 365")
          : dispatch(updateLeave(formData, userID));
        toggle();
        break;

      default:
        break;
    }
  };
  const options = ["Earned leave", "Medical leave", "Casual leave"];
  return (
    <CModal show={modal} onClose={toggle} centered>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CRow>
          <CCol sm="12">
            <CForm onSubmit={handleSubmit}>
              <CFormGroup>
                <CLabel htmlFor="nf-leave">Leave type</CLabel>
                <CSelect custom name="leave_type" onChange={handleInput}>
                  {options.map((item, index) => (
                    <option
                      key={index}
                      value={item}
                      selected={setActiveOption(item, selectedItem?.LEAVE_TYPE)}
                    >
                      {item}
                    </option>
                  ))}
                </CSelect>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-grade">Days per year</CLabel>
                <CInput
                  className="p-0 col-12"
                  type="number"
                  min="0"
                  max="365"
                  name="days_per_year"
                  onChange={handleInput}
                  defaultValue={selectedItem?.DAYS_PER_YEAR}
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

export default LeavesModal;
