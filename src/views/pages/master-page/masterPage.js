// import { CContainer } from "@coreui/react";
import React, { useEffect, useState } from "react";
import BbaLogo from "src/assets/bba-master_logo";
import {
  archiveIcon,
  briefcaseIcon,
  calendarIcon,
  chartIcon,
  dollarIcon,
  lockIcon,
  settingsIcon,
  toolIcon,
  usersIcon,
} from "src/assets/icons/modules";
import { TheHeader } from "src/containers";
import Card from "src/reusable/modules-card/card";
import Calendar from "src/views/plugins/calendar/Calendar";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { getUserPermissions } from "src/services/apiCalls";
const MasterPage = () => {
  const [permissions, setPermissions] = useState([]);
  const [modules, setModules] = useState({});
  const currentDate = moment().format("MMMM Do YYYY");

  var loggedInUser = localStorage.userName;

  const fetchPermissions = async () => {
    const fetchedPermissions = await getUserPermissions(
      localStorage.getItem("userID"),
      localStorage.getItem("roleid")
    );
    console.log("fetchedPermissions", fetchedPermissions);
    setPermissions(fetchedPermissions);
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  useEffect(() => {
    let holderObject = {};
    permissions &&
      permissions.forEach((module) => {
        console.log(module);
        if (module.ModuleID === 1) {
          // setModules({ ...modules, settings: module });
          // console.log(modules);
          holderObject = { ...holderObject, settings: module };
        }
        if (module.ModuleID === 2) {
          // setModules({ ...modules, systemAdminWing: module });
          holderObject = { ...holderObject, systemAdminWing: module };
        }
        if (module.ModuleID === 3) {
          // setModules({ ...modules, planningAndDevelopmentWing: module });
          holderObject = {
            ...holderObject,
            planningAndDevelopmentWing: module,
          };
        }
        if (module.ModuleID === 4) {
          // setModules({ ...modules, operationAndMaintanance: module });
          holderObject = { ...holderObject, operationAndMaintanance: module };
        }
        if (module.ModuleID === 5) {
          // setModules({ ...modules, financeAndAccountsWing: module });
          holderObject = { ...holderObject, financeAndAccountsWing: module };
        }
        if (module.ModuleID === 6) {
          setModules({ ...modules, technicalWing: module });
          holderObject = { ...holderObject, technicalWing: module };
        }
      });

    setModules(holderObject);
  }, [permissions]);

  console.log(permissions);

  console.log(modules);

  return (
    <div className="master-page-container">
      <TheHeader />
      <div className="master-page">
        <div className="calendar">
          <div className="current-date">
            <h1>My todos</h1>
            <span>{currentDate}</span>
          </div>
          <Calendar />
        </div>
        <div className="modules">
          <div className="row">
            <BbaLogo size={100} />
          </div>
          <div className="mt-3">
            <h1 className="welcome-text">
              Welcome back, <br />
              <span className="username">{loggedInUser}</span>
            </h1>
          </div>
          <div className="modules-wrapper">
            {/* <Card
              icon={settingsIcon}
              module="Settings"
              bgColor="#89abcd"
              path="/dashboard"
              moduleName="Settings"
            />*/}
            <div className="moduleEmptySpace"></div>

            <Card
              icon={lockIcon}
              module="System Admin wing"
              bgColor="#5998c2"
              path="/dashboard"
              moduleName="Administration"
              permission={modules && modules.systemAdminWing?.Permission}
            />
            {/* <Card
              icon={usersIcon}
              module="Human Resources"
              bgColor="#3c78a7"
              path="/dashboard"
              moduleName="Human Ressources"
            /> */}
            <div className="moduleEmptySpace"></div>
            <Card
              icon={briefcaseIcon}
              module="Planning and Development wing"
              bgColor="#556eef"
              path="/dashboard"
              moduleName="Planning and Development"
              permission={
                modules && modules.planningAndDevelopmentWing?.Permission
              }
            />
            {/* <Card icon={calendarIcon} module="Project Manager" bgColor="#485ed7" path="/dashboard" moduleName="Project Manager" /> */}
            <Card
              icon={toolIcon}
              module="Operation & Maintenance"
              bgColor="#364bb8"
              path="/dashboard"
              moduleName="Operating & Maintenance"
              permission={
                modules && modules.operationAndMaintanance?.Permission
              }
            />
            <Card
              icon={dollarIcon}
              module="Finance and Accounts wing"
              bgColor="#8980ff"
              path="/dashboard"
              moduleName="Finance and Accounts wing" //"Finance and Accounts"
              permission={modules && modules.financeAndAccountsWing?.Permission}
            />

            {/* <Card
              //href="https://google.com"
              icon={archiveIcon}
              module="Store Management"
              bgColor="#5942bb"
              path="/dashboard"
              moduleName="Store Management"
              //onClick={() => window.open('//' + 'google.com', '_blank')}

              //path="https://www.google.com/"
            ></Card> */}
            <div className="moduleEmptySpace"></div>
            <Card
              icon={chartIcon}
              module="Technical wing"
              bgColor="#6c5ce7"
              path="/dashboard"
              moduleName="Technical"
              permission={modules && modules.technicalWing?.Permission}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterPage;
