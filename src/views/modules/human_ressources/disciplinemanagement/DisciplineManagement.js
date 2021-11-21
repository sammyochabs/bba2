import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDisciplines } from "src/actions/HumanRessource/disciplines";
import DisciplineEditModal from "src/views/modules/human_ressources/disciplinemanagement/DisciplineEditModal";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import DisciplinesTable from "./DisciplinesTable";
import { getEmployeeList } from "src/actions/HumanRessource/employees";
import { getPunishmentList } from "src/actions/HumanRessource/punishmentList";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";
import mainNavigation from "src/containers/_nav";

const DisciplineManagement = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchDisciplines(userID));
  }, [dispatch]);
  const { disciplines } = useSelector((state) => state.disciplines);
  const [modal, setModal] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [data, setData] = useState("");
  const [punishmentList, setPunishmentList] = useState([]);
  const [userProgramsPermissions, setUserProgramsPermissions] = useState([]);
  const [programs, setPrograms] = useState({});

  const toggle = () => {
    setModal(!modal);
    getEmployeeList((employeeListResult) => {
      setEmployeeList(employeeListResult);
    });

    getPunishmentList((punishmentListResult) => {
      setPunishmentList(punishmentListResult);
    });
  };

  // let userProgramsPermissions;

  // if (localStorage.getItem("userProgramsPermissions") !== "undefined") {
  //   userProgramsPermissions = JSON.parse(
  //     localStorage.getItem("userProgramsPermissions")
  //   );
  // }

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

  console.log(userProgramsPermissions);
  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Disciplines" />
        <CButton
          onClick={() => {
            if (programs && programs.disciplineManagement?.Add === 1) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new discipline
        </CButton>
      </div>
      <DisciplinesTable
        disciplines={disciplines}
        userID={userID}
        editPermission={programs && programs.disciplineManagement?.Edit}
        viewPermission={programs && programs.disciplineManagement?.Edit?.View}
        deletePermission={programs && programs.disciplineManagement?.Delete}
      />
      <DisciplineEditModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new discipline"}
        employeeList={employeeList}
        punishmentList={punishmentList}
        data={data}
        setData={setData}
      />
    </CCard>
  );
};

export default DisciplineManagement;
