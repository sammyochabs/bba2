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
      <WidgetsBrand withCharts employeeData={employeeData} />

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
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Discipline
              </h4>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: "300px", marginTop: "40px" }}
            labels={disciplineData?.map((data) => data.Label)}
            datasets={[
              {
                label: "Discipline",
                backgroundColor: hexToRgba("#3399ff", 10),
                borderColor: "#3399ff",
                pointHoverBackgroundColor: "#3399ff",
                borderWidth: 2,
                data: disciplineData?.map((data) => data.Value),
                fill: true,
              },
            ]}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>

        <CCardBody
          style={{
            backgroundColor: "#fff",
            border: "2px solid #dee1e3",
            marginTop: "30px",
          }}
        >
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Leave
              </h4>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: "300px", marginTop: "40px" }}
            labels={leaveData?.map((data) => data.Label)}
            datasets={[
              {
                label: "Leave",
                backgroundColor: hexToRgba("#3399ff", 10),
                borderColor: "#3399ff",
                pointHoverBackgroundColor: "#3399ff",
                borderWidth: 2,
                data: leaveData?.map((data) => data.Value),
                fill: true,
              },
            ]}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>

        <CCardBody
          style={{
            backgroundColor: "#fff",
            border: "2px solid #dee1e3",
            marginTop: "30px",
          }}
        >
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Loan
              </h4>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: "300px", marginTop: "40px" }}
            labels={loanData?.map((data) => data.Label)}
            datasets={[
              {
                label: "Loan",
                backgroundColor: hexToRgba("#3399ff", 10),
                borderColor: "#3399ff",
                pointHoverBackgroundColor: "#3399ff",
                borderWidth: 2,
                data: loanData?.map((data) => data.Value),
                fill: true,
              },
            ]}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>

        {/*<CCardBody
          style={{ backgroundColor: '#fff', border: '2px solid #dee1e3', marginTop: '30px' }}
        >
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Overtime
              </h4>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            labels ={ overtimeData?.map((data) => data.Label)}
              datasets = { [
                {
                  label: 'Overtime',
                  backgroundColor: hexToRgba('#3399ff', 10),
                  borderColor: '#3399ff',
                  pointHoverBackgroundColor: '#3399ff',
                  borderWidth: 2,
                  data: overtimeData?.map((data) => data.Value),
                  fill: true,
                },
              ]}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>*/}
      </CCard>
    </>
  );
};

export default EmployeeDashboard;
