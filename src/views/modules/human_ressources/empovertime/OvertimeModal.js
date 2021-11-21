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
  CTextarea,
} from "@coreui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addOvertime,
  updateOvertime,
} from "src/actions/HumanRessource/empovertime";
import SelectLoanType from "./SelectLoanType";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OvertimeModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  size,
  emplist,
  overtimestype,
  overtime_selected_obj,
}) => {
  const [data, setData] = useState({});
  const [fromDate, setfromDate] = useState(new Date());

  const dispatch = useDispatch();
  var formData = new FormData();
  console.log(overtime_selected_obj, "overtime_selected_obj modal ");
  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(type, "typeeeeee");
    if (type == "Update") {
      overtime_selected_obj.EmployeeID =
        e.target.name == "empid"
          ? e.target.value
          : overtime_selected_obj.EmployeeID;

      overtime_selected_obj.OvertimeTypeID =
        e.target.name == "OvertimeTypeID"
          ? e.target.value
          : overtime_selected_obj.OvertimeTypeID;

      overtime_selected_obj.OvertimeID = currentValue;

      overtime_selected_obj.Description =
        e.target.name == "Description"
          ? e.target.value
          : overtime_selected_obj.Description;

      overtime_selected_obj.overtimeDate = formatDate(fromDate);
      overtime_selected_obj.Hours =
        e.target.name == "OvertimeHours"
          ? e.target.value
          : overtime_selected_obj.Hours;

      overtime_selected_obj.SuperiorMemo =
        e.target.name == "SuperiorMemo"
          ? e.target.value
          : overtime_selected_obj.SuperiorMemo;
    }

    return console.log(data);
  };
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month?.length < 2) month = "0" + month;
    if (day?.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  }
  const handleSubmit = (e, type) => {
    e.preventDefault();
    switch (type) {
      case "Add":
        formData.append("UserID", 1);
        formData.append("EmployeeID", data.empid);
        formData.append("OvertimeTypeID", data.OvertimeTypeID);
        formData.append("Description", data.Description);
        formData.append("overtimeDate", formatDate(fromDate));
        formData.append("OvertimeHours", data.OvertimeHours);
        formData.append("SuperiorMemo", data.SuperiorMemo);

        dispatch(addOvertime(formData, userID));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        break;
      case "Update":
        formData.append("UserID", 1);
        formData.append("EmployeeID", overtime_selected_obj.EmployeeID);
        formData.append("OvertimeID", currentValue);
        formData.append("OvertimeTypeID", overtime_selected_obj.OvertimeTypeID);
        formData.append("Description", overtime_selected_obj.Description);
        formData.append("overtimeDate", formatDate(fromDate));
        formData.append("OvertimeHours", overtime_selected_obj.Hours);
        formData.append("SuperiorMemo", overtime_selected_obj.SuperiorMemo);
        dispatch(updateOvertime(formData, userID));
        setTimeout(() => {
          window.location.reload();
        }, 1000);

        break;

      default:
        break;
    }
  };
  return (
    <CModal show={modal} size={size} onClose={toggle} centered>
      <CModalHeader closeButton>{type}</CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol md="6">
              <CFormGroup>
                <CLabel htmlFor="nf-overtime">Employee</CLabel>
                <CSelect
                  value={
                    overtime_selected_obj
                      ? overtime_selected_obj.EmployeeID
                      : data.empid
                  }
                  name="empid"
                  onChange={handleInput}
                  aria-label="Default select example"
                >
                  <option> Please select </option>
                  {emplist != undefined
                    ? emplist.map((team) => (
                        <option value={team.EmployeeID}>{team.Name}</option>
                      ))
                    : ""}
                </CSelect>
                {/* <SelectLoanType /> */}
              </CFormGroup>
            </CCol>
            <CCol md="6">
              <CFormGroup>
                <CLabel htmlFor="nf-overtime">Overtime type</CLabel>
                <CSelect
                  value={
                    overtime_selected_obj
                      ? overtime_selected_obj.OvertimeTypeID
                      : data.OvertimeTypeID
                  }
                  name="OvertimeTypeID"
                  onChange={handleInput}
                  aria-label="Default select example"
                >
                  <option>Select Overtime Type</option>
                  {overtimestype != undefined
                    ? overtimestype.map((team) => (
                        <option value={team.OvertimeID}>
                          {team.OverTime + "(" + team.HourlyRate + ")"}
                        </option>
                      ))
                    : ""}
                </CSelect>
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12" className="mb-2">
              <CLabel htmlFor="nf-grade">Description</CLabel>
              <CTextarea
                value={
                  overtime_selected_obj
                    ? overtime_selected_obj.Description
                    : data.Description
                }
                name="Description"
                onChange={handleInput}
                size="lg"
                placeholder="Overtime Details"
              ></CTextarea>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="6">
              <CLabel htmlFor="nf-grade">Overtime Date</CLabel>
              <DatePicker
                value={
                  overtime_selected_obj
                    ? overtime_selected_obj.DateStatus
                    : { fromDate }
                }
                name="overtimeDate"
                selected={fromDate}
                className="p-0 col-12"
                dateFormat="dd/MM/yyyy"
                onChange={(date) => setfromDate(date)}
                placeholder="Overtime Date"
              />
              {/* <CInput
                className="p-0 col-12"
                type="text"
                placeholder="Overtime Date"
                name="overtimeDate"
                onChange={handleInput}
                required
              /> */}
            </CCol>
            <CCol md="6">
              <CLabel htmlFor="nf-grade">Overtime Hours</CLabel>
              <CInput
                value={
                  overtime_selected_obj
                    ? overtime_selected_obj.Hours
                    : data.OvertimeHours
                }
                className="p-0 col-12"
                type="number"
                placeholder="Overtime Hours"
                name="OvertimeHours"
                onChange={handleInput}
                required
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12" className="mt-2">
              <CLabel htmlFor="nf-grade">Memo</CLabel>
              <CTextarea
                value={
                  overtime_selected_obj
                    ? overtime_selected_obj.SuperiorMemo
                    : data.SuperiorMemo
                }
                name="SuperiorMemo"
                onChange={handleInput}
                size="lg"
                placeholder="Memo"
              ></CTextarea>
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton
          hidden={type == "View"}
          color="info"
          onClick={(e) => handleSubmit(e, type)}
        >
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
