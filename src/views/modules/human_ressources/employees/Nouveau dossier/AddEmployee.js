import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabs,
} from "@coreui/react";

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
const AddEmployee = () => {
  const [data, setData] = useState({});
  const userID = 1;
  const dispatch = useDispatch();
  var formData = new FormData();

  const handleInput = (e) => {
    ////
    setData({ ...data, [e.target.name]: e.target.value });
    //setData({ ...data, [e.target.name]: e.target.value })
    return console.log(data);
  };
  const handleFile = (e) => {
    setData({ ...data, [e.target.name]: e.target.files[0] });
  };
  const verifyCheckbox = (checkbox) => {
    return !checkbox ? 0 : 1;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    //Object.keys(data).forEach((key) => formData.append(key, data[key]))
    //return dispatch(addEmployee(formData, userID))
    //setData(empty)
    //console.log('empty', data)
    //employee
    //
    if (data.employee_photo != null)
      formData.append("Photo", data.employee_photo);

    if (data.employee_name_english != null)
      formData.append("NameEnglish", data.employee_name_english);

    if (data.employee_name_bagla != null)
      formData.append("NameBangla", data.employee_name_bagla);

    if (data.employee_fathers_name_english != null)
      formData.append("FatherEnglish", data.employee_fathers_name_english);

    if (data.employee_fathers_name_bangla != null)
      formData.append("FatherBangla", data.employee_fathers_name_bangla);

    if (data.employee_mothers_name_english != null)
      formData.append("MotherEnglish", data.employee_mothers_name_english);

    if (data.employee_mothers_name_bangla != null)
      formData.append("MotherBangla", data.employee_mothers_name_bangla);

    if (data.employee_date_of_birth != null)
      formData.append(
        "DateBirth",
        moment(data.employee_date_of_birth).format("DD/MM/YYYY")
      );
    if (data.employee_registration_number != null)
      formData.append("RegistrationNumber", data.employee_registration_number);
    if (data.employee_card_id != null)
      formData.append("CardID", data.employee_card_id);
    if (data.employee_mobile_number != null)
      formData.append("Mobile", data.employee_mobile_number);

    //job
    if (data.job_designation != null)
      formData.append("DesignationID", data.job_designation);
    if (data.job_department != null)
      formData.append("DepartmentID", data.job_department);
    if (data.job_cadre != null) formData.append("Cadre", data.job_cadre);
    if (data.job_email != null) formData.append("Email", data.job_email);
    if (data.job_phone != null) formData.append("Phone", data.job_phone);
    if (data.job_joining_date != null)
      formData.append(
        "JoigningDate",
        moment(data.job_joining_date).format("DD/MM/YYYY")
      );
    if (data.job_date_confirmation != null)
      formData.append(
        "ConfirmationDate",
        moment(data.job_date_confirmation).format("DD/MM/YYYY")
      );
    if (data.job_lrp_date != null)
      formData.append(
        "LRPDate",
        moment(data.job_lrp_date).format("DD/MM/YYYY")
      );
    //general
    if (data.general_employee_blood != null)
      formData.append("BloodGroup", data.general_employee_blood);
    if (data.general_employee_religion != null)
      formData.append("Religion", data.general_employee_religion);
    if (data.general_employee_gender != null)
      formData.append("Gender", data.general_employee_gender);
    if (data.general_employee_freedom_fighter != null)
      formData.append(
        "FreedomFighter",
        verifyCheckbox(data.general_employee_freedom_fighter)
      );
    if (data.general_employee_children_freedom_fighter != null)
      formData.append(
        "Grandchild",
        verifyCheckbox(data.general_employee_children_freedom_fighter)
      );
    if (data.general_employee_tribal != null)
      formData.append("Tribal", verifyCheckbox(data.general_employee_tribal));
    if (data.general_employee_nationality != null)
      formData.append("Nationality", data.general_employee_nationality);
    //adress
    if (data.present_adress_village_house != null)
      formData.append("PresentAdress", data.present_adress_village_house);
    if (data.present_adress_post_office != null)
      formData.append("PresentPO", data.present_adress_post_office);
    if (data.present_adress_upazila != null)
      formData.append("PresentUpazilla", data.present_adress_upazila);
    if (data.present_adress_district != null)
      formData.append("PresentDistrictID", data.present_adress_district);
    if (data.permanent_adress_village_house != null)
      formData.append("PermanentAdress", data.permanent_adress_village_house);
    if (data.permanent_adress_post_office != null)
      formData.append("PermanentPO", data.permanent_adress_post_office);
    if (data.permanent_adress_upazila != null)
      formData.append("PermanentUpazilla", data.permanent_adress_upazila);
    if (data.permanent_adress_district != null)
      formData.append("PermanentDistrictID", data.permanent_adress_district);
    if (data.official_adress_village_house != null)
      formData.append("OfficialAdress", data.official_adress_village_house);
    if (data.official_adress_post_office != null)
      if (data.official_adress_post_office != null)
        formData.append("OfficialPO", data.official_adress_post_office);
    if (data.official_adress_upazila != null)
      formData.append("OfficialUpazilla", data.official_adress_upazila);
    if (data.official_adress_district != null)
      formData.append("OfficialDistrictID", data.official_adress_district);
    //spouse
    if (data.spouse_name != null)
      formData.append("SpouseName", data.spouse_name);
    if (data.spouse_nationality != null)
      formData.append("SpouseNationality", data.spouse_nationality);
    if (data.spouse_national_id_number != null)
      formData.append("SpouseCardID", data.spouse_national_id_number);
    console.log(formData);
    //return dispatch(addEmployee(formData, userID))
    return dispatch(addEmployee(formData, userID));
  };

  useEffect(() => {
    dispatch(fetchDepartments(1));
    dispatch(fetchDesignations(1));
    dispatch(fetchDistricts(1));
  }, [dispatch]);
  return (
    <div>
      <CRow>
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
            <CCardBody>
              <form
                onSubmit={(e) => {
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
                      <CNavLink>Adresss</CNavLink>
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
                    />
                    <JobTab handleInput={handleInput} />
                    <GeneralTab handleInput={handleInput} dara={data} />
                    <AdressTab handleInput={handleInput} />
                    <SpouseTab handleInput={handleInput} />
                    <ChildrenTab
                      handleInput={handleInput}
                      handleFile={handleFile}
                      data={data}
                    />
                    <DocsTab
                      handleInput={handleInput}
                      handleFile={handleFile}
                      data={data}
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
