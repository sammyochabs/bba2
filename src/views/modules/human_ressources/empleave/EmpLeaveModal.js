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
import { number } from "prop-types";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmpLeave,
  approveLeave,
  cancelLeave,
  updateEmpLeave,
} from "src/actions/HumanRessource/empleave";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateLeave } from "src/actions/leaves";

const EmpLeaveModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  emplist,
  leavelist,
  leave_selected_obj,
}) => {
  const empid = useRef(null);
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  console.log(type, "type");
  if (type == "Update") {
  }

  const [fromDate, setfromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  let [noDays, setNoDays] = useState();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (type == "Update") {
      leave_selected_obj.EmployeeID =
        e.target.name == "empid"
          ? e.target.value
          : leave_selected_obj.EmployeeID;
      leave_selected_obj.LeaveID =
        e.target.name == "nameofleave"
          ? e.target.value
          : leave_selected_obj.LeaveID;

      leave_selected_obj.Cause =
        e.target.name == "cause" ? e.target.value : leave_selected_obj.Cause;
      leave_selected_obj.FromDate = fromDate;
      leave_selected_obj.ToDate = toDate;
      leave_selected_obj.Duration = data.duration;
      leave_selected_obj.EmployeeMemo =
        e.target.name == "EmployeeMemo"
          ? e.target.value
          : leave_selected_obj.EmployeeMemo;

      leave_selected_obj.SuperiorMemo =
        e.target.name == "SuperiorMemo"
          ? e.target.value
          : leave_selected_obj.SuperiorMemo;

      console.log(e.target.name, "e.target.name");
    }
    console.log(data, "data");
    return data;
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

  const setAndCalNumberOfDays = (e) => {
    var formattedDate = formatDate(e);
    setToDate(e);
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(fromDate);
    const secondDate = new Date(e);

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    var dif = diffDays;
    if (isNaN(dif)) {
      dif = 0;
    }
    console.log(dif, "dif");

    setNoDays(dif);
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    var formData = new FormData();
    switch (type) {
      case "Add":
        formData.append("UserID", localStorage.getItem("userID"));
        formData.append("EmployeeID", data.empid);
        formData.append("LeaveTypeID", data.nameofleave);
        formData.append("Cause", data.cause);
        formData.append("FromDate", formatDate(fromDate));
        formData.append("ToDate", formatDate(toDate));
        formData.append("EmployeeMemo", data.EmployeeMemo);
        formData.append("SuperiorMemo", data.SuperiorMemo);

        console.log(formData, "formData");

        dispatch(addEmpLeave(formData, userID));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        break;
      case "Update":
        console.log(data, "data");

        formData.append("UserID", localStorage.getItem("userID"));
        formData.append("EmployeeID", leave_selected_obj.EmployeeID);
        formData.append("LeaveID", currentValue);
        formData.append("LeaveTypeID", leave_selected_obj.LeaveID);
        formData.append("Cause", leave_selected_obj.Cause);
        formData.append("FromDate", formatDate(fromDate));
        formData.append("ToDate", formatDate(toDate));
        formData.append("EmployeeMemo", leave_selected_obj.EmployeeMemo);
        formData.append("SuperiorMemo", leave_selected_obj.SuperiorMemo);

        // formData.append("UserID", 1);
        // formData.append("EmployeeID", data.empid);
        // formData.append("LeaveID", currentValue);
        // formData.append("LeaveTypeID", data.nameofleave);
        // formData.append("Cause", data.cause);
        // formData.append("FromDate", formatDate(fromDate));
        // formData.append("ToDate", formatDate(toDate));
        // formData.append("EmployeeMemo", data.EmployeeMemo);
        // formData.append("SuperiorMemo", data.SuperiorMemo);
        dispatch(updateEmpLeave(formData, userID));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        break;

      case "Approve":
        formData.append("UserId", localStorage.getItem("userID"));
        formData.append("LeaveId", currentValue);
        dispatch(approveLeave(formData, userID));
        window.location.reload();
        break;

      case "Cancel":
        formData.append("UserId", localStorage.getItem("userID"));
        formData.append("LeaveId", currentValue);
        dispatch(cancelLeave(formData, userID));
        window.location.reload();
        break;
      default:
        break;
    }
  };
  return (
    <CModal show={modal} onClose={toggle} centered>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <CFormGroup>
            <CRow>
              <CCol sm="6">
                <CLabel htmlFor="nr-emp">Employee Name</CLabel>
                {emplist?.length === 1 ? (
                  <CSelect
                    value={emplist[0]?.NameEnglish}
                    name="empid"
                    onChange={handleInput}
                    aria-label="Default select example"
                  >
                    {/* <option> Please select </option> */}
                    {
                      <option value={emplist[0].EmployeeID}>
                        {emplist[0]?.NameEnglish}
                      </option>
                    }
                    {/* {emplist != undefined
                    ? emplist.map((team) => (
                        <option value={team.EmployeeID}>{team.Name}</option>
                      ))
                    : data.empid} */}
                  </CSelect>
                ) : (
                  <CSelect
                    value={
                      leave_selected_obj
                        ? leave_selected_obj.EmployeeID
                        : data.empid
                    }
                    ref={empid}
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
                )}

                <CLabel htmlFor="nf-grade">From Date</CLabel>

                <DatePicker
                  name="fromdate"
                  selected={fromDate}
                  value={
                    leave_selected_obj != undefined
                      ? leave_selected_obj.FromDate
                      : { fromDate }
                  }
                  className="p-0 col-12"
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => setfromDate(date)}
                  placeholder="From Date"
                />

                <CLabel htmlFor="nf-grade">To Date</CLabel>

                <DatePicker
                  name="todate"
                  selected={toDate}
                  value={
                    leave_selected_obj != undefined
                      ? leave_selected_obj.ToDate
                      : { toDate }
                  }
                  className="p-0 col-12"
                  dateFormat="dd/MM/yyyy"
                  // onChange={(date) => setToDate(date)}
                  onChange={setAndCalNumberOfDays}
                  placeholder="To Date"
                />
                <CLabel htmlFor="nf-grade">Duration</CLabel>

                <CInput
                  disabled
                  value={
                    leave_selected_obj != undefined
                      ? leave_selected_obj.Duration
                      : noDays
                  }
                  className="p-0 col-12"
                  type="number"
                  placeholder="Duration"
                  name="duration"
                />
              </CCol>
              <CCol sm="6">
                <CLabel htmlFor="nf-grade">Name of Leave</CLabel>
                <CSelect
                  value={
                    leave_selected_obj != undefined
                      ? leave_selected_obj.LeaveID
                      : data.nameofleave
                  }
                  name="nameofleave"
                  onChange={handleInput}
                  aria-label="Default select example"
                >
                  <option> Please select </option>
                  {leavelist != undefined
                    ? leavelist.map((team) => (
                        <option value={team.LEAVE_ID}>{team.LEAVE_TYPE}</option>
                      ))
                    : ""}
                </CSelect>
                <CLabel htmlFor="nf-grade">Cause </CLabel>
                <CInput
                  value={
                    leave_selected_obj != undefined
                      ? leave_selected_obj.Cause
                      : data.cause
                  }
                  className="p-0 col-12"
                  type="text"
                  placeholder="Cause"
                  name="cause"
                  onChange={handleInput}
                  required
                />
                <CLabel htmlFor="nf-grade">Comments Employee</CLabel>
                <CTextarea
                  onChange={handleInput}
                  placeholder="Comments Employee"
                  name="EmployeeMemo"
                  value={
                    leave_selected_obj != undefined
                      ? leave_selected_obj.EmployeeMemo
                      : data.EmployeeMemo
                  }
                ></CTextarea>
                <CLabel htmlFor="nf-grade">Superior Memo</CLabel>
                <CTextarea
                  onChange={handleInput}
                  placeholder="Superior Memo"
                  name="SuperiorMemo"
                  value={
                    leave_selected_obj != undefined
                      ? leave_selected_obj.SuperiorMemo
                      : data.SuperiorMemo
                  }
                ></CTextarea>
              </CCol>
            </CRow>
          </CFormGroup>
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

export default EmpLeaveModal;
