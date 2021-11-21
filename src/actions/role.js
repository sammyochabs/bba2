import apiClient from "src/services/api";

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: "FETCH_GET_REQUEST",
  };
};

// fetch all role
export const getRoles = (roles) => {
  return {
    type: "GET_ROLES",
    payload: roles,
  };
};
export const fetchRoles = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .get("/role/list", { params: { userID: userID } })
      .then((res) => {
        const { RoleList } = res.data;
        return dispatch(getRoles(RoleList));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// add new role
export const addRole = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .post("/role/add", data, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== "200") {
          alert("Please make sure all fields are filled");
        } else {
          alert("Role added successfully!");
          window.location.reload();
          return dispatch(fetchRoles(userID));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// update role
export const updateRole = (newRole, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .post("/role/update", newRole, { params: { userID: userID } })
      .then((res) => {
        if (res.data.status !== "200")
          alert("Please make sure all fields are filled");
        else {
          alert(`Designation updated successfully!`);
          window.location.reload();
          return dispatch(fetchRoles(userID));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// delete role
export const deleteRole = (roleId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .post("/role/delete", roleId, { params: { userID: userID } })
      .then(() => {
        alert("Role deleted successfully!");
        return dispatch(fetchRoles(userID));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// set selected role-modules
export const getRoleModules = (modules) => {
  return {
    type: "GET_ROLE_MODULES",
    payload: modules,
  };
};

// fetch selected role-modules
export const fetchSelectedRoles = (roleId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .get("/role/module", { params: { userID: userID, RoleID: roleId } })
      .then((res) => {
        const { Module } = res.data;
        dispatch(getRoleModules(Module));
        return dispatch(fetchRoles(userID));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

//add module
export const grantRole = (data) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .post("/role/SetModulePermission", data, {
        params: { userID: localStorage.getItem("userID") },
      })
      .then((res) => {
        if (res.data.status !== "200") {
          alert("Something went wrong");
        } else {
          return dispatch(
            fetchSelectedRoles(
              data.get("RoleID"),
              localStorage.getItem("userID")
            )
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// set selected role-modules
export const getProgramsPermission = (programs) => {
  return {
    type: "GET_PROGRAMS_PERMISSION",
    payload: programs,
  };
};

// fetch selected role-modules
export const fetchProgramPermissions = (roleId, moduleID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .get("/role/program", {
        params: {
          userID: localStorage.getItem("userID"),
          RoleID: roleId,
          ModuleID: moduleID,
        },
      })
      .then((res) => {
        const { Program } = res.data;
        // console.log("Program");
        console.log(Program);
        return dispatch(getProgramsPermission(Program));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// grant program permission
export const grantProgramPermission = (data) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .post("/role/SetProgramPermission", data, {
        params: { userID: localStorage.getItem("userID") },
      })
      .then((res) => {
        if (res.data.status !== "200") {
          alert(res.data.message);
        } else {
          return dispatch(
            fetchProgramPermissions(data.get("RoleID"), data.get("ModuleID"))
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
// grant program permission
export const grantProgramPermissionALL = (data) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .post("/role/SetProgramPermissionALL", data, {
        params: { userID: localStorage.getItem("userID") },
      })
      .then((res) => {
        if (res.data.status !== "200") {
          alert(res.data.message);
        } else {
          return dispatch(
            fetchProgramPermissions(data.get("RoleID"), data.get("ModuleID"))
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
