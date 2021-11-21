import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCol,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabs,
} from "@coreui/react";
import { deleteEmployee, fetchEmployee } from "src/actions/employee";
import EmployeeViewTab from "./tabs/EmployeeViewTab";
import DocsTab from "./tabs/DocsTab";
import ChildrenTab from "./tabs/ChildrenTab";
import JobViewTab from "./tabs/JobViewTab";
import GeneralViewTab from "./tabs/GeneralViewTab";
import AdressViewTab from "./tabs/AddressViewTab";
import SpouseViewTab from "./tabs/SpouseViewTab";
import { useDispatch } from "react-redux";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ViewEmployee = ({
  match: {
    params: { empId },
  },
  history,
}) => {
  const [data, setData] = useState({});
  const [singleEmp, setSingleEmp] = useState();
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  const handleDelete = (employeeID, userID) => {
    if (window.confirm("are you sure!")) {
      const formData = new FormData();
      formData.append("EmployeeID", employeeID);
      // console.log(formData.get("EmployeeID"))
      dispatch(deleteEmployee(formData, userID));
      setTimeout(() => {
        history.push("/HR/listEmployee");
      }, 500);
    }
  };
  useEffect(() => {
    if (empId)
      fetchEmployee(userID, empId, (empData) => {
        setSingleEmp(empData);
        //
        setData({
          employee_photo: empData?.Photo,
          employee_name_english: empData?.NameEnglish,
          employee_name_bagla: empData?.NameBangla,
          employee_fathers_name_english: empData?.FatherEnglish,
          employee_fathers_name_bangla: empData?.FatherBangla,
          employee_mothers_name_english: empData?.MotherEnglish,
          employee_mothers_name_bangla: empData?.MotherBangla,
          employee_date_of_birth: empData?.DateBirth,
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
          job_lrp_date: empData?.LRPDate,
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
        });
      });
  }, [empId]);
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

              {/*<CButton
                color="danger"
                size="lg"
                onClick={(e) => {
                  handleDelete(empId, userID);
                }}
                style={{ float: "right" }}
              >
                Delete
              </CButton>
              <CButton
                color="success"
                size="lg"
                onClick={(e) => {
                  history.push(`/HR/UpdateEmployee/${empId}`);
                }}
                style={{ float: "right", marginRight: 10 }}
              >
                Edit
              </CButton>*/}
            </CCardHeader>
            <CCardBody>
              <form>
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
                    <EmployeeViewTab data={data} view />
                    <JobViewTab data={data} />
                    <GeneralViewTab data={data} view />
                    <AdressViewTab data={data} view />
                    <SpouseViewTab data={data} view />
                    <ChildrenTab data={data} view />
                    <DocsTab data={data} view />
                  </CTabContent>
                </CTabs>
              </form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default ViewEmployee;
