import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanTypes } from "src/actions/loantypes";
import LoanTypeModal from "src/views/modules/settings/human-ressources/loantypes/LoanTypeModal";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import LoanTypesTable from "./LoanTypesTable";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";
import mainNavigation from "src/containers/_nav";

const Loantypes = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchLoanTypes(userID));
  }, [dispatch]);
  const { loantypes } = useSelector((state) => state.loantype);
  const [modal, setModal] = useState(false);
  const [userProgramsPermissions, setUserProgramsPermissions] = useState([]);
  const [programs, setPrograms] = useState({});

  const toggle = () => {
    setModal(!modal);
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

  console.log(userProgramsPermissions);
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Loan types" />
        <CButton
          onClick={() => {
            if (programs && programs.loanType?.Add === 1) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new loan type
        </CButton>
      </div>
      <LoanTypesTable
        loantypes={loantypes}
        userID={userID}
        editPermission={programs && programs.loanType?.Edit}
        deletePermission={programs && programs.loanType?.Delete}
      />
      <LoanTypeModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new loan type"}
      />
    </CCard>
  );
};

export default Loantypes;
