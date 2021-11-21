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
import {
  AddEducation,
  UpdateEducation,
} from "src/actions/HumanRessource/Trainer.services";
import ErrorMessage from "src/actions/errorMessages";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const TrainerModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  employee,
  employeedropdown,
  isEdiableName,
  reInitalizeList,

  responseModal,
  setResponseModal,
}) => {
  const [employeeName, setemployeeName] = useState("");
  const [CourseTitle, setCourseTitle] = useState("");
  const [LocalORForeign, setLocalORForeign] = useState("");
  const [Institution, setInstitution] = useState("");
  const [Location, setLocation] = useState("");
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [Duration, setDuration] = useState("");
  const [Position, setPosition] = useState("");

  const [response, setResponse] = useState("");

  const changeDateFormat = (dateObj) => {
    if (!dateObj) return;
    try {
      let month = dateObj.getMonth() + 1; //months from 1-12
      let day = dateObj.getDate();
      let year = dateObj.getFullYear();
      if (day < 10) day = "0" + day;
      if (month < 10) month = "0" + month;
      return day + "/" + month + "/" + year;
    } catch (error) {
      console.log("Date Error", error);
      return error;
    }
  };

  const _changeDateFormat = (date) => {
    if (typeof date != "string") {
      return (
        (date.getMonth() > 8
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "/" +
        (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
        "/" +
        date.getFullYear()
      );
    }
    let splitDate = date.split("/");
    let dateObj = new Date(
      splitDate[1] + "-" + splitDate[0] + "-" + splitDate[2]
    );
    let month = dateObj.getMonth() + 1; //months from 1-12
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    return new Date(month + "/" + day + "/" + year);
  };

  useEffect(() => {
    if (type == "Update") {
      setemployeeName(
        employee && employee.EmployeeName ? employee.EmployeeName : ""
      );
      setCourseTitle(
        employee && employee.CourseTitle ? employee.CourseTitle : ""
      );
      setLocalORForeign(
        employee && employee.TrainingType ? employee.TrainingType : ""
      );
      setInstitution(
        employee && employee.Institution ? employee.Institution : ""
      );
      setLocation(employee && employee.Location ? employee.Location : "");
      setFromDate(
        employee && employee.FromDate
          ? _changeDateFormat(employee.FromDate)
          : ""
      );
      setToDate(
        employee && employee.ToDate ? _changeDateFormat(employee.ToDate) : ""
      );
      setDuration(employee && employee.Duration ? employee.Duration : "");
      setPosition(employee && employee.Position ? employee.Position : "");
      setResponseModal(false);
    }
    return () => {
      console.log("unmounting...");
      // document.getElementById("nf-ToDate").value  = new Date()
    };
  }, [employee]);

  let formData = new FormData();
  const handleEmployeeNameInput = (e) => {
    setemployeeName(e.target.value);
  };
  const handleCourseTitleInput = (e) => {
    setCourseTitle(e.target.value);
  };
  const handleInstitutionNameInput = (e) => {
    setInstitution(e.target.value);
  };
  const handleLocationInput = (e) => {
    setLocation(e.target.value);
  };
  const handleLocalORForeignInput = (e) => {
    setLocalORForeign(e.target.value);
  };
  const handleFromDateInput = (e) => {
    setFromDate(e);
  };
  const handleToDateInput = (e) => {
    setToDate(e);
  };
  const handleDurationInput = (e) => {
    setDuration(e.target.value);
  };
  const handlePositionInput = (e) => {
    setPosition(e.target.value);
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    setResponseModal(false);
    let _fromDate = new Date(FromDate);
    let _ToDate = new Date(ToDate);
    formData.append("userID", userID);
    formData.append("employeeID", employeeName);
    formData.append("CourseTitle", CourseTitle);
    formData.append("TrainingType", LocalORForeign);
    formData.append("Institution", Institution);
    formData.append("Location", Location);
    formData.append("FromDate", changeDateFormat(_fromDate));
    formData.append("ToDate", changeDateFormat(_ToDate));
    formData.append("Duration", Duration);
    formData.append("Position", Position);
    switch (type) {
      case "Add":
        // formData.append("degree", data.degree);
        AddEducation(formData).then(
          (response) => {
            if (response?.status == "200") {
              reInitalizeList();
            }
            let code = response?.message;
            setResponseModal(true);
            setResponse(code);
          },
          (error) => console.log(error)
        );
        break;
      case "Update":
        formData.append("TrainingID", currentValue);
        UpdateEducation(formData).then(
          (response) => {
            if (response?.status == "200") {
              reInitalizeList();
            }
            let code = response?.message;
            setResponseModal(true);
            setResponse(code);
          },
          (error) => console.log(error)
        );
        // console.log(currentValue)
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
                <CLabel htmlFor="ccmonth">Employee</CLabel>
                <CSelect
                  custom
                  name="ccmonth"
                  id="ccmonth"
                  onChange={(e) => handleEmployeeNameInput(e)}
                  value={employeeName}
                  disabled={isEdiableName}
                >
                  <option value="default" selected>
                    Choose an Employee...
                  </option>
                  {employeedropdown.map((el, key) => {
                    if (el.Name == employeeName)
                      return (
                        <option key={key} value={employeeName}>
                          {employeeName}
                        </option>
                      );
                    else
                      return (
                        <option key={key} value={el.EmployeeID}>
                          {el.Name}
                        </option>
                      );
                  })}
                </CSelect>
                <CLabel htmlFor="nf-Position">Local/Foreign</CLabel>
                <CSelect
                  custom
                  name="ccmonth"
                  id="ccmonth"
                  onChange={(e) => handleLocalORForeignInput(e)}
                  value={LocalORForeign}
                >
                  <option value="default" selected>
                    Choose a Type
                  </option>
                  <option value="Local">Local</option>
                  <option value="Foreign">Foreign</option>
                </CSelect>
                <CLabel htmlFor="nf-CourseTitle">Course Title</CLabel>
                <CInput
                  type="text"
                  id="nf-CourseTitle"
                  name="CourseTitle"
                  placeholder="Enter Course Title"
                  value={CourseTitle}
                  onChange={handleCourseTitleInput}
                  required
                />
                <CLabel htmlFor="nf-Institution">Institution</CLabel>
                <CInput
                  type="text"
                  id="nf-Institution"
                  name="Institution"
                  placeholder="Enter Institution"
                  value={Institution}
                  onChange={handleInstitutionNameInput}
                  required
                />
                <CLabel htmlFor="nf-Location">Location</CLabel>
                <CInput
                  type="text"
                  id="nf-Location"
                  name="Location"
                  placeholder="Enter Location"
                  value={Location}
                  onChange={handleLocationInput}
                  required
                />

                <CLabel htmlFor="nf-FromDate">From Date</CLabel>
                <DatePicker
                  class="form-control"
                  selected={FromDate}
                  onChange={(date) => handleFromDateInput(date)}
                  dateFormat="dd/MM/yyyy"
                />

                <CLabel htmlFor="nf-ToDate">To Date</CLabel>
                <DatePicker
                  class="form-control"
                  selected={ToDate}
                  onChange={(date) => handleToDateInput(date)}
                  dateFormat="dd/MM/yyyy"
                />

                <CLabel htmlFor="nf-Duration">Duration</CLabel>
                <CInput
                  type="text"
                  id="nf-Duration"
                  name="Duration"
                  placeholder="Enter Duration"
                  value={Duration}
                  onChange={handleDurationInput}
                  required
                />
                <CLabel htmlFor="nf-Position">Position</CLabel>
                <CInput
                  type="text"
                  id="nf-Position"
                  name="Position"
                  placeholder="Enter Location"
                  value={Position}
                  onChange={handlePositionInput}
                  required
                />
              </CFormGroup>
            </CForm>
          </CCol>
        </CRow>
        <ErrorMessage modal={responseModal} responseCode={response} />
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

export default TrainerModal;
