import apiClient from "src/services/api";

// this function will be executed for each action call to make {loading: true}

export const fetchGetRequest = () => {
  return {
    type: "FETCH_GET_REQUEST",
  };
};

// fetch all PromotionList
export const getEmpLoans = (empLoan) => {
  return {
    type: "GET_PROMOTIONLIST",
    payload: empLoan,
  };
};
export const fetchEmpLoans = (userID) => {
  return (dispatch) => {
    dispatch(fetchGetRequest());
    apiClient
      .get("/Loan/List", { params: { UserID: userID } })
      .then((res) => {
        console.log(res.data.PromotionList);
        const empLoan = res.data.PromotionList;
        console.log(empLoan, "empLOan");
        return dispatch(getEmpLoans(empLoan));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// add new Emp Loan
export const addEmpLoan = (data, userID) => {
  return (dispatch) => {
    for (var [key, value] of data.entries()) {
      console.log(key, value);
    }
    dispatch(fetchGetRequest());
    apiClient
      .post("/Loan/Add", data, { "Content-Type": "multipart/form-data" })
      .then((res) => {
        //
        console.log(res);
        if (res.data.status != "200") {
          alert(res.data.status + " " + res.data.message);
        } else {
          alert("Employee Loan Request Submitted Successfully!");
        }

        return dispatch(fetchEmpLoans(userID));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const updateEmpLoan = (formData, userID) => {
  return (dispatch) => {
    for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }
    dispatch(fetchGetRequest());
    apiClient
      .post("/Loan/Update", formData, {
        "Content-Type": "multipart/form-data",
      })
      .then((res) => {
        console.log(res.data, "res.data");
        if (res.data.status != "200") {
          alert(res.data.status + " " + res.data.message);
        }
        if (res.data.status == "200") {
          alert("Employee Loan Request Updated Successfully!");
        }

        return dispatch(fetchEmpLoans(userID));
      })
      .catch((err) => {
        console.error(err, "errrrrr");
      });
  };
};

export const approveLoan = (newLeave, userID) => {
  return (dispatch) => {
    for (var [key, value] of newLeave.entries()) {
      console.log(key, value);
    }
    dispatch(fetchGetRequest());
    apiClient
      .post("Loan/Approve", newLeave, { "Content-Type": "multipart/form-data" })
      .then((res) => {
        if (res.data.status != "200") {
          alert(res.data.status + " " + res.data.message);
        } else {
          alert(`Loan Request approved successfully!`);
        }

        return dispatch(fetchEmpLoans(userID));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
export const cancelLoan = (newLeave, userID) => {
  return (dispatch) => {
    for (var [key, value] of newLeave.entries()) {
      console.log(key, value);
    }
    dispatch(fetchGetRequest());
    apiClient
      .post("Loan/Cancel", newLeave, { "Content-Type": "multipart/form-data" })
      .then((res) => {
        if (res.data.status != "200") {
          alert(res.data.status + " " + res.data.message);
        } else {
          alert(`Loan Request canceled successfully!`);
        }

        return dispatch(fetchEmpLoans(userID));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const deleteLoan = (newLeave, userID) => {
  return (dispatch) => {
    for (var [key, value] of newLeave.entries()) {
      console.log(key, value);
    }
    dispatch(fetchGetRequest());
    apiClient
      .post("Loan/Delete", newLeave, { "Content-Type": "multipart/form-data" })
      .then((res) => {
        if (res.data.status != "200") {
          alert(res.data.status + " " + res.data.message);
        } else {
          alert(`Loan Request deleted successfully!`);
        }

        return dispatch(fetchEmpLoans(userID));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
// // update punishment
// export const updatePunishment = (newPunishment, userID) => {
//   return (dispatch) => {
//     dispatch(fetchGetRequest());
//     apiClient
//       .post("punishmentType/update", newPunishment, {params : {userID : userID}})
//       .then(() => {
//         alert(`Punishment updated successfully!`);
//         return dispatch(fetchPunishments(userID));
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };
// };

// // delete punishment
// export const deletePunishment = (punishmentId, userID) => {
//   return (dispatch) => {
//     dispatch(fetchGetRequest());
//     apiClient
//       .post("punishmentType/delete", punishmentId, {params : {userID : userID}})
//       .then(() => {
//         alert("Punishment deleted successfully!");
//         return dispatch(fetchPunishments(userID));
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };
// };
