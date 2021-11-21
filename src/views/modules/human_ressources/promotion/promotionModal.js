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
} from "src/actions/HumanRessource/promotion.services";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ErrorMessage from "src/actions/errorMessages";
const PromotionModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  employee,
  employeedropdown,
  isEdiableName,
  desginationdropdown,
  gradedropdown,
  employeeName,
  setemployeeName,
  Type,
  setType,
  designation,
  setdesignation,
  organization,
  setOrganization,
  postingType,
  setPostingType,
  Location,
  setLocation,
  FromDate,
  setFromDate,
  ToDate,
  setToDate,
  promotionDate,
  setPromotionDate,
  GradeORPayscale,
  setGradeORPayscale,
  Grade,
  setGrade,

  responseModal,
  setResponseModal,
  reInitalizeList,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [response, setResponse] = useState("");

  const [modalopen, setmodalopen] = useState(false);

  // const [employeeName, setemployeeName] = useState("");
  // const [Type, setType] = useState("");
  // const [designation, setdesignation] = useState("");
  // const [organization, setOrganization] = useState("");
  // const [postingType, setPostingType] = useState("");
  // const [Location, setLocation] = useState("");
  // const [FromDate, setFromDate] = useState("");
  // const [ToDate, setToDate] = useState("");
  // const [promotionDate, setPromotionDate] = useState("");
  // const [GradeORPayscale, setGradeORPayscale] = useState("");
  // const [Grade, setGrade] = useState("");
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
        employee && employee.EmployeeID ? employee.EmployeeID : ""
      );
      setType(employee && employee.PromotionType ? employee.PromotionType : "");
      setdesignation(
        employee && employee.Designation ? employee.Designation : ""
      );
      setOrganization(
        employee && employee.Organization ? employee.Organization : ""
      );
      setPostingType(
        employee && employee.PostingType ? employee.PostingType : ""
      );
      setLocation(employee && employee.Location ? employee.Location : "");
      setFromDate(
        employee && employee.DateFrom
          ? _changeDateFormat(employee.DateFrom)
          : ""
      );
      setToDate(
        employee && employee.DateTo ? _changeDateFormat(employee.DateTo) : ""
      );
      setPromotionDate(
        employee && employee.PromotionDate
          ? _changeDateFormat(employee.PromotionDate)
          : ""
      );
      setGradeORPayscale(
        employee && employee.Duration ? employee.Duration : ""
      );
      setResponseModal(false);
    }
    return () => {
      console.log("unmounting...", employeeName);
    };
  }, [employee]);

  const clearState = () => {
    setdesignation("");
    setGrade("");
    setGradeORPayscale("");
  };

  let formData = new FormData();
  const handleEmployeeNameInput = (e) => {
    setemployeeName(e.target.value);
  };
  const handleOrganizationInput = (e) => {
    setOrganization(e.target.value);
  };
  const handlePostingTypeInput = (e) => {
    setPostingType(e.target.value);
  };
  const handleLocationInput = (e) => {
    setLocation(e.target.value);
  };
  const handleDesignationInput = (e) => {
    const desginationObj = desginationdropdown[e.target.value];
    if (!desginationObj) {
      setdesignation("");
      setGrade("");
      setGradeORPayscale("");
      return;
    }
    const { GRADE_ID, DESIGNATION_ID } = desginationObj;
    setdesignation(DESIGNATION_ID);
    const payScale = gradedropdown.filter((el) => el.GRADE_ID == GRADE_ID);
    setGrade(payScale[0]?.GRADE || "");
    setGradeORPayscale(
      (payScale[0]?.PAY_SCALE_FROM || "") +
        " - " +
        (payScale[0]?.PAY_SCALE_TO || "")
    );
  };
  const handleTypeInput = (e) => {
    setType(e.target.value);
  };
  const handleFromDateInput = (e) => {
    setFromDate(e);
  };
  const handleToDateInput = (e) => {
    setToDate(e);
  };
  const handlePromotionDateInput = (e) => {
    setPromotionDate(e);
  };
  const handleSubmit = (e, type) => {
    e.preventDefault();
    setResponseModal(false);
    let _fromDate = new Date(FromDate);
    let _promotionDate = new Date(promotionDate);
    let _ToDate = new Date(ToDate);
    formData.append("userID", userID);
    formData.append("employeeID", employeeName);
    formData.append("PromotionType", Type);
    formData.append("DesignationID", designation);
    formData.append("Organization", organization);
    formData.append("PostingType", postingType);
    formData.append("Location", Location);
    formData.append("DatePromotion", changeDateFormat(_promotionDate));
    formData.append("From", changeDateFormat(_fromDate));
    formData.append("To", changeDateFormat(_ToDate));
    // formData.append("Position", Position);
    switch (type) {
      case "Add":
        // formData.append("degree", data.degree);
        AddEducation(formData).then(
          (response) => {
            if (response?.status == "200") {
              reInitalizeList();
            }
            console.log(response);
            let code = response?.message;
            setResponseModal(true);
            setResponse(code);
          },
          (error) => console.log(error)
        );
        break;
      case "Update":
        formData.append("PromotionID", currentValue);
        UpdateEducation(formData).then(
          (response) => {
            if (response?.status == "200") {
              reInitalizeList();
            }
            console.log(response);
            let code = response?.message;
            setResponseModal(true);
            setResponse(code);
          },
          (error) => console.log(error)
        );
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
            <CForm onSubmit={handleSubmit} id="create-course-form">
              <CFormGroup>
                <CLabel htmlFor="ccmonth" onClick={clearState}>
                  Employee
                </CLabel>
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
                <CLabel htmlFor="nf-Position">Type</CLabel>
                <CSelect
                  custom
                  name="ccmonth"
                  id="ccmonth"
                  onChange={(e) => handleTypeInput(e)}
                  value={Type}
                >
                  <option value="default" selected>
                    Choose a type...
                  </option>
                  <option value="Promotion">Promotion</option>
                  <option value="Charge">Charge</option>
                </CSelect>
                <CLabel htmlFor="nf-Position">Designation</CLabel>
                <CSelect
                  custom
                  name="ccmonth"
                  id="ccmonth"
                  onChange={(e) => handleDesignationInput(e)}
                >
                  <option value="default" selected>
                    Choose a selection ...
                  </option>
                  {desginationdropdown.map((el, key) => (
                    <option key={key} value={key}>
                      {el.DESIGNATION}
                    </option>
                  ))}
                </CSelect>
                <CLabel htmlFor="nf-Grade">Grade</CLabel>
                <CInput
                  type="text"
                  id="nf-Grade"
                  name="Grade"
                  value={Grade}
                  readOnly
                />
                <CLabel htmlFor="nf-Duration">Payscale</CLabel>
                <CInput
                  type="text"
                  id="nf-GradeORPayscale"
                  name="GradeORPayscale"
                  value={GradeORPayscale}
                  readOnly
                />
                <CLabel htmlFor="nf-organization">Organization</CLabel>
                <CInput
                  type="text"
                  id="nf-organization"
                  name="organization"
                  placeholder="Enter organization"
                  value={organization}
                  onChange={handleOrganizationInput}
                  required
                />
                <CLabel htmlFor="nf-postingType">PostingType</CLabel>
                <CSelect
                  custom
                  name="ccmonth"
                  id="ccmonth"
                  onChange={(e) => handlePostingTypeInput(e)}
                  value={postingType}
                >
                  <option value="default" selected>
                    Choose a type...
                  </option>
                  <option value="Regular">Regular</option>
                  <option value="Deputation">Deputation</option>
                  <option value="Lien">Lien</option>
                  <option value="Others">Others</option>
                </CSelect>
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
                <CLabel htmlFor="nf-promotionDate">Promotion Date</CLabel>
                <DatePicker
                  class="form-control"
                  selected={promotionDate}
                  onChange={(date) => handlePromotionDateInput(date)}
                  dateFormat="dd/MM/yyyy"
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

export default PromotionModal;
