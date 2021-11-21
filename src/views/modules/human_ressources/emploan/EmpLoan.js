import { CButton, CCard } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmpLoans } from "src/actions/HumanRessource/emploan";
import SettingPageTitle from "src/reusable/SettingPageTitle";
import EmpLoanModal from "./EmpLoanModal";
import EmpLoanTable from "./EmpLoanTable";
import { fetchEmpDropdown } from "src/actions/HumanRessource/empleave";
import { fetchLoanTypes } from "src/actions/loantypes";
import { fetchLoanFunds } from "src/actions/loanfunds";
import {
  getUserPermissions,
  getUserProgramsPermisions,
} from "src/services/apiCalls";
import mainNavigation from "src/containers/_nav";
import { fetchEmployee, fetchEmployees } from "src/actions/employee";
import apiClient from "src/services/api";

const EmpLoan = () => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  // const loans = 0;
  useEffect(() => {
    dispatch(fetchEmpLoans(userID));
    dispatch(fetchEmpDropdown(userID));
    dispatch(fetchLoanTypes(userID));
    dispatch(fetchLoanFunds(userID));
  }, [dispatch]);
  const { empLoan } = useSelector((state) => {
    return state.empLoan;
  });
  const { emplist } = useSelector((state) => state.emplist);
  const { loantypes } = useSelector((state) => state.loantype);
  const { loanfunds } = useSelector((state) => state.loanfunds);
  const stateObj = useSelector((state) => state);
  const [modal, setModal] = useState(false);
  const [programs, setPrograms] = useState({});
  const [employee, setEmployee] = useState({});
  const [filteredLoanData, setFilteredLoanData] = useState([]);
  const [accessAllEmployeeLoans, setAccessAllEmployeeLoans] = useState(true);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    mainNavigation.then((res) => {
      console.log(res);
      setPrograms(res.programs);
    });
  }, [mainNavigation]);

  useEffect(() => {
    apiClient
      .get("/employee/view", {
        params: { UserID: userID },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setEmployee(res?.data?.EmployeeView);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (programs && programs?.loanManagement?.ProgramID === 23) {
      setFilteredLoanData(empLoan);
      setAccessAllEmployeeLoans(true);
    } else if (
      programs &&
      programs?.loanManagement?.ProgramID !== 23 &&
      programs &&
      programs?.loanManagementEmployee?.ProgramID === 28
    ) {
      let result = empLoan.filter((loan) => {
        return loan.EmployeeID === employee.EmployeeID;
      });
      console.log("result", result);
      setAccessAllEmployeeLoans(false);
      setFilteredLoanData(result);
    }
  }, [empLoan, programs]);

  console.log(programs);

  // console.log(stateObj);

  // console.log(userID);

  console.log("current employee", employee);
  console.log("all employees", emplist);
  console.log("Loans To Display", empLoan);
  console.log("Filtered Loans ", filteredLoanData);

  return (
    <CCard className="p-5">
      <div className="hr-header">
        <SettingPageTitle title="Employee Loan Request" />
        <CButton
          onClick={() => {
            if (programs && programs.loanManagement?.Add === 1) {
              // history.push("/HR/AddEducation");
              toggle();
            } else {
              alert("You dont have this permission");
            }
          }}
          color="info"
        >
          + Add new Employee Loan Request
        </CButton>
      </div>
      <EmpLoanTable
        editPermission={programs && programs.loanManagement?.Edit}
        viewPermission={programs && programs.loanManagement?.View}
        deletePermission={programs && programs.loanManagement?.Delete}
        approvePermission={
          accessAllEmployeeLoans === false
            ? 0
            : programs?.loanManagement?.Permission
        }
        declinePermission={
          accessAllEmployeeLoans === false
            ? 0
            : programs?.loanManagement?.Permission
        }
        empLoan={filteredLoanData}
        userID={userID}
        emplist={emplist}
        loantypes={loantypes}
        loanfunds={loanfunds}
      />
      <EmpLoanModal
        userID={userID}
        toggle={toggle}
        modal={modal}
        type={"Add"}
        title={"Add new Loan Request"}
        emplist={accessAllEmployeeLoans === true ? emplist : [employee]}
        loantypes={loantypes}
        loanfunds={loanfunds}
      />
    </CCard>
  );
};

export default EmpLoan;
