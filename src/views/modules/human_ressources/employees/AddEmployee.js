import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabs,
} from "@coreui/react";
import { useSelector } from "react-redux";
import * as _ from "lodash";
import DocsTab from "./tabs/DocsTab";
import JobTab from "./tabs/JobTab";
import GeneralTab from "./tabs/GeneralTab";
import EmployeeTab from "./tabs/EmployeeTab";
import AdressTab from "./tabs/AdressTab";
import SpouseTab from "./tabs/SpouseTab";
import ChildrenTab from "./tabs/ChildrenTab";
import { fetchDepartments } from "src/actions/department";
import { fetchDesignations } from "src/actions/designation";
import { useDispatch } from "react-redux";
import { fetchDistricts } from "src/actions/district";
import { addEmployee } from "src/actions/employee";
import moment from "moment";
import { fetchEmployee, updateEmployee } from "src/actions/employee";
import { fetchChildren } from "./../../../../actions/children";
import { fetchDocs } from "./../../../../actions/employee";

const toBase64 = (file) =>
  file &&
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddEmployee = ({
  match: {
    params: { empId },
  },
  history,
}) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [singleEmp, setSingleEmp] = useState();
  const userID = localStorage.getItem("userID");
  var formData = new FormData();
  const [birthDate, setBirthDate] = useState();
  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  function formatDate(date) {
    //
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month?.length < 2) month = "0" + month;
    if (day?.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  }
  const handleInputBirthDate = (e) => {
    setData({ ...data, employee_date_of_birth: formatDate(e) });
  };
  const handleInputJoiningDate = (e) => {
    setData({ ...data, job_joining_date: formatDate(e) });
  };
  const handleInputConfirmationDate = (e) => {
    setData({ ...data, job_confirmation_date: formatDate(e) });
  };
  const handleInputLRPDate = (e) => {
    setData({ ...data, job_lrp_date: formatDate(e) });
  };
  const handleFile = async (e) => {
    console.log("handleFile", e.target.name, e.target.files[0]);
    setData({
      ...data,
      [e.target.name]: await toBase64(e.target.files[0]),
      [`${e.target.name}_file`]: e.target.files[0],
    });
  };
  const verifyCheckbox = (checkbox) => {
    return !checkbox ? 0 : 1;
  };
  const handleValidate = (fields) => {
    let errs = {};
    fields.forEach((field) => {
      if (!data[field]) {
        errs[field] = `${_.startCase(field)} is required!`;
      }
    });
    setErrors(errs);
    return !Object.keys(errs)?.length;
  };
  useEffect(() => {
    console.log("errors", errors);
    if (Object.keys(errors)?.length)
      alert("mandatory fields should be filled on each tab");
  }, [errors]);
  const handleSubmit = async (e) => {
    //
    e.preventDefault();
    console.log("data", data);
    const isValid = handleValidate([
      "employee_registration_number",
      "employee_name_english",
      //'employee_fathers_name_english',
      //'employee_fathers_name_bangla',
      // 'employee_name_bangla',
      // 'employee_mothers_name_english',
      // 'employee_mothers_name_bangla',
      // 'employee_date_of_birth',
      // 'employee_registration_number',
      // 'employee_card_id',
      // 'employee_mobile_number',
      // 'job_designation',
      // 'job_department',
      // 'job_cadre',
      // 'job_email',
      // 'job_phone',
      // 'job_joining_date',
      // 'job_confirmation_date',
    ]);
    console.log("isValid", { isValid });
    if (!isValid) return;
    //employee
    data?.employee_photo_file &&
      formData.append(
        "Photo",
        //data.employee_photo
        //  ? singleEmp?.Photo === data.employee_photo
        //    ? undefined
        //    : await toBase64(data?.employee_photo)
        //  : undefined
        data?.employee_photo_file
      );
    data?.employee_name_english &&
      formData.append("NameEnglish", data.employee_name_english || "");
    data?.employee_name_bangla &&
      formData.append("NameBangla", data.employee_name_bangla || "");
    data?.employee_fathers_name_english &&
      formData.append(
        "FatherEnglish",
        data.employee_fathers_name_english || ""
      );
    data?.employee_fathers_name_bangla &&
      formData.append("FatherBangla", data.employee_fathers_name_bangla || "");
    data?.employee_mothers_name_english &&
      formData.append(
        "MotherEnglish",
        data.employee_mothers_name_english || ""
      );
    data?.employee_mothers_name_bangla &&
      formData.append("MotherBangla", data.employee_mothers_name_bangla || "");
    //
    data?.employee_date_of_birth &&
      formData.append(
        "DateBirth",
        moment(data.employee_date_of_birth || "").format("DD/MM/YYYY")
      );

    // data?.employee_date_of_birth &&
    //   formData.append('DateBirth', data.employee_date_of_birth)
    data?.employee_registration_number &&
      formData.append(
        "RegistrationNumber",
        data.employee_registration_number || ""
      );
    data?.employee_card_id &&
      formData.append("CardID", data.employee_card_id || "");
    data?.employee_mobile_number &&
      formData.append("Mobile", data.employee_mobile_number || "");

    //job
    data?.job_designation &&
      formData.append("DesignationID", data.job_designation || "");
    data?.job_department &&
      formData.append("DepartmentID", data.job_department || "");
    data?.job_cadre && formData.append("Cadre", data.job_cadre || "");
    data?.job_email && formData.append("Email", data.job_email || "");
    data?.job_phone && formData.append("Phone", data.job_phone || "");
    //formData.append('mobile', '236234')
    data?.job_joining_date &&
      formData.append(
        "JoigningDate",
        moment(data.job_joining_date || "").format("DD/MM/YYYY")
      );
    //
    data?.job_confirmation_date &&
      formData.append(
        "ConfirmationDate",
        moment(data.job_confirmation_date || "").format("DD/MM/YYYY")
      );
    data.job_lrp_date &&
      formData.append(
        "LRPDate",
        moment(data.job_lrp_date || "").format("DD/MM/YYYY")
      );
    //general
    data?.general_employee_blood &&
      formData.append("BloodGroup", data.general_employee_blood || "");
    data?.general_employee_religion &&
      formData.append("Religion", data.general_employee_religion || "");
    data?.general_employee_gender &&
      formData.append("Gender", data.general_employee_gender || "");
    data?.general_employee_freedom_fighter &&
      formData.append(
        "FreedomFighter",
        verifyCheckbox(data.general_employee_freedom_fighter || "")
      );
    data?.general_employee_children_freedom_fighter &&
      formData.append(
        "Grandchild",
        verifyCheckbox(data.general_employee_children_freedom_fighter || "")
      );
    data?.general_employee_tribal &&
      formData.append(
        "Tribal",
        verifyCheckbox(data.general_employee_tribal || "")
      );
    data?.general_employee_nationality &&
      formData.append("Nationality", data.general_employee_nationality || "");
    //adress
    data?.present_adress_village_house &&
      formData.append("PresentAdress", data.present_adress_village_house || "");
    data?.present_adress_post_office &&
      formData.append("PresentPO", data.present_adress_post_office || "");
    data?.present_adress_upazila &&
      formData.append("PresentUpazilla", data.present_adress_upazila || "");
    data?.present_adress_district &&
      formData.append("PresentDistrictID", data.present_adress_district || "");
    data?.permanent_adress_village_house &&
      formData.append(
        "PermanentAdress",
        data.permanent_adress_village_house || ""
      );
    data?.permanent_adress_post_office &&
      formData.append("PermanentPO", data.permanent_adress_post_office || "");
    data?.permanent_adress_upazila &&
      formData.append("PermanentUpazilla", data.permanent_adress_upazila || "");
    data?.permanent_adress_district &&
      formData.append(
        "PermanentDistrictID",
        data.permanent_adress_district || ""
      );
    data?.official_adress_village_house &&
      formData.append(
        "OfficialAdress",
        data.official_adress_village_house || ""
      );
    data?.official_adress_post_office &&
      formData.append("OfficialPO", data.official_adress_post_office || "");
    data?.official_adress_upazila &&
      formData.append("OfficialUpazilla", data.official_adress_upazila || "");
    data?.official_adress_district &&
      formData.append(
        "OfficialDistrictID",
        data.official_adress_district || ""
      );
    //spouse
    data?.spouse_name && formData.append("SpouseName", data.spouse_name || "");
    data?.spouse_nationality &&
      formData.append("SpouseNationality", data.spouse_nationality || "");
    data?.spouse_national_id_number &&
      formData.append("SpouseCardID", data.spouse_national_id_number || "");
    // console.log(data.employee_photo || '')
    //if (empId) formData.append("EmployeeID", empId);
    const empFormData = {
      Photo: data?.employee_photo,
      //data.employee_photo
      //  ? singleEmp?.Photo === data.employee_photo
      //    ? undefined
      //    : await toBase64(data?.employee_photo)
      //  : undefined,
      NameEnglish: data?.employee_name_english,
      NameBangla: data?.employee_name_bangla,
      FatherEnglish: data?.employee_fathers_name_english,
      FatherBangla: data?.employee_fathers_name_bangla,
      MotherEnglish: data?.employee_mothers_name_english,
      MotherBangla: data?.employee_mothers_name_bangla,
      DateBirth: data.employee_date_of_birth, //moment(data.employee_date_of_birth || '').format('DD/MM/YYYY'),
      RegistrationNumber: data?.employee_registration_number,
      CardID: data?.employee_card_id,
      Mobile: data?.employee_mobile_number,
      DesignationID: data?.job_designation,
      DepartmentID: data?.job_department,
      Cadre: data?.job_cadre,
      Email: data?.job_email,
      Phone: data?.job_phone,
      JoigningDate: data.job_joining_date,
      ConfirmationDate: data.job_confirmation_date,
      BloodGroup: data?.general_employee_blood,
      Religion: data?.general_employee_religion,
      Gender: data?.general_employee_gender,
      FreedomFighter: verifyCheckbox(data?.general_employee_freedom_fighter),
      Grandchild: verifyCheckbox(
        data?.general_employee_children_freedom_fighter
      ),
      Tribal: verifyCheckbox(data?.general_employee_tribal),
      Nationality: data?.general_employee_nationality,
      PresentAdress: data?.present_adress_village_house,
      PresentPO: data?.present_adress_post_office,
      PresentUpazilla: data?.present_adress_upazila,
      PresentDistrictID: data?.present_adress_district,
      PermanentAdress: data?.permanent_adress_village_house,
      PermanentPO: data?.permanent_adress_post_office,
      PermanentUpazilla: data?.permanent_adress_upazila,
      PermanentDistrictID: data?.permanent_adress_district,
      OfficialAdress: data?.official_adress_village_house,
      OfficialPO: data?.official_adress_post_office,
      OfficialUpazilla: data?.official_adress_upazila,
      OfficialDistrictID: data?.official_adress_district,
      SpouseName: data?.spouse_name,
      SpouseNationality: data?.spouse_nationality,
      SpouseCardID: data?.spouse_national_id_number,
    };
    return empId
      ? dispatch(updateEmployee(formData, userID, empId))
      : dispatch(addEmployee(formData, userID));
  };
  const dispatch = useDispatch();
  const employeeId =
    useSelector((state) => state.employees.employeeId) || empId;
  useEffect(() => {
    dispatch(fetchDepartments(userID));
    dispatch(fetchDesignations(userID));
    dispatch(fetchDistricts(userID));
    if (employeeId) fetchChildren(employeeId, userID);
    if (employeeId) fetchDocs(employeeId, userID);
    if (empId)
      fetchEmployee(userID, empId, (empData) => {
        setSingleEmp(empData);
        setData({
          employee_photo: empData?.Photo,
          employee_name_english: empData?.NameEnglish,
          employee_name_bangla: empData?.NameBangla,
          employee_fathers_name_english: empData?.FatherEnglish,
          employee_fathers_name_bangla: empData?.FatherBangla,
          employee_mothers_name_english: empData?.MotherEnglish,
          employee_mothers_name_bangla: empData?.MotherBangla,
          employee_date_of_birth: empData?.DateBirth,
          //birthDate: empData?.DateBirth,
          employee_registration_number: empData?.RegistrationNumber,
          employee_card_id: empData?.CardID,
          employee_mobile_number: empData?.Mobile,
          job_designation: empData?.DesignationID,
          job_department: empData?.DepartmentID,
          job_cadre: empData?.Cadre,
          job_email: empData?.Email,
          job_phone: empData?.Phone,
          job_joining_date: empData?.JoigningDate,
          job_confirmation_date: empData?.ConfirmationDate,
          general_employee_blood: empData?.BloodGroup,
          general_employee_religion: empData?.Religion,
          general_employee_gender: empData?.Gender,
          general_employee_freedom_fighter: !!empData?.FreedomFighter,
          general_employee_children_freedom_fighter: !!empData?.Grandchild,
          general_employee_tribal: !!empData?.Tribal,
          general_employee_nationality: empData?.Nationality,
          present_adress_village_house: empData?.PresentAdress,
          present_adress_post_office: empData?.PresentPO,
          present_adress_upazila: empData?.PresentUpazilla,
          present_adress_district: empData?.PresentDistrictID,
          permanent_adress_village_house: empData?.PermanentAdress,
          permanent_adress_post_office: empData?.PermanentPO,
          permanent_adress_upazila: empData?.PermanentUpazilla,
          permanent_adress_district: empData?.PermanentDistrictID,
          official_adress_village_house: empData?.OfficialAdress,
          official_adress_post_office: empData?.OfficialPO,
          official_adress_upazila: empData?.OfficialUpazilla,
          official_adress_district: empData?.OfficialDistrictID,
          spouse_name: empData?.SpouseName,
          spouse_nationality: empData?.SpouseNationality,
          spouse_national_id_number: empData?.SpouseCardID,
          job_lrp_date: empData?.LRPDate,
        });
      });
  }, [dispatch, empId]);
  return (
    <div>
      <CRow>
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
            <CCardHeader>
              <CButton
                color="info"
                size="lg"
                onClick={(e) => {
                  history.goBack();
                }}
                style={{ float: "left" }}
              >
                Back
              </CButton>
            </CCardHeader>
            <CCardBody>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                <CTabs>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink>Employee</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Job</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>General</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Adress</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Spouse</CNavLink>
                    </CNavItem>

                    <CNavItem>
                      <CNavLink>Children</CNavLink>
                    </CNavItem>

                    <CNavItem>
                      <CNavLink>Docs</CNavLink>
                    </CNavItem>
                  </CNav>
                  <CTabContent className="col-md-12">
                    <EmployeeTab
                      handleInput={handleInput}
                      handleFile={handleFile}
                      data={data}
                      errors={errors}
                      handleInputBirthDate={handleInputBirthDate}

                      //birthDate={birthDate}
                    />
                    <JobTab
                      handleInput={handleInput}
                      data={data}
                      errors={errors}
                      handleInputJoiningDate={handleInputJoiningDate}
                      handleInputConfirmationDate={handleInputConfirmationDate}
                      handleInputLRPDate={handleInputLRPDate}
                    />
                    <GeneralTab
                      handleInput={handleInput}
                      dara={data}
                      data={data}
                    />
                    <AdressTab handleInput={handleInput} data={data} />
                    <SpouseTab
                      handleInput={handleInput}
                      data={data}
                      handleFile={handleFile}
                    />
                    <ChildrenTab
                      handleInput={handleInput}
                      handleFile={handleFile}
                      data={data}
                      employeeId={empId}
                    />
                    <DocsTab
                      handleInput={handleInput}
                      handleFile={handleFile}
                      data={data}
                      employeeId={empId}
                    />
                  </CTabContent>
                </CTabs>
                <div style={{ float: "right" }}>
                  <CButton
                    type="submit"
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    style={{ margin: 2 }}
                  >
                    Save
                  </CButton>

                  <CButton
                    color="danger"
                    variant="outline"
                    shape="square"
                    size="sm"
                    style={{ margin: 2 }}
                  >
                    Reset
                  </CButton>
                </div>
              </form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default AddEmployee;
