import axios from "axios";
import apiClient from "./api";

//Admin Data
export const fetchAdminData = (userid) => {
  return apiClient
    .get("Dashboard/DashCard", { params: { userid: userid } })
    .then((res) => {
      //console.log('here')
      //console.log(res.data.DashboardData)
      return res.data.DashboardData;
    })
    .catch((err) => {
      console.error(err);
    });
};

//Employee Data
export const fetchEmployeeData = (userid, employeeid) => {
  return apiClient
    .get("/Dashboard/DashCard", {
      params: { userid: userid, employeeid: employeeid },
    })

    .then((res) => {
      console.log("here");
      return res.data.DashboardData;
    })
    .catch((err) => {
      console.error(err);
    });
};

//Grapgh Data with admin

export const fetchGrapheData = (userid, type, group) => {
  return apiClient
    .get("/dashboard/graph", {
      params: { userid: userid, type: type, Group: group },
    })
    .then((res) => {
      return res.data.GraphData;
    })
    .catch((err) => {
      console.error(err);
    });
};

//Graph data with employee
export const fetchEmployeeGraphData = (userid, employeeid, type, group) => {
  return apiClient
    .get("/dashboard/graph", {
      params: {
        userid: userid,
        employeeid: employeeid,
        type: type,
        Group: group,
      },
    })
    .then((res) => {
      return res.data.GraphData;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getUserPermissions = (userID, roleid) => {
  return apiClient
    .get("/role/module", {
      params: {
        userID,
        roleid,
      },
    })
    .then((res) => {
      console.log(res);
      return res.data.Module;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getUserProgramsPermisions = async (userID, roleid) => {
  const response = await apiClient
    .get("/role/program", {
      params: {
        userID,
        roleid,
      },
    })
    .catch((err) => console.log(err));

  console.log(response);

  if (response) {
    return response?.data?.Program;
  } else {
    alert("Failed to fetch please retry");
  }

  // .then((res) => {
  //   console.log(res);
  //   return res.data.Program;
  // })
  // .catch((err) => {
  //   console.error(err);
  // });
};
