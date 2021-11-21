import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHealthInfos } from "src/actions/healthinfo";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import HealthInfoModal from "./HealthInfoModal";
import HealthInfoTable from "./HealthInfoTable";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";
import mainNavigation from "src/containers/_nav";

const HealthInfo = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchHealthInfos(userID));
  }, [dispatch]);
  const { healthInfos } = useSelector((state) => state.healthInfos);
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
        <SettingPageTitle title="Health information" />
        <CButton
          onClick={() => {
            if (programs && programs.healthInfo?.Add === 1) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new health infos
        </CButton>
      </div>
      <HealthInfoTable
        healthInfos={healthInfos}
        userID={userID}
        editPermission={programs && programs.healthInfo?.Edit}
        deletePermission={programs && programs.healthInfo?.Delete}
      />
      <HealthInfoModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new health infos"}
      />
    </CCard>
  );
};

export default HealthInfo;
