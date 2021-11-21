import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPunishments } from "src/actions/punishment";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import PunishmentModal from "./PunishmentModal";
import PunishmentTable from "./PunishmentTable";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";
import mainNavigation from "src/containers/_nav";

const Punishment = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchPunishments(userID));
  }, [dispatch]);
  const { punishments } = useSelector((state) => state.punishments);
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
        <SettingPageTitle title="Punishments" />
        <CButton
          onClick={() => {
            if (programs && programs.punishments?.Add === 1) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new Punishment
        </CButton>
      </div>
      <PunishmentTable
        punishments={punishments}
        userID={userID}
        editPermission={programs && programs.punishments?.Edit}
        deletePermission={programs && programs.punishments?.Delete}
      />
      <PunishmentModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new Punishments"}
      />
    </CCard>
  );
};

export default Punishment;
