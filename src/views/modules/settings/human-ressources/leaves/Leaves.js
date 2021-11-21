import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaves } from "src/actions/leaves";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import LeavesModal from "./LeavesModal";
import LeavesTable from "./LeavesTable";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";
import mainNavigation from "src/containers/_nav";

const Leaves = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchLeaves(userID));
  }, [dispatch]);
  const { leaves } = useSelector((state) => state.leaves);
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
        <SettingPageTitle title="Leaves & duration" />
        <CButton
          onClick={() => {
            if (programs && programs.leaveManagement?.Add === 1) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new leave
        </CButton>
      </div>
      <LeavesTable
        leaves={leaves}
        userID={userID}
        editPermission={programs && programs.leaveManagement?.Edit}
        deletePermission={programs && programs.leaveManagement?.Delete}
      />
      <LeavesModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new leaves"}
      />
    </CCard>
  );
};

export default Leaves;
