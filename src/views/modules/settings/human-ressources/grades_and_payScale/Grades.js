import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrades } from "../../../../../actions/grades";
import SettingPageTitle from "../../../../../reusable/SettingPageTitle";
import GradesModal from "./GradesModal";
import GradesTable from "./GradesTable";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";
import mainNavigation from "src/containers/_nav";

const Grades = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchGrades(userID));
  }, [dispatch]);
  const { grades } = useSelector((state) => state.grades);
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
        <SettingPageTitle title="Grades / Pay scales" />
        <CButton
          onClick={() => {
            if (programs && programs.grades?.Add === 1) {
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new grade
        </CButton>
      </div>
      <GradesTable
        grades={grades}
        userID={userID}
        editPermission={programs && programs.grades?.Edit}
        deletePermission={programs && programs.grades?.Delete}
      />
      <GradesModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new grade"}
      />
    </CCard>
  );
};

export default Grades;
