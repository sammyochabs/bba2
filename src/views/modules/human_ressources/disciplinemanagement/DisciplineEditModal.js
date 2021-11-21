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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CTextarea,
  CLink,
} from "@coreui/react";

import React, { useEffect, useState } from "react";
import { getFile } from "src/actions/HumanRessource/downloadFile";
// import { fetchEmployees } from "src/actions/employees";
import { useDispatch } from "react-redux";
import {
  addDiscipline,
  updateDiscipline,
} from "src/actions/HumanRessource/disciplines";
import { addPunishmentFile } from "src/actions/HumanRessource/setPunishmentFile";
import "./DisciplineEditModal.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DisciplineEditModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  employeeList,
  punishmentList,
  data,
  setData,
  isenableMode,
}) => {
  console.log("Current Data", data);
  // const [data, setData] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("Employee");
  const [selectedPuishment, setSelectedPuishment] = useState("Punishment");
  const [releaseFromCharge, setReleaseFromCharge] = useState(false);
  const [punishmentMemoDate, setpunishmentMemoDate] = useState();
  const [releaseMemoDate, setreleaseMemoDate] = useState();
  const [files, setFiles] = useState("");
  //setReleaseFromCharge
  // const [employeeList, setEmployeeList] = useState([]);

  const dispatch = useDispatch();
  var formData = new FormData();
  var formDataForFile = new FormData();
  var formDataForRealaseFile = new FormData();

  const handleInputDatePunishment = (e) => {
    // setData({ ...data, [e.target.name]:e.target.value});
    setData({
      ...data,
      PunishmentMemoDate: formatDate(e),
    });
    return console.log(data);
  };
  const handleInputDateRelease = (e) => {
    // setData({ ...data, [e.target.name]:e.target.value});
    setData({
      ...data,
      ReleaseMemoDate: formatDate(e),
    });
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
  // const changeDateFormatToUS = (currentDate) => {
  //   var parts = (currentDate).toString().split('/');
  //   // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
  //   // January - 0, February - 1, etc.
  //   return parts[1] +"/"+ parts[0] +"/"+ parts[2];

  // }

  const handleInputData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    return console.log(data);
  };

  const handleSelect = (name, id) => {
    setData({ ...data, [name]: id });
  };
  const handleInputFile = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  useEffect(() => {
    if (data) {
      console.log("data.EmployeeName", data.EmployeeName);
      setSelectedEmployee(data.EmployeeName);
      setSelectedPuishment(data.Punishment);
    }
  }, []);

  console.log("Employees", employeeList);

  const changeDateFormatToUk = (dateValue) => {
    var parts = dateValue?.split("/");

    if (parts) {
      return parts[2] + "-" + parts[1] + "-" + parts[0];
    }
    return Date.now();
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    switch (type) {
      case "Add":
        Object.keys(data).forEach((key) => formData.append(key, data[key]));
        Object.keys(files).forEach((key) => formData.append(key, files[key]));

        dispatch(addDiscipline(formData, userID));

        break;
      case "Update":
        formData.append("userID", localStorage.getItem("userID"));
        Object.keys(data).forEach((key) => {
          if (key != "ReleaseMemoFile" && key != "PunishmentMemoFile")
            formData.append(key, data[key]);
        });

        dispatch(updateDiscipline(formData, userID));

        formDataForFile.append("userID", localStorage.getItem("userID"));
        formDataForFile.append("DisciplineID", data?.DisciplineID);
        formDataForFile.append("File", files?.PunishmentMemoFile);
        dispatch(
          addPunishmentFile(formDataForFile, "/Discipline/setPunishmentFile")
        );

        formDataForRealaseFile.append("userID", localStorage.getItem("userID"));
        formDataForRealaseFile.append("DisciplineID", data?.DisciplineID);
        formDataForRealaseFile.append("File", files?.ReleaseMemoFile);
        dispatch(
          addPunishmentFile(
            formDataForRealaseFile,
            "/Discipline/setReleaseFile"
          )
        );

        //   formData.append("disciplineID", currentValue);
        // formData.append("discipline", data);
        //dispatch(updateDiscipline(formData, userID));
        // console.log(currentValue)
        break;

      default:
        break;
    }
  };
  return (
    <CModal show={modal} onClose={toggle} size="lg" centered>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol sm="4">
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Employee</CLabel>
                {isenableMode && (
                  <CInput
                    type="text"
                    onChange={handleInputData}
                    disabled="true"
                    value={selectedEmployee}
                  />
                )}
                {!isenableMode && (
                  <CDropdown>
                    <CDropdownToggle color="200" className="full-width">
                      {selectedEmployee}
                    </CDropdownToggle>

                    <CDropdownMenu className="full-width">
                      {employeeList?.map((employee) => (
                        <CDropdownItem
                          size="xl"
                          key={employee.EmployeeID}
                          onClick={() => {
                            handleSelect("EmployeeID", employee.EmployeeID);
                            setSelectedEmployee(employee.Name);
                          }}
                          href="#"
                          value={employee.Name}
                          eventKey={"option-" + employee.EmployeeID}
                          active={data?.EmployeeID === employee.EmployeeID}
                        >
                          {employee.Name}
                        </CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                )}
              </CFormGroup>
            </CCol>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Description Of Offence</CLabel>
                <CInput
                  type="text"
                  id="nf-healthRecord"
                  name="OffenceDescription"
                  placeholder="Enter Description Of Offence.."
                  autoComplete="DescriptionOfOffence"
                  onChange={handleInputData}
                  required
                  value={data?.OffenceDescription}
                />
              </CFormGroup>
            </CCol>
          </CRow>

          <CCard>
            <CCardHeader>Punishment</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <CFormGroup>
                    <CLabel htmlFor="nfhealthRecord">Name Of Punishment</CLabel>
                    <CInput
                      type="text"
                      id="nf-healthRecord"
                      name="PunishmentName"
                      placeholder="Enter Name Of Punishment.."
                      autoComplete="NameOfPunishment"
                      onChange={handleInputData}
                      required
                      value={data?.PunishmentName}
                    />
                  </CFormGroup>
                </CCol>
                <CCol sm="4">
                  <CFormGroup>
                    <CLabel htmlFor="nfhealthRecord">
                      {" "}
                      Type Of Punishment
                    </CLabel>
                    <CDropdown variant="btn-group">
                      <CDropdownToggle
                        color="200"
                        size="xl"
                        className="full-width"
                      >
                        {selectedPuishment}
                      </CDropdownToggle>
                      <CDropdownMenu className="full-width">
                        {punishmentList?.map((punishment) => (
                          <CDropdownItem
                            size="xl"
                            key={punishment.PunishmentID}
                            onClick={() => {
                              handleSelect(
                                "PunishmentID",
                                punishment.PunishmentID
                              );
                              setSelectedPuishment(punishment.PunishmentType);
                            }}
                            href="#"
                            eventKey={"option-" + punishment.PunishmentID}
                          >
                            {punishment.PunishmentType}
                          </CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>
                  </CFormGroup>
                </CCol>
                <CCol>
                  <CFormGroup>
                    <CLabel htmlFor="nfhealthRecord">Punishment Memo No</CLabel>
                    <CInput
                      type="text"
                      id="nf-healthRecord"
                      name="PunishmentMemoN"
                      placeholder="Enter Punishment Memo No.."
                      autoComplete="PunishmentMemoNo"
                      onChange={handleInputData}
                      required
                      value={data?.PunishmentMemoN}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CFormGroup>
                    <CLabel htmlFor="nfhealthRecord">
                      Punishment Memo Date
                    </CLabel>
                    {/* <CInput
                      type="date"
                      id=""
                      name="PunishmentMemoDate"
                      placeholder="Enter Punishment Memo Date.."
                      autoComplete=""
                      onChange={handleInputDate}
                      required
                      value={data?.PunishmentMemoDate}
                      //value={data?.PunishmentMemoDate}
                      // value={new Date (data?.PunishmentMemoDate)}
                      //new Date(e.target.value).toLocaleDateString('en-GB')
                    /> */}
                    {/* {changeDateFormatToUS(data?.PunishmentMemoDate)} */}
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      //selected={sactionDate}
                      className="p-0 col-12"
                      placeholder="Punishment Memo Date"
                      name="PunishmentMemoDate"
                      onChange={handleInputDatePunishment}
                      value={data?.PunishmentMemoDate}
                      required
                    />
                  </CFormGroup>
                </CCol>
                <CCol>
                  <CFormGroup>
                    <CLabel htmlFor="nfhealthRecord">
                      Punishment Memo Scan{" "}
                    </CLabel>
                    <CInput
                      type="file"
                      id="nf-healthRecord"
                      name="PunishmentMemoFile"
                      placeholder="Select Punishment Memo Scan .."
                      autoComplete="PunishmentMemoScan"
                      onChange={handleInputFile}
                      required
                    />
                    <CLink
                      onClick={() => {
                        getFile(
                          "DisciplineID",
                          data?.DisciplineID,
                          data?.PunishmentMemoFile,
                          "Discipline/GetPunishmentFile"
                        );
                      }}
                    >
                      {data?.PunishmentMemoFile}
                    </CLink>
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <CRow>
            <CCol sm="6">
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Appeal</CLabel>
                <CTextarea
                  type="text"
                  maxlength="1000"
                  size="1000"
                  id="nf-healthRecord"
                  name="Appeal"
                  placeholder="Enter Appeal.."
                  autoComplete="Appeal"
                  onChange={handleInputData}
                  required
                  value={data?.Appeal}
                  cols="10"
                  rows="3"
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <CFormGroup>
                    <CLabel htmlFor="nfhealthRecord">
                      Release From Charge
                    </CLabel>

                    <CInput
                      type="checkbox"
                      name="ReleasefromCharge"
                      value={data?.ReleaseFromCharge}
                      id="flexCheckDefault"
                      className="appeal-checkbox"
                      onChange={(event) => {
                        handleInputData(event);
                        setReleaseFromCharge(event.target.checked);
                      }}
                    />
                  </CFormGroup>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol>
                      <CFormGroup>
                        <CLabel htmlFor="nfhealthRecord">Memo No</CLabel>
                        <CInput
                          disabled={!releaseFromCharge}
                          type="text"
                          id="nf-healthRecord"
                          name="ReleaseMemoN"
                          placeholder="Enter Memo No.."
                          autoComplete="MemoNo"
                          onChange={handleInputData}
                          required
                          value={data?.ReleaseMemoN}
                        />
                      </CFormGroup>
                    </CCol>
                    <CCol>
                      <CFormGroup>
                        <CLabel htmlFor="nfhealthRecord">Memo Date</CLabel>
                        {/* <CInput
                          disabled={!releaseFromCharge}

                          type="date"
                          id="nf-healthRecord"
                          name="ReleaseMemoDate"
                          placeholder="Enter Health Record.."
                          autoComplete="healthRecord"
                          onChange={handleInputDate}
                          required
                          value={data?.ReleaseMemoDate}
                        /> */}
                        <DatePicker
                          disabled={!releaseFromCharge}
                          dateFormat="dd/MM/yyyy"
                          //selected={sactionDate}
                          className="p-0 col-12"
                          placeholder="Release Memo Date"
                          name="ReleaseMemoDate"
                          onChange={handleInputDateRelease}
                          value={data?.ReleaseMemoDate}
                          required
                        />
                      </CFormGroup>
                    </CCol>
                    <CCol>
                      <CFormGroup>
                        <CLabel htmlFor="nfhealthRecord">Memo Scan </CLabel>
                        <CInput
                          disabled={!releaseFromCharge}
                          type="file"
                          id="nf-healthRecord"
                          name="ReleaseMemoFile"
                          placeholder="Select Memo Scan .."
                          autoComplete="MemoScan"
                          onChange={handleInputFile}
                          required
                        />
                        <br />
                        <CLink
                          onClick={() => {
                            getFile(
                              "DisciplineID",
                              data?.DisciplineID,
                              data?.ReleaseMemoFile,
                              "Discipline/GetPunishmentFile"
                            );
                          }}
                        >
                          {data?.ReleaseMemoFile}
                        </CLink>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CForm>
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

export default DisciplineEditModal;
