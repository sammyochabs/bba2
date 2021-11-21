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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CLink,
  CTextarea,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFile } from "src/actions/HumanRessource/downloadFile";
import {
  addHealthRecord,
  updateHealthRecord,
} from "src/actions/HumanRessource/healthrecords";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { addHealthFile } from "src/actions/HumanRessource/setHealthFile";
import "./HealthEditModal.css";
import moment from "moment";
const HealthEditModal = ({
  toggle,
  modal,
  type,
  title,
  currentValue,
  userID,
  employeeList,
  healthInfoList,
  data,
  setData,
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState("Employee");
  const [selectedHealthInformation, setSelectedHealthInformation] =
    useState("Health Info");
  const [empty, setEmpty] = useState("");

  useEffect(() => {
    if (data && !selectedEmployee && employeeList) {
      setSelectedEmployee(
        employeeList.find((emp) => emp.EmployeeID === data?.EmployeeID)?.Name
      );
    }
    if (data && !selectedHealthInformation && healthInfoList) {
      setSelectedHealthInformation(data?.HealthInfo);
    }
  }, [data]);

  // if (healthView) {

  //   //Object.keys(healthView).forEach(key => setData(...data,[key]=data[key]));
  //   var check =healthView;
  //   console.log("khan",check)
  //   healthView=null;
  // console.log("kara k dekh leta",healthInfoList);

  // }
  // console.log("check",data);
  // useEffect(() => {
  //   if (healthView) {
  //     setData({ ...data, healthView });

  //   }
  //   console.log("check", data);
  // }, [])

  // if(selectedItem){
  //   setData(selectedItem)
  // }
  const dispatch = useDispatch();
  var formData = new FormData();
  var formDataForFile = new FormData();
  var formDataForRealaseFile = new FormData();

  const handleInputData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    return console.log(data);
  };

  const handleInputFile = (e) => {
    setData({ ...data, [e.target.name]: e.target.files[0] });
    // formData.append([e.target.name],e.target.files[0],e.target.value)
    return console.log(e);
  };

  const handleSelect = (name, id) => {
    setData({ ...data, [name]: id });
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    switch (type) {
      case "Add":
        console.log("data", data);
        //Object.keys(data).forEach((key) => formData.append(key, data[key]))
        Object.keys(data).forEach((key) => {
          if (key != "FromDate" && key != "ToDate")
            formData.append(key, data[key]);
        });
        //
        //formData.append('EmployeeID', data['EmployeeID'])
        // formData.append('healthInfoId', healthInfoId)
        // formData.append('Height', Height)
        // formData.append('Weight', Weight)

        // formData.append('BloodPressure', BloodPressure)
        // formData.append('VisualPower', VisualPower)

        // formData.append('MedicalClassification', MedicalClassification)

        // formData.append('HealthWeakness', HealthWeakness)

        formData.append(
          "FromDate",
          moment(data.FromDate || "").format("DD/MM/YYYY")
        );

        formData.append(
          "ToDate",
          moment(data.ToDate || "").format("DD/MM/YYYY")
        );
        dispatch(addHealthRecord(formData, userID));
        setData(empty);
        console.log("empty", data);
        break;
      case "Update":
        if (!data["HealthInfoID"]) {
          let healthInfoId = healthInfoList.find(
            (x) => x.HealthInfo === data["HealthInfo"]
          ).HealthInfoID;
          formData.append("HealthInfoID", healthInfoId);
        }

        formData.append("userID", userID);

        Object.keys(data).forEach((key) => {
          if (key != "ECG" && key != "XRay") formData.append(key, data[key]);
        });
        //  formData.append("HealthView", data);
        dispatch(updateHealthRecord(formData, userID));
        console.log("formdata", formData);

        formDataForFile.append("userID", userID);
        formDataForFile.append("HealthID", data?.HealthID);
        formDataForFile.append("XRay", data?.XRay);
        dispatch(addHealthFile(formDataForFile, "/Health/setXRay"));

        formDataForRealaseFile.append("userID", userID);
        formDataForRealaseFile.append("HealthID", data?.HealthID);
        formDataForRealaseFile.append("ECG", data?.ECG);
        dispatch(addHealthFile(formDataForRealaseFile, "/Health/setECG"));

        break;

      default:
        break;
    }
  };
  return (
    <CModal show={modal} onClose={toggle} centered size="lg">
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol sm="6">
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Employee</CLabel>
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
              </CFormGroup>
            </CCol>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Health Information</CLabel>
                <CDropdown>
                  <CDropdownToggle className="full-width" color="200">
                    {selectedHealthInformation}
                  </CDropdownToggle>
                  <CDropdownMenu className="full-width">
                    {healthInfoList?.map((healthInfo) => (
                      <CDropdownItem
                        size="xl"
                        key={healthInfo.HealthInfoID}
                        onClick={() => {
                          handleSelect("HealthInfoID", healthInfo.HealthInfoID);
                          setSelectedHealthInformation(healthInfo.HealthInfo);
                        }}
                        href="#"
                        value={healthInfo.HealthInfoID}
                        eventKey={"option-" + healthInfo.HealthInfoID}
                      >
                        {healthInfo.HealthInfo}
                      </CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol sm="4">
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Start Date</CLabel>
                <CInput
                  type="date"
                  id="nf-healthRecord"
                  name="FromDate"
                  placeholder="Enter Health Record.."
                  autoComplete="healthRecord"
                  onChange={handleInputData}
                  required
                  value={data?.FromDate}
                />
                {/* <DatePicker
                  dateFormat="dd/MM/yyyy"
                  //selected={sactionDate}
                  className="p-0 col-12"
                  placeholder="Enter Health Record."
                  name="FromDate"
                  onChange={handleInputDateStart}
                  value={data?.FromDate}
                  required
                /> */}
              </CFormGroup>
            </CCol>
            <CCol sm="4">
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">End Date</CLabel>
                <CInput
                  type="date"
                  id="nf-healthRecord"
                  name="ToDate"
                  placeholder="Enter Health Record.."
                  autoComplete="healthRecord"
                  onChange={handleInputData}
                  required
                  value={data?.ToDate}
                />
                {/* <DatePicker
                  dateFormat="dd/MM/yyyy"
                  //selected={sactionDate}
                  className="p-0 col-12"
                  placeholder="Enter Health Record."
                  name="ToDate"
                  onChange={handleInputDateTo}
                  value={data?.ToDate}
                  required
                /> */}
              </CFormGroup>
            </CCol>
            {/* <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Duration</CLabel>
                <CInput
                  type="text"
                  id="nf-healthRecord"
                  name="duration"
                  placeholder="Enter Duration.."
                  autoComplete="Duration"
                  onChange={handleInputData}
                  required
                />
              </CFormGroup>
            </CCol> */}
          </CRow>

          <CRow>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Height</CLabel>
                <CInput
                  type="text"
                  id="nf-healthRecord"
                  name="Height"
                  placeholder="Enter Height.."
                  autoComplete="Height"
                  onChange={handleInputData}
                  required
                  value={data?.Height}
                />
              </CFormGroup>
            </CCol>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Weight</CLabel>
                <CInput
                  type="text"
                  id="nf-healthRecord"
                  name="Weight"
                  placeholder="Enter Weight.."
                  autoComplete="Weight"
                  onChange={handleInputData}
                  required
                  value={data?.Weight}
                />
              </CFormGroup>
            </CCol>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Visual power</CLabel>
                <CInput
                  type="text"
                  id="nf-healthRecord"
                  name="VisualPower"
                  placeholder="Enter Visual power.."
                  autoComplete="Visualpower"
                  onChange={handleInputData}
                  required
                  value={data?.VisualPower}
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Blood Pressure</CLabel>
                <CInput
                  type="text"
                  id="nf-healthRecord"
                  name="BloodPressure"
                  placeholder="Enter Blood Pressure.."
                  autoComplete="BloodPressure"
                  onChange={handleInputData}
                  required
                  value={data?.BloodPressure}
                />
              </CFormGroup>
            </CCol>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">Medical Classification</CLabel>
                <CTextarea
                  type="text"
                  id="nf-healthRecord"
                  name="MedicalClassification"
                  placeholder="Medical Classification.."
                  autoComplete="MedicalClassification"
                  onChange={handleInputData}
                  required
                  cols="10"
                  rows="3"
                  value={data?.MedicalClassification}
                />
              </CFormGroup>
            </CCol>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">
                  Health Weakness/Incompetent Nature
                </CLabel>
                <CTextarea
                  type="text"
                  id="nf-healthRecord"
                  name="HealthWeakness"
                  placeholder="Health Weakness/Incompetent Nature.."
                  autoComplete="HealthWeakness/IncompetentNature"
                  onChange={handleInputData}
                  required
                  cols="10"
                  rows="3"
                  value={data?.HealthWeakness}
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">
                  X-ray Report{data?.HealthID ? " : " : ""}
                </CLabel>
                <CLink
                  onClick={() => {
                    getFile(
                      "HealthID",
                      data?.HealthID,
                      data?.FileXRAY,
                      "Health/GetXRAY"
                    );
                  }}
                >
                  {data?.FileECG}
                </CLink>
                <CInput
                  type="file"
                  id="nf-healthRecord"
                  name="XRay"
                  placeholder="X-ray Report.."
                  autoComplete="X-ray Report"
                  onChange={handleInputFile}
                  required
                />
              </CFormGroup>
            </CCol>
            <CCol>
              <CFormGroup>
                <CLabel htmlFor="nfhealthRecord">
                  ECG Report{data?.HealthID ? " : " : ""}
                </CLabel>
                <CLink
                  onClick={() => {
                    getFile(
                      "HealthID",
                      data?.HealthID,
                      data?.FileECG,
                      "Health/GetECG"
                    );
                  }}
                >
                  {data?.FileECG}
                </CLink>
                <CInput
                  type="file"
                  id="nf-healthRecord"
                  name="ECG"
                  placeholder="ECG Report.."
                  autoComplete="ECG Report"
                  onChange={handleInputFile}
                  required
                />
              </CFormGroup>
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

export default HealthEditModal;
// a) Employee => Dropdown[]
// b) From Date (DD/MM/YYYY)=>Date Picker
// c) To Date (DD/MM/YYYY)=>Date Picker
// d) Duration=> Alphanumeric
// e) Health Information=> Dropdown ()
// f) Height=> Numeric
// g) Weight=> Numeric
// h) Visual power=> Numeric
// i) Blood Pressure=> Numeric
// j) X-ray Report=>Image up loader
// k) ECG Report=>Image up loader
// l) Medical Classification
// m) Health Weakness/Incompetent Nature=> Alphabetic
// • Update –delete-view
// • Filtre => employee ,health information , date from between
// • Excel
