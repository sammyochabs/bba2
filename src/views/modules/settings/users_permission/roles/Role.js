import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CInputCheckbox,
  CListGroup,
  CListGroupItem,
  CRow,
  CSwitch,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProgramPermissions,
  fetchRoles,
  fetchSelectedRoles,
  grantProgramPermission,
  grantRole,
  grantProgramPermissionALL,
} from "src/actions/role";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import RoleModal from "./RoleModal";
import RoleTable from "./RoleTable";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";
import mainNavigation from "src/containers/_nav";

const Role = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  const current_role_id = localStorage.getItem("roleID");
  let { roles, roleModules, programsPermission } = useSelector(
    (state) => state.roles
  );
  const [modal, setModal] = useState(false);
  let [checkedPermission, setCheckedPermission] = useState([]);
  let [showPrograms, setShowPrograms] = useState(false);
  let [currentModule, setCurrentModule] = useState(null);
  let [currentModuleID, setCurrentModuleID] = useState(null);
  let [checkedModulePermission, setCheckedModulePermission] =
    useState(roleModules);
  const [userProgramsPermissions, setUserProgramsPermissions] = useState([]);
  const [programs, setPrograms] = useState({});

  const formData = new FormData();
  useEffect(() => {
    dispatch(fetchRoles(userID));
    setShowPrograms(true);
    const currentRoleID = localStorage.getItem("roleID");

    if (currentRoleID === null) {
      roleModules = [];
    } else {
      dispatch(fetchSelectedRoles(currentRoleID, userID));
      // dispatch(fetchProgramPermissions(currentRoleID, 1));
    }
    //
  }, [dispatch]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSelectedRole = (role) => {
    localStorage.setItem("roleID", role.RoleID);
    localStorage.setItem("role", role.Role);
    window.location.reload();
  };

  const handleSelectAll = (e) => {
    //setCheckedPermission(!checkedPermission)
    formData.append("ModuleID", currentModuleID);
    formData.append("RoleID", current_role_id);
    formData.append("Value", 1);
    dispatch(grantProgramPermissionALL(formData));
    togglePrograms(1, currentModuleID, currentModule);
  };
  const handleDeSelectAll = (e) => {
    //setCheckedPermission(!checkedPermission)
    formData.append("ModuleID", currentModuleID);
    formData.append("RoleID", current_role_id);
    formData.append("Value", 0);
    dispatch(grantProgramPermissionALL(formData));
    togglePrograms(1, currentModuleID, currentModule);
  };
  const handleCheckbox = (e) => {
    setCheckedPermission({
      ...checkedPermission,
      [e.target.name]: e.target.checked,
    });
  };

  // handle module checkbox
  let handleSaveChanges = (e) => {
    let index = parseInt(e.target.value) - 1;
    formData.append("ModuleID", e.target.value);
    formData.append("RoleID", localStorage.getItem("roleID"));
    formData.append("enable", e.target.checked ? 1 : 0);
    dispatch(grantRole(formData));
    // setShowPrograms(true);
    return formData.get("enable") === "1"
      ? dispatch(
          fetchProgramPermissions(
            formData.get("RoleID"),
            formData.get("ModuleID")
          ),
          setShowPrograms(true)
        )
      : setShowPrograms(false);
  };

  // toggle programs
  const togglePrograms = (
    module_permission,
    current_module_id,
    module_name
  ) => {
    //if (module_permission === 1) {
    //;
    dispatch(fetchProgramPermissions(current_role_id, current_module_id));
    setCurrentModule(module_name);
    setCurrentModuleID(current_module_id);
    setShowPrograms(true);
    // }
  };

  // grant program permission
  const handleGrantProgramPermission = (e) => {
    formData.append("ModuleID", e.target.id);
    formData.append("ProgramID", e.target.value);
    formData.append("RoleID", current_role_id);
    formData.append("Action", e.target.name);
    formData.append("Value", e.target.checked ? 1 : 0);
    dispatch(grantProgramPermission(formData));
  };
  // render selected role module
  const renderRoles = roleModules.map((module, index) => {
    let userProgramsPermissions;

    if (localStorage.getItem("userProgramsPermissions") !== "undefined") {
      userProgramsPermissions = JSON.parse(
        localStorage.getItem("userProgramsPermissions")
      );
    }

    console.log(userProgramsPermissions);
    return (
      <CListGroup key={index}>
        <CListGroupItem className="d-flex justify-content-between">
          {module.ModuleAPP}
          <div className="d-flex align-items-center">
            <CSwitch
              className={"mx-1"}
              color={"success"}
              shape={"pill"}
              labelOn={"\u2713"}
              labelOff={"\u2715"}
              onChange={handleSaveChanges}
              name={module.ModuleAPP}
              value={module.ModuleID}
              defaultChecked={module?.Permission}
            />
            {module?.Permission === 1 ? (
              <Eye
                onClick={() => {
                  togglePrograms(
                    module?.Permission,
                    module.ModuleID,
                    module.ModuleAPP
                  );
                }}
              />
            ) : (
              <EyeOff color="#ddd" />
            )}
          </div>
        </CListGroupItem>
      </CListGroup>
    );
  });

  const renderProgams = programsPermission.map((program, index) => {
    return (
      <tr key={index}>
        <td>{program.Program}</td>
        <td>
          <CFormGroup variant="checkbox" className="checkbox">
            <CInputCheckbox
              id={program.ModuleID}
              name="Add"
              value={program.ProgramID}
              onChange={handleGrantProgramPermission}
              key={Math.random()}
              defaultChecked={program?.Add}
              // checked={checkedPermission}
            />
          </CFormGroup>
        </td>
        <td>
          <CFormGroup variant="checkbox" className="checkbox">
            <CInputCheckbox
              id={program.ModuleID}
              name="Edit"
              value={program.ProgramID}
              onChange={handleGrantProgramPermission}
              key={Math.random()}
              defaultChecked={program?.Edit}
              // checked={checkedPermission}
            />
          </CFormGroup>
        </td>
        <td>
          <CFormGroup variant="checkbox" className="checkbox">
            <CInputCheckbox
              id={program.ModuleID}
              name="View"
              value={program.ProgramID}
              onChange={handleGrantProgramPermission}
              key={Math.random()}
              defaultChecked={program?.View}
              // checked={checkedPermission}
            />
          </CFormGroup>
        </td>
        <td>
          <CFormGroup variant="checkbox" className="checkbox">
            <CInputCheckbox
              id={program.ModuleID}
              name="Delete"
              value={program.ProgramID}
              onChange={handleGrantProgramPermission}
              key={Math.random()}
              defaultChecked={program?.Delete}
              // checked={checkedPermission}
            />
          </CFormGroup>
        </td>
        <td>
          <CFormGroup variant="checkbox" className="checkbox">
            <CInputCheckbox
              id={program.ModuleID}
              name="Export"
              value={program.ProgramID}
              onChange={handleGrantProgramPermission}
              key={Math.random()}
              defaultChecked={program.Export}
              // checked={checkedPermission}
            />
          </CFormGroup>
        </td>
      </tr>
    );
  });

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
        <SettingPageTitle title="Roles & Permissions" />
      </div>
      <CRow>
        {/* roles */}
        <CCol md="4">
          <CButton
            onClick={() => {
              if (programs && programs.roles?.Add === 1) {
                // history.push("/HR/AddEducation");
                toggle();
              } else {
                alert("You dont have this permission");
              }
            }}
            color="info"
            className="col-md-12 mb-3"
          >
            + Add new role
          </CButton>
          <RoleTable
            roles={roles}
            userID={userID}
            selectedRole={handleSelectedRole}
          />
        </CCol>

        {/* modules access */}
        <CCol md="8">
          <div className="d-flex justify-content-between">
            <h4 className="mb-4">Modules</h4>
          </div>
          {Object.keys(roleModules)?.length === 0 ? (
            <p className="alert alert-warning">Please select a role.</p>
          ) : (
            <div>
              <p>
                <strong>Selected Role : {localStorage.role}</strong>
              </p>
              {renderRoles}
            </div>
          )}
          {/* modules permission */}
          <CCard className="mt-4">
            <CButton
              onClick={handleSelectAll}
              color="info"
              className="col-md-12 mb-3"
            >
              Select All Permissions
            </CButton>
            <CButton
              onClick={handleDeSelectAll}
              color="info"
              className="col-md-12 mb-3"
            >
              Deselect All Permissions
            </CButton>
            <CCardBody>
              <p>
                {currentModule !== null ? (
                  <strong>Selected Module : {currentModule}</strong>
                ) : null}
              </p>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Programs permission</th>
                    <th>Create</th>
                    <th>Edit</th>
                    <th>View</th>
                    <th>Delete</th>
                    <th>Export</th>
                  </tr>
                </thead>
                <tbody style={{ display: showPrograms ? "" : "none" }}>
                  {/* employee */}
                  {renderProgams}
                  {/* admin */}
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <RoleModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new role"}
      />
    </CCard>
  );
};

export default Role;
