import apiClient from "src/services/api";

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: "FETCH_GET_REQUEST",
  };
};

// fetch all Employees
export const getEmployees = (employees) => {
  return {
    type: "GET_EMPLOYEES",
    payload: employees,
  };
};

export const getDocs = (docs) => {
  return {
    type: "GET_DOCS",
    payload: docs,
  };
};

export const setEmployeeId = (id) => {
  return {
    type: "SET_EMPLOYEE_ID",
    payload: id,
  };
};

export const getEmployeeImg = (img) => {
  return {
    type: "GET_EMPLOYEE_IMG",
    payload: img,
  };
};

export const getEmployeeDoc = (doc) => {
  return {
    type: "GET_EMPLOYEE_DOC",
    payload: doc,
  };
};

// get file
export const getFile = (idName, idValue, fileName, fileUrl) => {
  // //;
  apiClient
    .get("/" + fileUrl, {
      params: { userID: localStorage.getItem("userID"), [idName]: idValue },
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
      const type = response?.headers["content-type"];
      const blob = new Blob([response?.data], {
        type: type,
        encoding: "UTF-8",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
};

export const getChildFile = (idName, idValue, fileName, fileUrl) => {
  // //;
  apiClient
    .get("/" + fileUrl, {
      params: { userID: localStorage.getItem("userID"), [idName]: idValue },
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
      const type = response?.headers["content-type"];
      const blob = new Blob([response?.data], {
        type: type,
        encoding: "UTF-8",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
};

export const getImage = async (params) => {
  return (
    await apiClient.get("/employee/getPhoto", {
      params,
    })
  ).data;
};

export const setImage = (data) => {
  apiClient.post("/employee/setPI", data, {
    "Content-Type": "multipart/form-data",
  });
};

export const fetchEmployees = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .get("/employee/list", {
        params: { UserID: userID },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { EmployeeList } = res.data;
        dispatch(getEmployees(EmployeeList));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const fetchEmployee = (userID, empID, callback) => {
  //;
  apiClient
    .get("/employee/view", {
      params: { userID: userID, employeeID: empID },
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      const { EmployeeView } = res.data;
      callback(EmployeeView);
      //return dispatch(getEmployees(EmployeeList));
    })
    .catch((err) => {
      console.error(err);
    });
};

// add new Employee
export const addEmployee = (data, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .post("/employee/add", data, {
        params: { userID: userID },
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const { currentEmployeeID } = res.data;
        console.log(currentEmployeeID);
        if (currentEmployeeID) alert("Employee added successfully!");
        else alert(res.message); //salert("Error comes in adding employee");
        dispatch(setEmployeeId(currentEmployeeID));
        return dispatch(fetchEmployees(userID));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// update Employee
export const updateEmployee = (newEmployee, userID, EmployeeID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .post("/employee/update", newEmployee, {
        params: { userID: userID, EmployeeID },
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.status != "200") {
          alert(res.data.status + " " + res.data.message);
        } else {
          alert(`Employee updated successfully!`);
        }
        return dispatch(fetchEmployees(userID));
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      });
  };
};

// delete Employee
export const deleteEmployee = (employeeId, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .post("/employee/delete", employeeId, { params: { userID: userID } })
      .then(() => {
        alert("Employee deleted successfully!");
        return dispatch(fetchEmployees(userID));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// Employee Documents CRD
export const fetchDocById = (id, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .get("/EmployeeDocument/GetDoc", {
        params: { userID: userID, documentID: id },
      })
      .then((res) => {
        const file_info = res.data;
        console.log("FILE: " + file_info);
        dispatch(getEmployeeDoc(file_info));
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(file_info);
        link.download = id;
        link.click();
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// get employee profile image
export const fetchEmployeeImg = (id, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .get("/employee/getpi", { params: { userID: userID, EmployeeID: id } })
      .then((res) => {
        const { img } = res.data;
        return dispatch(getEmployeeImg(img));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// get docs
export const fetchDocs = (id, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .get("/employeeDocument/list", {
        params: { userID: userID, EmployeeID: id },
      })
      .then((res) => {
        const { DocumentList } = res.data;
        return dispatch(getDocs(DocumentList));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// add new doc
export const addEmployeeDocument = (data, employeeID, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .post("/employeeDocument/add", data, { params: { userID: userID } })
      .then((res) => {
        alert("Document added successfully!");
        return dispatch(fetchDocs(employeeID, userID));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// delete doc
export const deleteEmployeeDocument = (docID, employeeID, userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .post("/employeeDocument/delete", docID, { params: { userID: userID } })
      .then(() => {
        alert("Document deleted successfully!");
        return dispatch(fetchDocs(employeeID, userID));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
