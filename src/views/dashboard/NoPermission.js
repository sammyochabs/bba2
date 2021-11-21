import React, { lazy, useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import {
  fetchEmployeeData,
  fetchEmployeeGraphData,
} from "src/services/apiCalls.js";

const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const EmployeeDashboard = () => {
  // Employee Data
  const [employeeData, setEmployeeData] = useState();

  /*********States For Graphs ***********/
  const [loanData, setLoanData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [disciplineData, setDisciplineData] = useState([]);
  const [overtimeData, setOvertimeData] = useState([]);

  useEffect(() => {
    const fetchDataEmployee = async () => {
      const fetchedEmployeeData = await fetchEmployeeData(1, 64);
      setEmployeeData(fetchedEmployeeData);
    };

    /*****************Calls For Graphs************/
    //Loan
    const fetchLoan = async () => {
      const fetchedLoan = await fetchEmployeeGraphData(
        "1",
        "64",
        "Loan",
        "Month"
      );
      console.log("fetchedLoan", fetchedLoan);
      setLoanData(fetchedLoan);
    };
    //Overtime
    const fetchOvertime = async () => {
      const fetchedOvertime = await fetchEmployeeGraphData(
        "1",
        "64",
        "Overtime",
        "Month"
      );
      console.log("fetchedOvertime", fetchedOvertime);
      setOvertimeData(fetchedOvertime);
    };
    //Leave
    const fetchLeave = async () => {
      const fetchedLeave = await fetchEmployeeGraphData(
        "1",
        "64",
        "Leave",
        "Month"
      );
      console.log("fetchedLeave", fetchedLeave);
      setLeaveData(fetchedLeave);
    };
    //Discipline
    const fetchDiscipline = async () => {
      const fetchedDiscipline = await fetchEmployeeGraphData(
        "1",
        "64",
        "Discipline",
        "Month"
      );
      console.log("fetchedDiscipline", fetchedDiscipline);
      setDisciplineData(fetchedDiscipline);
    };

    fetchDataEmployee();
    fetchLoan();
    fetchOvertime();
    fetchLeave();
    fetchDiscipline();
  }, []);

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <>
      <CCard
        className="mb-4"
        style={{ backgroundColor: "#ebedef", border: "none" }}
      >
        <CCardBody
          style={{
            backgroundColor: "#fff",
            border: "2px solid #dee1e3",
            marginTop: "30px",
          }}
        >
          <CRow>
            <CCol>
              <h4 id="traffic" className="card-title mb-0">
                You Have No Permission To Access This Program
              </h4>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default EmployeeDashboard;
