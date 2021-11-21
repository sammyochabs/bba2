import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDistricts } from "../../../../../actions/district";
import SettingPageTitle from "../../../../../reusable/SettingPageTitle";
import DistrictModal from "./DistrictModal";
import DistrictTable from "./DistrictTable";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";
import mainNavigation from "src/containers/_nav";

const District = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(fetchDistricts(userID));
  }, [dispatch]);
  const { districts } = useSelector((state) => state.districts);
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
        <SettingPageTitle title="District" />
        <CButton
          onClick={() => {
            if (programs && programs.districts?.Add === 1) {
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new District
        </CButton>
      </div>
      <DistrictTable
        districts={districts}
        userID={userID}
        editPermission={programs && programs.districts?.Edit}
        deletePermission={programs && programs.districts?.Delete}
      />
      <DistrictModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new District"}
      />
    </CCard>
  );
};

export default District;
