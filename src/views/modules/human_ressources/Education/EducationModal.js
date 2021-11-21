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
} from "src/actions/HumanRessource/education.services";
import ErrorMessage from "src/actions/errorMessages";

const EducationModal = ({
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
  const [institutionName, setinstitutionName] = useState("");
  const [principalSubject, setprincipalSubject] = useState("");
  const [degree, setdegree] = useState("");
  const [educationResult, seteducationResult] = useState("");
  const [passingYear, setPassingYear] = useState("");
  const [distinction, setdistinction] = useState("");
  const [response, setResponse] = useState("");
  // console.log("drop",employeedropdown,EmployeeArray)
  useEffect(() => {
    if (type == "Update") {
      console.log("update call");
      setemployeeName(
        employee && employee.EmployeeID ? employee.EmployeeID : ""
      );
      setinstitutionName(
        employee && employee.InstitutionName ? employee.InstitutionName : ""
      );
      setprincipalSubject(
        employee && employee.principalSubject ? employee.principalSubject : ""
      );
      setdegree(employee && employee.Degree ? employee.Degree : "");
      seteducationResult(
        employee && employee.educationResult ? employee.educationResult : ""
      );
      setPassingYear(
        employee && employee.passingYear ? employee.passingYear : ""
      );
      setdistinction(
        employee && employee.distinction ? employee.distinction : ""
      );
      setResponseModal(false);
    }
    return () => console.log("unmounting...");
  }, [employee]);

  let formData = new FormData();
  const handleEmployeeNameInput = (e) => {
    setemployeeName(e.target.value);
  };
  const handleInstitutionNameInput = (e) => {
    setinstitutionName(e.target.value);
  };
  const handlePrincipalSubjectInput = (e) => {
    setprincipalSubject(e.target.value);
  };
  const handleDegreeInput = (e) => {
    setdegree(e.target.value);
  };
  const handleEducationResultInput = (e) => {
    seteducationResult(e.target.value);
  };
  const handlePassingYearInput = (e) => {
    setPassingYear(e.target.value);
  };
  const handledistinctionInput = (e) => {
    setdistinction(e.target.value);
  };

  const formValues = {
    EmployeeID: employeeName,
    EducationID: currentValue,
    InstitutionName: institutionName,
    principalSubject: principalSubject,
    Degree: degree,
    educationResult: educationResult,
    passingYear: passingYear,
    Dstinction: distinction,
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    setResponseModal(false);
    console.log("userid", userID);
    formData.append("userID", userID);
    formData.append("employeeID", employeeName);
    formData.append("institutionName", institutionName);
    formData.append("principalSubject", principalSubject);
    formData.append("degree", degree);
    formData.append("educationResult", educationResult);
    formData.append("passingYear", passingYear);
    formData.append("Distinction", distinction);
    switch (type) {
      case "Add":
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
        formData.append("EducationID", currentValue);
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
                    Choose an Employee ...
                  </option>
                  {employeedropdown?.map((el, key) => (
                    <option key={key} value={el.EmployeeID}>
                      {el.Name}
                    </option>
                  ))}
                </CSelect>
                <CLabel htmlFor="nf-institutionName">institution Name</CLabel>
                <CInput
                  type="text"
                  id="nf-institutionName"
                  name="institutionName"
                  placeholder="Enter institution Name"
                  value={institutionName}
                  onChange={handleInstitutionNameInput}
                  required
                />
                <CLabel htmlFor="nf-principalSubject">Principal Subject</CLabel>
                <CInput
                  type="text"
                  id="nf-principalSubject"
                  name="principalSubject"
                  placeholder="Enter principal Subject"
                  value={principalSubject}
                  onChange={handlePrincipalSubjectInput}
                  required
                />
                <CLabel htmlFor="nf-degree">Degree/Diploma</CLabel>
                <CInput
                  type="text"
                  id="nf-degree"
                  name="degree"
                  placeholder="Enter degree"
                  value={degree}
                  onChange={handleDegreeInput}
                  required
                />
                <CLabel htmlFor="nf-passingYear">Passing Year</CLabel>
                <CInput
                  type="number"
                  id="nf-passingYear"
                  name="passingYear"
                  placeholder="Enter Passing Year"
                  value={passingYear}
                  onChange={handlePassingYearInput}
                  required
                />
                <CLabel htmlFor="nf-educationResult">Result</CLabel>
                <CInput
                  type="number"
                  id="nf-degree"
                  name="educationResult"
                  placeholder="Enter degree"
                  value={educationResult}
                  onChange={handleEducationResultInput}
                  required
                />
                <CLabel htmlFor="nf-distinction">Distinction</CLabel>
                <CInput
                  type="text"
                  id="nf-passingYear"
                  name="distinction"
                  placeholder="Enter distinction"
                  value={distinction}
                  onChange={handledistinctionInput}
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

export default EducationModal;
