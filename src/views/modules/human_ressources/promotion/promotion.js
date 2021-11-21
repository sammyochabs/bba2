import {
  CCardBody,
  CRow,
  CCol,
  CButton,
  CCard,
  CFormGroup,
  CButtonGroup,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanTypes } from "src/actions/loantypes";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import {
  fetchEducationlist,
  fetchEmployeeDropdown,
  fetchDesignationDropdown,
  fetchGradeDropdown,
} from "src/actions/HumanRessource/promotion.services";
import PromotionTable from "./promotionTable";
import PromotionModal from "./promotionModal";
import { ExportCSV } from "src/actions/ExportCSV";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";
import mainNavigation from "src/containers/_nav";

const Promotion = () => {
  // const dispatch = useDispatch();
  const [promotionList, setpromotionList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [desgination, setDesgination] = useState([]);
  const [grade, setGradeList] = useState([]);

  const [employeeName, setemployeeName] = useState("");
  const [Type, setType] = useState("");
  const [designation, setdesignation] = useState("");
  const [organization, setOrganization] = useState("");
  const [postingType, setPostingType] = useState("");
  const [Location, setLocation] = useState("");
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [promotionDate, setPromotionDate] = useState(new Date());
  const [GradeORPayscale, setGradeORPayscale] = useState("");
  const [Grade, setGrade] = useState("");
  const [userProgramsPermissions, setUserProgramsPermissions] = useState([]);
  const [programs, setPrograms] = useState({});

  const userID = localStorage.getItem("userID");
  useEffect(async () => {
    setpromotionList(await fetchEducationlist(userID));
    setEmployeeList(await fetchEmployeeDropdown(userID));
    setDesgination(await fetchDesignationDropdown(userID));
    setGradeList(await fetchGradeDropdown(userID));
  }, []);
  //  const { loantypes } = useSelector(state => state.loantype)
  const [modal, setModal] = useState(false);
  const [responseModal, setResponseModal] = useState(false);

  const toggle = () => {
    setemployeeName("");
    setType("");
    setdesignation("");
    setOrganization("");
    setPostingType("");
    setLocation("");
    setGradeORPayscale("");
    setResponseModal(false);
    setModal(!modal);
  };

  const clearForm = () => {
    alert("clear");
  };

  const reInitalizeList = async () => {
    setpromotionList(await fetchEducationlist(userID));
  };

  useEffect(() => {
    getUserProgramsPermisions(
      localStorage.getItem("userID"),
      localStorage.getItem("roleid")
    ).then((res) => {
      setUserProgramsPermissions(res);
    });
  }, []);

  useEffect(() => {
    mainNavigation.then((res) => {
      console.log(res);
      setPrograms(res.programs);
    });
  }, [mainNavigation]);

  console.log(programs);

  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Promotion/Charge List" />
        <CRow>
          <CCol sm="12">
            <CFormGroup className={"mr-1"}>
              <CButton
                onClick={() => {
                  if (programs && programs.promotion?.Add === 1) {
                    toggle();
                  } else {
                    alert("You dont have permission to do this");
                  }
                }}
                color="info"
              >
                + Add Promotion/Charge
              </CButton>
              <ExportCSV
                color="info"
                csvData={promotionList}
                fileName={"Promotion-charge-list"}
                permission={programs && programs.promotion?.Export}
              />
            </CFormGroup>
          </CCol>
        </CRow>
      </div>

      <PromotionTable
        editPermission={programs && programs.promotion?.Edit}
        viewPermission={programs && programs.promotion?.View}
        deletePermission={programs && programs.promotion?.Delete}
        employeeList={promotionList}
        userID={userID}
        employeedropdown={employeeList}
        desginationdropdown={desgination}
        gradedropdown={grade}
        setemployeeName={setemployeeName}
        employeeName={employeeName}
        Type={Type}
        setType={setType}
        designation={designation}
        setdesignation={setdesignation}
        organization={organization}
        setOrganization={setOrganization}
        postingType={postingType}
        setPostingType={setPostingType}
        Location={Location}
        setLocation={setLocation}
        FromDate={FromDate}
        setFromDate={setFromDate}
        ToDate={ToDate}
        setToDate={setToDate}
        promotionDate={promotionDate}
        setPromotionDate={setPromotionDate}
        GradeORPayscale={GradeORPayscale}
        setGradeORPayscale={setGradeORPayscale}
        Grade={Grade}
        setGrade={setGrade}
        responseModal={responseModal}
        setResponseModal={setResponseModal}
        reInitalizeList={reInitalizeList}
      />
      <PromotionModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new Promotion/Charge"}
        currentValue={userID}
        employeedropdown={employeeList}
        desginationdropdown={desgination}
        gradedropdown={grade}
        clearfields={clearForm}
        setemployeeName={setemployeeName}
        employeeName={employeeName}
        Type={Type}
        setType={setType}
        designation={designation}
        setdesignation={setdesignation}
        organization={organization}
        setOrganization={setOrganization}
        postingType={postingType}
        setPostingType={setPostingType}
        Location={Location}
        setLocation={setLocation}
        FromDate={FromDate}
        setFromDate={setFromDate}
        ToDate={ToDate}
        setToDate={setToDate}
        promotionDate={promotionDate}
        setPromotionDate={setPromotionDate}
        GradeORPayscale={GradeORPayscale}
        setGradeORPayscale={setGradeORPayscale}
        Grade={Grade}
        setGrade={setGrade}
        responseModal={responseModal}
        setResponseModal={setResponseModal}
        reInitalizeList={reInitalizeList}
      />
    </CCard>
  );
};

export default Promotion;
